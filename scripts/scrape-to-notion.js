const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const SITE_URLS = [
  'https://yellowboltart.com/eng-port/droodles',
  'https://yellowboltart.com/eng-port/camera-slider',
  'https://yellowboltart.com/eng-port/design-for-repair',
  'https://yellowboltart.com/eng-port/swerve-wheel',
  'https://yellowboltart.com/eng-port/ringevator',
  'https://yellowboltart.com/gallery-assorted-projects/3d-checkers',
  'https://yellowboltart.com/gallery-assorted-projects/pastel-clock',
  'https://yellowboltart.com/gallery-assorted-projects/clock-head',
  'https://yellowboltart.com/gallery-assorted-projects/coat-rack',
  'https://yellowboltart.com/gallery-assorted-projects/jewlery',
  'https://yellowboltart.com/gallery-assorted-projects/lamp-base',
  'https://yellowboltart.com/gallery-assorted-projects/minidisk',
  'https://yellowboltart.com/gallery-assorted-projects/geometri-solids',
  'https://yellowboltart.com/gallery-assorted-projects/technicolor-canisters',
  'https://yellowboltart.com/gallery-assorted-projects/stapler',
  'https://yellowboltart.com/gallery-assorted-projects/journal',
  'https://yellowboltart.com/gallery-photography/ink',
  'https://yellowboltart.com/gallery-photography/flowers',
  'https://yellowboltart.com/gallery-product-ocean/initial-drawings',
  'https://yellowboltart.com/gallery-product-ocean/disposable-matrix',
  'https://yellowboltart.com/gallery-product-ocean/at-your-door',
  'https://yellowboltart.com/gallery-product-ocean/infinitely-interconnected',
  'https://yellowboltart.com/gallery-product-ocean/entanglement',
  'https://yellowboltart.com/gallery-product-ocean/naturally-industrial',
  'https://yellowboltart.com/gallery-product-ocean/the-ocean',
  'https://yellowboltart.com/gallery-product-ocean/shepherd',
  'https://yellowboltart.com/gallery-product-ocean/wasting-water',
  'https://yellowboltart.com/gallery-product-ocean/zenosyne-feast',
];

async function scrapeProject(url, browser) {
  try {
    console.log(`Scraping: ${url}`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get the title from the last part of the URL
    const urlParts = url.split('/');
    const urlTitle = urlParts[urlParts.length - 1].replace(/-/g, ' ');
    const title = urlTitle.charAt(0).toUpperCase() + urlTitle.slice(1);
    
    // Get all paragraphs
    const paragraphs = await page.evaluate(() => {
      const pElements = document.querySelectorAll('p');
      return Array.from(pElements)
        .map(p => p.textContent.trim())
        .filter(text => text && text.length > 20);
    });
    
    await page.close();
    
    return {
      title,
      content: paragraphs.join('\n\n')
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function createNotionPage(project) {
  try {
    console.log(`Creating Notion page for: ${project.title}`);
    
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          title: {
            title: [{ text: { content: project.title } }]
          }
        },
        children: project.content
          .match(/[\s\S]{1,1800}(?=\s|$)/g)
          .map(chunk => ({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ 
                type: 'text',
                text: { content: chunk.trim() }
              }]
            }
          }))
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error, null, 2));
    }
    
    console.log(`Successfully created page for: ${project.title}`);
  } catch (error) {
    console.error(`Error creating Notion page for ${project.title}:`, error.message);
  }
}

async function main() {
  console.log('Starting content migration...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  try {
    for (const url of SITE_URLS) {
      const project = await scrapeProject(url, browser);
      if (project && project.content) {
        await createNotionPage(project);
        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } finally {
    await browser.close();
  }
  
  console.log('Content migration complete!');
}

main().catch(console.error);