const { Client } = require('@notionhq/client');
const fs = require('fs').promises;
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return response.results;
}

async function getPageContent(pageId) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });
  return blocks.results;
}

async function generatePageContent(page, blocks) {
  // Extract title from page properties
  const title = page.properties.Name?.title?.[0]?.plain_text || 'Untitled';
  const description = page.properties.Description?.rich_text?.[0]?.plain_text || '';
  const date = page.properties.Date?.date?.start || new Date(page.created_time).toISOString().split('T')[0];
  
  // Convert blocks to JSX
  const content = blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${block.paragraph.rich_text.map(text => text.plain_text).join('')}</p>`;
      case 'heading_1':
        return `<h1>${block.heading_1.rich_text.map(text => text.plain_text).join('')}</h1>`;
      case 'heading_2':
        return `<h2>${block.heading_2.rich_text.map(text => text.plain_text).join('')}</h2>`;
      case 'heading_3':
        return `<h3>${block.heading_3.rich_text.map(text => text.plain_text).join('')}</h3>`;
      default:
        return '';
    }
  }).join('\n');

  // Create page file content
  return `'use client';

import { motion } from 'framer-motion';

export default function ProjectPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-4">${title}</h1>
        <p className="text-gray-600 mb-8">${date}</p>
        <div className="prose prose-lg max-w-none">
          ${content}
        </div>
      </motion.div>
    </div>
  );
}`;
}

async function main() {
  try {
    // Get all pages from the database
    const pages = await getDatabase();
    
    // Create directory for generated pages if it doesn't exist
    const pagesDir = path.join(__dirname, '../src/app/projects');
    await fs.mkdir(pagesDir, { recursive: true });
    
    // Process each page
    for (const page of pages) {
      const blocks = await getPageContent(page.id);
      const title = page.properties.Name?.title?.[0]?.plain_text || 'Untitled';
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      // Create directory for this page
      const pageDir = path.join(pagesDir, slug);
      await fs.mkdir(pageDir, { recursive: true });
      
      // Generate and write page content
      const content = await generatePageContent(page, blocks);
      await fs.writeFile(path.join(pageDir, 'page.tsx'), content);
      
      console.log(`Generated page for: ${title}`);
    }
    
    console.log('Content generation complete!');
  } catch (error) {
    console.error('Error generating content:', error);
    process.exit(1);
  }
}

main();