import { notion } from '@/lib/notion';
import { NotionContent } from '@/components/NotionContent';
import { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import ImageGrid from '@/components/ImageGrid';

async function getBlockChildren(blockId: string) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results as BlockObjectResponse[];
}

async function getPageContent(pageId: string) {
  console.log('Fetching page content for ID:', pageId);
  const blocks = await getBlockChildren(pageId);
  console.log('Initial blocks:', JSON.stringify(blocks, null, 2));
  return blocks as BlockObjectResponse[];
}

function getTitle(page: PageObjectResponse) {
  console.log('Getting title from page:', JSON.stringify(page, null, 2));
  // Try different possible title property names
  const possibleTitleProps = ['title', 'Name', 'Displayed Name', 'Page Title'];
  for (const propName of possibleTitleProps) {
    const property = page.properties[propName];
    if (property) {
      console.log(`Found property ${propName}:`, JSON.stringify(property, null, 2));
      if (property.type === 'title') {
        return property.title[0]?.plain_text || 'Untitled';
      }
      if (property.type === 'rich_text') {
        return property.rich_text[0]?.plain_text || 'Untitled';
      }
    }
  }
  console.log('No title property found in:', Object.keys(page.properties));
  return 'Untitled';
}

function getDescription(page: PageObjectResponse) {
  console.log('Getting description from page:', JSON.stringify(page, null, 2));
  // Try different possible description property names
  const possibleDescProps = ['description', 'Description', 'Summary'];
  for (const propName of possibleDescProps) {
    const property = page.properties[propName];
    if (property?.type === 'rich_text') {
      return property.rich_text[0]?.plain_text || '';
    }
  }
  return '';
}


export default async function TestPage() {
  try {
    // Get the first page from the database
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    if (!database.results.length) {
      return (
        <main className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-black">No Pages Found</h1>
            <p className="text-xl text-gray-600">
              No pages were found in your Notion database. Please add some content to your database.
            </p>
          </div>
          <footer className="mt-16 p-8 flex justify-between items-center">
            <div>
              <Image
                src="/images/signature.png"
                alt="Signature"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <Image
                src="/images/date.png"
                alt="Date"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          </footer>
        </main>
      );
    }

    const page = database.results[0] as PageObjectResponse;
    console.log('Retrieved page:', JSON.stringify(page, null, 2));
    const blocks = await getPageContent(page.id);
    console.log('Retrieved blocks:', JSON.stringify(blocks, null, 2));
    const title = getTitle(page);
    const description = getDescription(page);

    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-black">{title}</h1>
          {description && (
            <p className="text-xl text-gray-600 mb-8">{description}</p>
          )}
          <div className="prose prose-lg max-w-none text-black">
            <NotionContent blocks={blocks} />
          </div>
          <ImageGrid photos={[
            {
              src: '/images/test_image_1.jpg',
              width: 800,
              height: 600,
              alt: 'Test Image 1',
            },
            {
              src: '/images/test_image_2.jpg',
              width: 400,
              height: 600,
              alt: 'Test Image 2',
            },
            {
              src: '/images/test_image_3.jpg',
              width: 800,
              height: 600,
              alt: 'Test Image 3',
            },
          ]} layout="masonry" />
        </div>
        <footer className="mt-16 p-8 flex justify-between items-center">
          <div>
            <Image
              src="/images/signature.png"
              alt="Signature"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
          <div>
            <Image
              src="/images/date.png"
              alt="Date"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        </footer>
      </main>
    );
  } catch (error) {
    console.error('Error in TestPage:', error);
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-red-600">Error</h1>
          <p className="text-xl text-gray-600">
            An error occurred while fetching the page. Please check the console for details.
          </p>
        </div>
        <footer className="mt-16 p-8 flex justify-between items-center">
          <div>
            <Image
              src="/images/signature.png"
              alt="Signature"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
          <div>
            <Image
              src="/images/date.png"
              alt="Date"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        </footer>
      </main>
    );
  }
} 