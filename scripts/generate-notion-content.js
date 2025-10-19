const { Client } = require('@notionhq/client');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables from .env.local for local testing
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('No .env.local file found, assuming we are in CI environment');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID
  });
  console.log('Database response:', JSON.stringify(response.results[0].properties, null, 2));
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
  const title = page.properties['Page Name']?.title?.[0]?.plain_text || 'Untitled';
  const description = page.properties.Description?.rich_text?.[0]?.plain_text || '';
  const date = page.properties.Date?.date?.start || new Date(page.created_time).toISOString().split('T')[0];
  
  // Convert blocks to JSX
  let hasImageGrid = false;
  let imageGridPhotos = [];
  
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
      case 'code':
        const code = block.code.rich_text.map(text => text.plain_text).join('');
        // Check if this is the image grid code
        if (block.code.language === 'typescript' && code.includes('ImageGrid')) {
          hasImageGrid = true;
          try {
            // Try to extract the photos array
            const match = code.match(/photos=\{(\[[\s\S]*?\])\}/);
            if (match) {
              // Get the array content and convert to proper JSON format
              let jsonString = match[1]
                // Replace property names with quoted versions
                .replace(/(\w+):\s/g, '"$1": ')
                // Convert all single quotes to double quotes
                .replace(/'/g, '"')
                // Add basePath to image URLs
                .replace(/"src":\s*"\/images\//g, '"src": "/better_portfolio/images/')
                // Handle numeric values before other strings
                .replace(/"(width|height)":\s*"(\d+)"/g, '"$1": $2')
                // Remove trailing commas
                .replace(/,(\s*[}\]])/g, '$1')
                // Clean up any extra whitespace
                .replace(/\s+/g, ' ')
                .trim();

              // Parse and ensure numbers are correct
              const photos = JSON.parse(jsonString);
              imageGridPhotos = photos.map(photo => ({
                ...photo,
                width: Number(photo.width),
                height: Number(photo.height)
              }));
              
              // Return the ImageGrid component inline where the code block was
              return '<ImageGrid photos={photos} layout="columns" columns={3} />';
            }
          } catch (e) {
            console.warn('Failed to parse ImageGrid photos:', e.message);
            imageGridPhotos = []; // Use empty array if parsing fails
          }
        }
        return `<pre><code>${code}</code></pre>`;
      default:
        return '';
    }
  }).join('\n');

  // Create page file content
  const photosCode = hasImageGrid ? `const photos = ${JSON.stringify(imageGridPhotos, null, 2)};` : '';
  
  return "'use client';\n\n" +
    "import { motion } from 'framer-motion';\n" +
    "import ImageGrid from '@/components/ImageGrid';\n" +
    (hasImageGrid ? photosCode + "\n\n" : "\n") +
    "export default function ProjectPage() {\n" +
    "  return (\n" +
    "    <div className=\"pt-32 pb-16 min-h-screen\">\n" +
    "      <motion.div\n" +
    "        className=\"max-w-4xl mx-auto px-8\"\n" +
    "        initial={{ opacity: 0, y: 20 }}\n" +
    "        animate={{ opacity: 1, y: 0 }}\n" +
    "        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}\n" +
    "      >\n" +
    "        <h1 className=\"text-4xl font-bold mb-4\">" + title + "</h1>\n" +
    "        <p className=\"text-gray-600 mb-8\">" + date + "</p>\n" +
    "        <div className=\"prose prose-lg max-w-none\">\n" +
    "          " + content + "\n" +
    "        </div>\n" +
    "      </motion.div>\n" +
    "    </div>\n" +
    "  );\n" +
    "}";
}

async function main() {
  try {
    console.log('Starting content generation...');
    console.log('Checking environment variables...');
    
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY is not set');
    }
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not set');
    }

    console.log('Fetching database content...');
    const pages = await getDatabase();
    console.log('Found ' + pages.length + ' pages in database');
    
    // Create directory for generated pages if it doesn't exist
    const pagesDir = path.join(__dirname, '../src/app/projects');
    await fs.mkdir(pagesDir, { recursive: true });
    console.log('Created/verified pages directory at: ' + pagesDir);
    
    // Store project metadata for the main page
    const projectsMetadata = [];
    
    // Process each page
    for (const page of pages) {
      try {
        console.log('Processing page: ' + page.id);
        const blocks = await getPageContent(page.id);
        
        // Extract all properties from Notion
        const title = page.properties['Page Name']?.title?.[0]?.plain_text || 'Untitled';
        const displayedName = page.properties['Displayed Name']?.rich_text?.[0]?.plain_text || '';
        const urlSlug = page.properties['URL Slug']?.rich_text?.[0]?.plain_text || '';
        const roboticsTag = page.properties['Robotics Tag']?.number || 0;
        const publishStatus = page.properties['Publish Status']?.select?.name || '';
        const lastEdited = new Date(page.last_edited_time).toISOString().split('T')[0];
        
        // Use URL Slug if provided, otherwise generate from title
        const slug = urlSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Map all category tags to scores
        const categoryScores = {
          research: (page.properties['Research Tag']?.number || 0) / 100,
          robotics: (page.properties['Robotics Tag']?.number || 0) / 100,
          software: (page.properties['Software Tag']?.number || 0) / 100,
          sculpture: (page.properties['Sculpture Tag']?.number || 0) / 100,
          videography: (page.properties['Videography Tag']?.number || 0) / 100,
          play: (page.properties['Play Tag']?.number || 0) / 100
        };
        
        // Get image filename from the Images property
        const imageFilename = page.properties.Images?.rich_text?.[0]?.plain_text || '';
        const imageUrl = imageFilename ? 
          '/better_portfolio/images/' + imageFilename : 
          '/better_portfolio/project-placeholder.jpg';

        // Add to metadata
        projectsMetadata.push({
          id: page.id,
          title,
          displayedName,
          description: displayedName || title, // Use displayed name as description if available
          date: lastEdited,
          slug,
          publishStatus,
          categoryScores,
          image: imageUrl
        });
        
        console.log('Generating content for: ' + title + ' (' + slug + ')');
        
        // Create directory for this page
        const pageDir = path.join(pagesDir, slug);
        await fs.mkdir(pageDir, { recursive: true });
        
        // Generate and write page content
        const content = await generatePageContent(page, blocks);
        const filePath = path.join(pageDir, 'page.tsx');
        await fs.writeFile(filePath, content);
        
        console.log('Successfully generated page at: ' + filePath);
      } catch (pageError) {
        console.error('Error processing page ' + page.id + ':', pageError);
        // Continue with other pages even if one fails
      }
    }
    
    // Write projects metadata
    const projectsJsonPath = path.join(__dirname, '../src/data/projects.json');
    await fs.writeFile(projectsJsonPath, JSON.stringify({ projects: projectsMetadata }, null, 2));
    console.log('Updated projects metadata at: ' + projectsJsonPath);
    
    console.log('Content generation complete!');
  } catch (error) {
    console.error('Fatal error generating content:', error);
    process.exit(1);
  }
}

main();