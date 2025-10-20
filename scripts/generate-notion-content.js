const { Client } = require('@notionhq/client');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables from .env.local for local testing
try {
  require('dotenv').config({ path: '.env.local' });
} catch (error) {
  console.log('No .env.local file found, assuming we are in CI environment');
}

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY environment variable is required');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID environment variable is required');
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28'
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
  // Log a sample of blocks to understand the structure
  console.log('Sample block structure:', JSON.stringify(blocks.results[0], null, 2));
  return blocks.results;
}

async function generatePageContent(page, blocks) {
  // Extract properties from page
  const title = page.properties['Page Name']?.title?.[0]?.plain_text || 'Untitled';
  const description = page.properties.Description?.rich_text?.[0]?.plain_text || '';
  const secondaryText = page.properties['Secondary Text']?.rich_text?.[0]?.plain_text || '';
  const year = page.properties.Year?.number?.toString() || new Date().getFullYear().toString();
  
  // Convert blocks to JSX
  let hasImageGrid = false;
  let imageGridPhotos = [];
  
  // Process each block and convert to JSX
  const processBlocks = async (blocks) => {
    const processedContent = [];
    for (const block of blocks) {
      const content = await generateBlockContent(block);
      processedContent.push(content);
    }
    return processedContent.join('\n');
  };
  
  const generateBlockContent = async (block) => {
    console.log('Processing block type:', block.type);
    
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
              
              // Get layout parameters from the code if specified
              const layoutMatch = code.match(/layout="([^"]+)"/);
              const columnsMatch = code.match(/columns=\{(\d+)\}/);
              const spacingMatch = code.match(/spacing=\{(\d+)\}/);

              const layout = layoutMatch ? layoutMatch[1] : 'columns';
              const columns = columnsMatch ? columnsMatch[1] : '2';
              const spacing = spacingMatch ? spacingMatch[1] : '16';

              // Return the ImageGrid component inline where the code block was
              return `<ImageGrid photos={photos} layout="${layout}" columns={${columns}} spacing={${spacing}} />`;
            }
          } catch (e) {
            console.warn('Failed to parse ImageGrid photos:', e.message);
            imageGridPhotos = []; // Use empty array if parsing fails
          }
        }
        // Check if this is embed-like code
        else if (block.code.language === 'javascript' || 
                 block.code.language === 'jsx' ||
                 code.trim().startsWith('<iframe') ||
                 code.trim().startsWith('<div') ||
                 code.trim().startsWith('<blockquote')) {
          // First check if it's already JSX
          if (block.code.language === 'jsx') {
            return code;
          }
          
          // If this is a TikTok embed or similar that requires a script
          if (code.includes('<script')) {
            // Extract the embed code and script URL
            const embedPart = code.substring(0, code.indexOf('<script'));
            const scriptMatch = code.match(/<script[^>]+src="([^"]+)"[^>]*>/);
            const scriptUrl = scriptMatch ? scriptMatch[1] : null;
            
            // Convert HTML to React-compatible JSX
            let reactCode = embedPart;
            
            // Convert style attributes to React format
            reactCode = reactCode.replace(
              /style="([^"]*)"/g,
              (match, styleString) => {
                const styleObject = styleString.split(';')
                  .filter(style => style.trim())
                  .reduce((acc, style) => {
                    const [property, value] = style.split(':').map(s => s.trim());
                    // Convert kebab-case to camelCase
                    const camelProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
                    return `${acc}${acc ? ',' : ''}${camelProperty}:'${value}'`;
                  }, '');
                return `style={{${styleObject}}}`;
              }
            );

            // Convert all HTML attributes to React format
            const htmlToReactAttrs = {
              // Common HTML attributes
              'class': 'className',
              'for': 'htmlFor',
              'tabindex': 'tabIndex',
              'readonly': 'readOnly',
              'maxlength': 'maxLength',
              'contenteditable': 'contentEditable',
              // iframe-specific attributes
              'frameborder': 'frameBorder',
              'allowfullscreen': 'allowFullScreen',
              'referrerpolicy': 'referrerPolicy',
              'marginwidth': 'marginWidth',
              'marginheight': 'marginHeight',
              'srcdoc': 'srcDoc',
              'allowtransparency': 'allowTransparency'
            };
            
            // Replace all HTML attributes with their React equivalents
            Object.entries(htmlToReactAttrs).forEach(([html, react]) => {
              // Handle boolean attributes (without values)
              reactCode = reactCode.replace(
                new RegExp(`\\s${html}(\\s|>)`, 'g'),
                ` ${react}={true}$1`
              );
              // Handle double quotes
              reactCode = reactCode.replace(
                new RegExp(`${html}="`, 'g'),
                `${react}="`
              );
              // Handle single quotes
              reactCode = reactCode.replace(
                new RegExp(`${html}='`, 'g'),
                `${react}='`
              );
              // Handle no quotes
              reactCode = reactCode.replace(
                new RegExp(`${html}=([^"'])`, 'g'),
                `${react}=$1`
              );
            });
            
            // Add the Script component if we found a script URL
            if (scriptUrl) {
              return reactCode + `<Script src="${scriptUrl}" />`;
            }
            
            return reactCode;
          }
          
          // Handle regular embeds without scripts
          let reactCode = code;
          
          // Convert style attributes to React format
          reactCode = reactCode.replace(
            /style="([^"]*)"/g,
            (match, styleString) => {
              const styleObject = styleString.split(';')
                .filter(style => style.trim())
                .reduce((acc, style) => {
                  const [property, value] = style.split(':').map(s => s.trim());
                  // Convert kebab-case to camelCase
                  const camelProperty = property.replace(/-([a-z])/g, g => g[1].toUpperCase());
                  return `${acc}${acc ? ',' : ''}${camelProperty}:'${value}'`;
                }, '');
              return `style={{${styleObject}}}`;
            }
          );

          // Convert all HTML attributes to React format
          const htmlToReactAttrs = {
            // Common HTML attributes
            'class': 'className',
            'for': 'htmlFor',
            'tabindex': 'tabIndex',
            'readonly': 'readOnly',
            'maxlength': 'maxLength',
            'contenteditable': 'contentEditable',
            // iframe-specific attributes
            'frameborder': 'frameBorder',
            'allowfullscreen': 'allowFullScreen',
            'referrerpolicy': 'referrerPolicy',
            'marginwidth': 'marginWidth',
            'marginheight': 'marginHeight',
            'srcdoc': 'srcDoc',
            'allowtransparency': 'allowTransparency'
          };
          
          // Replace all HTML attributes with their React equivalents
          Object.entries(htmlToReactAttrs).forEach(([html, react]) => {
            // Handle boolean attributes (without values)
            reactCode = reactCode.replace(
              new RegExp(`\\s${html}(\\s|>)`, 'g'),
              ` ${react}={true}$1`
            );
            // Handle double quotes
            reactCode = reactCode.replace(
              new RegExp(`${html}="`, 'g'),
              `${react}="`
            );
            // Handle single quotes
            reactCode = reactCode.replace(
              new RegExp(`${html}='`, 'g'),
              `${react}='`
            );
            // Handle no quotes
            reactCode = reactCode.replace(
              new RegExp(`${html}=([^"'])`, 'g'),
              `${react}=$1`
            );
          });
          
          return reactCode;
        }
        return `<pre><code>${code}</code></pre>`;
      case 'column_list':
        // Get the column children from the block
        const columnList = block;
        if (columnList.has_children) {
          // Fetch the children of the column_list
          const children = await notion.blocks.children.list({
            block_id: columnList.id,
          });
          
          if (children.results && children.results.length > 0) {
            // Process columns sequentially to maintain order
            const columnDivs = [];
            for (const column of children.results) {
              if (column.type === 'column' && column.has_children) {
                // Fetch the children of the column
                const columnChildren = await notion.blocks.children.list({
                  block_id: column.id,
                });
                
                // Process each child in the column
                const columnContent = [];
                for (const child of columnChildren.results) {
                  const content = await generateBlockContent(child);
                  columnContent.push(content);
                }

                // All columns get equal width
                columnDivs.push(`<div className="flex-1 w-full">${columnContent.join('\n')}</div>`);
              }
            }
            
            return `<div className="flex flex-col md:flex-row gap-4 my-4">
              ${columnDivs.join('\n')}
            </div>`;
          }
        }
        return '';
      default:
        return '';
    }
  };

  // Process all blocks and get the content
  const content = await processBlocks(blocks);

  // Create page file content
  const photosCode = hasImageGrid ? `const photos = ${JSON.stringify(imageGridPhotos, null, 2)};` : '';
  
  return "'use client';\n\n" +
    "import React from 'react';\n" +
    "import { motion } from 'framer-motion';\n" +
    "import ImageGrid from '@/components/ImageGrid';\n" +
    "import Script from 'next/script';\n" +
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
    "        <h1 className=\"text-4xl font-bold mb-2\">" + title + "</h1>\n" +
    "        <div className=\"flex justify-between items-center mb-8\">\n" +
    "          <p className=\"text-xl\" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>" + secondaryText + "</p>\n" +
    "          <p className=\"text-xl\" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>" + year + "</p>\n" +
    "        </div>\n" +
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
        const description = page.properties['Description']?.rich_text?.[0]?.plain_text || '';
        const secondaryText = page.properties['Secondary Text']?.rich_text?.[0]?.plain_text || '';
        const roboticsTag = page.properties['Robotics Tag']?.number || 0;
        const publishStatus = page.properties['Publish Status']?.select?.name || 'Not Published';
        const year = page.properties['Year']?.number?.toString() || new Date().getFullYear().toString();
        
        // Generate slug from title
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
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
          description,
          secondaryText,
          date: year,
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
        
        // Update the URL field in Notion
        const publicUrl = `/projects/${slug}`;
        try {
          await notion.pages.update({
            page_id: page.id,
            properties: {
              'url': {
                url: publicUrl
              }
            }
          });
          console.log('Updated Notion URL field for ' + title + ' to: ' + publicUrl);
        } catch (urlUpdateError) {
          console.error('Failed to update URL in Notion for ' + title + ':', urlUpdateError);
        }
        
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