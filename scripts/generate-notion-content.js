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
  let imageGridCounter = 0;
  let allImageGridPhotos = [];
  let hasNotionLinks = false;
  
  // Helper function to check if a URL is a Notion internal link and extract page ID
  const isNotionDatabaseLink = (href) => {
    // Notion links can have various formats:
    // - https://www.notion.so/xxxxx-xxxxx-xxxxx (with hyphens)
    // - https://notion.so/page-name-xxxxx (UUID at the end)
    // - /xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (just the page ID without domain)
    
    // Try to extract from full URLs first
    let notionPageIdMatch = href.match(/notion\.so\/(?:[^\s]*-)([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
    
    // If not found, check if it's a bare UUID (with or without leading slash)
    if (!notionPageIdMatch) {
      notionPageIdMatch = href.match(/^\/([a-f0-9]{32})$/i);
    }
    
    if (notionPageIdMatch) {
      // Normalize to UUID format with hyphens
      let pageId = notionPageIdMatch[1];
      if (!pageId.includes('-')) {
        // Convert xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        pageId = pageId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
      }
      return pageId;
    }
    return null;
  };
  
  // Map Notion page IDs to project slugs by querying the database
  const notionPageIdToSlug = {};
  const buildNotionPageMap = async () => {
    try {
      const allPages = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
      });
      
      for (const page of allPages.results) {
        const pageTitle = page.properties['Page Name']?.title?.[0]?.plain_text || '';
        const slug = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        notionPageIdToSlug[page.id] = slug;
      }
    } catch (e) {
      console.warn('Failed to build Notion page map:', e.message);
    }
  };
  
  // Build the map before processing content
  await buildNotionPageMap();
  
  // Helper function to process rich text with links and formatting
  const processRichText = (richTextArray) => {
    return richTextArray.map(text => {
      let content = text.plain_text;
      const hasNonDefaultColor = text.annotations.color && text.annotations.color !== 'default';
      const hasLink = text.href;
      
      // Check if this is a Notion database link
      const notionPageId = hasLink ? isNotionDatabaseLink(hasLink) : null;
      const isInternalNotionLink = notionPageId && notionPageIdToSlug[notionPageId];
      
      // Determine the color and font
      let colorStyle = '';
      let fontFamily = '';
      
      if (hasLink) {
        // Links are always blue (#5B9BD5)
        colorStyle = 'color: "#5B9BD5"';
        // If the link also has highlighting, keep the handwriting font
        if (hasNonDefaultColor) {
          fontFamily = ', fontFamily: "Trey Handwrite, cursive"';
        }
      } else if (hasNonDefaultColor) {
        // Highlighted text (non-link) is red with handwriting font
        colorStyle = 'color: "#EC6F6B"';
        fontFamily = ', fontFamily: "Trey Handwrite, cursive"';
      }
      
      // Apply text formatting
      if (text.annotations.bold) {
        content = `<strong>${content}</strong>`;
      }
      if (text.annotations.italic) {
        content = `<em>${content}</em>`;
      }
      if (text.annotations.code) {
        content = `<code>${content}</code>`;
      }
      
      // Wrap in span with styling if needed
      if (hasNonDefaultColor || hasLink) {
        const styleObject = `{{${colorStyle}${fontFamily}}}`;
        const hoverClass = hasLink ? 'className="transition-opacity duration-200 hover:opacity-60" ' : '';
        content = `<span ${hoverClass}style=${styleObject}>${content}</span>`;
      }
      
      // Apply link if present
      if (hasLink) {
        if (isInternalNotionLink) {
          // For internal Notion links, mark them for dynamic parameter handling
          hasNotionLinks = true;
          const slug = notionPageIdToSlug[notionPageId];
          content = `<InternalLink href="/projects/${slug}">${content}</InternalLink>`;
        } else {
          // External links open in new tab
          content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
        }
      }
      
      return content;
    }).join('');
  };
  
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
        return `<p className="mb-6">${processRichText(block.paragraph.rich_text)}</p>`;
      case 'heading_1':
        return `<h1 className="mt-8 mb-4">${processRichText(block.heading_1.rich_text)}</h1>`;
      case 'heading_2':
        return `<h2 className="mt-8 mb-4">${processRichText(block.heading_2.rich_text)}</h2>`;
      case 'heading_3':
        return `<h3 className="mt-6 mb-3">${processRichText(block.heading_3.rich_text)}</h3>`;
      case 'code':
        const code = block.code.rich_text.map(text => text.plain_text).join('');
        // Check if this is the image grid code
        if (block.code.language === 'typescript' && code.includes('ImageGrid')) {
          imageGridCounter++;
          const photosVarName = `photos${imageGridCounter}`;
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
              const processedPhotos = photos.map(photo => ({
                ...photo,
                width: Number(photo.width),
                height: Number(photo.height)
              }));
              
              // Store this photo array with its variable name
              allImageGridPhotos.push({
                varName: photosVarName,
                photos: processedPhotos
              });
              
              // Get layout parameters from the code if specified
              const layoutMatch = code.match(/layout="([^"]+)"/);
              const columnsMatch = code.match(/columns=\{(\d+)\}/);
              const spacingMatch = code.match(/spacing=\{(\d+)\}/);

              const layout = layoutMatch ? layoutMatch[1] : 'columns';
              const columns = columnsMatch ? columnsMatch[1] : '2';
              const spacing = spacingMatch ? spacingMatch[1] : '16';

              // Return the ImageGrid component inline where the code block was with spacing
              return `<div className="my-8"><ImageGrid photos={${photosVarName}} layout="${layout}" columns={${columns}} spacing={${spacing}} /></div>`;
            }
          } catch (e) {
            console.warn('Failed to parse ImageGrid photos:', e.message);
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
              return `<div className="my-8">${reactCode}<Script src="${scriptUrl}" /></div>`;
            }
            
            return `<div className="my-8">${reactCode}</div>`;
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
          
          return `<div className="my-8">${reactCode}</div>`;
        }
        return `<pre className="my-6"><code>${code}</code></pre>`;
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
            
            return `<div className="flex flex-col md:flex-row gap-4 my-8">
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

  // Create photo constant declarations for all image grids
  const photosCode = allImageGridPhotos.length > 0 
    ? allImageGridPhotos.map(({ varName, photos }) => 
        `const ${varName} = ${JSON.stringify(photos, null, 2)};`
      ).join('\n') 
    : '';
  
  // Build imports based on what's needed
  let imports = "'use client';\n\n" +
    "import React, { Suspense } from 'react';\n" +
    "import { motion } from 'framer-motion';\n" +
    "import ImageGrid from '@/components/ImageGrid';\n" +
    "import Script from 'next/script';\n";
  
  if (hasNotionLinks) {
    imports += "import Link from 'next/link';\n" +
      "import { useSearchParams } from 'next/navigation';\n";
  }
  
  // Add InternalLink component if needed
  let internalLinkComponent = '';
  if (hasNotionLinks) {
    internalLinkComponent = `
