import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing NOTION_DATABASE_ID');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching database:', error);
    throw error;
  }
} 