// Component to handle internal links with query parameter preservation
function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const fullHref = query ? \`\${href}?\${query}\` : href;
  return <Link href={fullHref}>{children}</Link>;
}

`;
  }
  
  return imports +
    (allImageGridPhotos.length > 0 ? photosCode + "\n\n" : "\n") +
    internalLinkComponent +
    (hasNotionLinks ? `
function ProjectContent() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">${title}</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>${secondaryText}</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>${year}</p>
        </div>
        <div className="prose prose-lg max-w-none">
          ${content}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="pt-32 pb-16 min-h-screen" />}>
      <ProjectContent />
    </Suspense>
  );
}` : `
export default function ProjectPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">${title}</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>${secondaryText}</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>${year}</p>
        </div>
        <div className="prose prose-lg max-w-none">
          ${content}
        </div>
      </motion.div>
    </div>
  );
}`);
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

    // Check for page slug argument
    const targetSlug = process.argv[2];
    if (targetSlug) {
      console.log('Filtering to single page: ' + targetSlug);
    }

    console.log('Fetching database content...');
    let pages = await getDatabase();
    console.log('Found ' + pages.length + ' pages in database');
    
    // Filter to only Published and Hidden pages
    const beforeFilterCount = pages.length;
    pages = pages.filter(page => {
      const publishStatus = page.properties['Publish Status']?.select?.name || 'Not Published';
      return publishStatus === 'Published' || publishStatus === 'Hidden';
    });
    console.log('Filtered to ' + pages.length + ' pages (Published or Hidden) from ' + beforeFilterCount + ' total');
    
    // Filter to specific page if slug provided
    if (targetSlug) {
      const originalLength = pages.length;
      pages = pages.filter(page => {
        const title = page.properties['Page Name']?.title?.[0]?.plain_text || 'Untitled';
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return slug === targetSlug;
      });
      
      if (pages.length === 0) {
        console.error('No page found with slug: ' + targetSlug);
        console.log('Available slugs are:');
        const allPages = await getDatabase();
        allPages.forEach(p => {
          const title = p.properties['Page Name']?.title?.[0]?.plain_text || 'Untitled';
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          console.log('  - ' + slug);
        });
        process.exit(1);
      }
      
      console.log('Filtered from ' + originalLength + ' to ' + pages.length + ' page(s)');
    }
    
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

        // Only add to metadata if Published (not Hidden)
        if (publishStatus === 'Published') {
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
        } else {
          console.log('Skipping metadata for Hidden page: ' + title);
        }
        
        console.log('Generating content for: ' + title + ' (' + slug + ') [' + publishStatus + ']');
        
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