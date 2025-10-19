import { getDatabase } from '@/lib/notion';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Project } from '@/components/ProjectCard';
import { Category } from '@/components/CategoryButton';

// This should match your Notion database structure
// Adjust property names based on your actual Notion database
export async function getProjectsFromNotion(): Promise<Project[]> {
  try {
    const pages = await getDatabase();
    
    return pages
      .filter((page): page is PageObjectResponse => 'properties' in page)
      .map((page): Project => {
        const properties = page.properties;
        
        // Extract title - adjust property name as needed
        const title = getTitleFromPage(page);
        
        // Extract description - adjust property name as needed
        const description = getDescriptionFromPage(page);
        
        // Extract image - adjust property name as needed
        const image = getImageFromPage(page);
        
        // Extract categories and scores - you'll need to adjust this based on your schema
        const categories = getCategoriesFromPage(page);
        const categoryScores = getCategoryScoresFromPage(page);
        
        // Create slug from title
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Get date from page (year)
        const date = getDateFromPage(page);
        
        // Get secondary text
        const secondaryText = getSecondaryTextFromPage(page);
        
        return {
          id: page.id,
          title,
          description,
          secondaryText,
          image: image || '/images/test_image_1.jpg', // fallback image
          slug,
          date,
          categories,
          categoryScores
        };
      });
  } catch (error) {
    console.error('Error fetching projects from Notion:', error);
    return [];
  }
}

function getTitleFromPage(page: PageObjectResponse): string {
  const possibleTitleProps = ['title', 'Name', 'Displayed Name', 'Page Title', 'Project Name'];
  
  for (const propName of possibleTitleProps) {
    const property = page.properties[propName];
    if (property) {
      if (property.type === 'title') {
        return property.title[0]?.plain_text || 'Untitled';
      }
      if (property.type === 'rich_text') {
        return property.rich_text[0]?.plain_text || 'Untitled';
      }
    }
  }
  
  return 'Untitled';
}

function getDescriptionFromPage(page: PageObjectResponse): string {
  const property = page.properties['Description'];
  if (property?.type === 'rich_text') {
    return property.rich_text[0]?.plain_text || '';
  }
  return '';
}

function getSecondaryTextFromPage(page: PageObjectResponse): string {
  const property = page.properties['Secondary Text'];
  if (property?.type === 'rich_text') {
    return property.rich_text[0]?.plain_text || '';
  }
  return '';
}

function getImageFromPage(page: PageObjectResponse): string | null {
  const possibleImageProps = ['image', 'Image', 'Cover', 'Thumbnail'];
  
  for (const propName of possibleImageProps) {
    const property = page.properties[propName];
    if (property?.type === 'files' && property.files.length > 0) {
      const file = property.files[0];
      if (file.type === 'external') {
        return file.external.url;
      }
      if (file.type === 'file') {
        return file.file.url;
      }
    }
  }
  
  // Check for cover image
  if (page.cover) {
    if (page.cover.type === 'external') {
      return page.cover.external.url;
    }
    if (page.cover.type === 'file') {
      return page.cover.file.url;
    }
  }
  
  return null;
}

function getCategoriesFromPage(page: PageObjectResponse): string[] {
  // Look for multi-select or select properties that might contain categories
  const possibleCategoryProps = ['categories', 'Categories', 'Tags', 'Skills', 'Technologies'];
  
  for (const propName of possibleCategoryProps) {
    const property = page.properties[propName];
    if (property?.type === 'multi_select') {
      return property.multi_select.map(option => option.name.toLowerCase());
    }
    if (property?.type === 'select' && property.select) {
      return [property.select.name.toLowerCase()];
    }
  }
  
  return [];
}

function getCategoryScoresFromPage(page: PageObjectResponse): Record<string, number> {
  const scores: Record<string, number> = {};
  
  // Look for number properties that might represent category scores
  // Adjust these property names based on your Notion database
  const categoryScoreProps = [
    'robotics', 'web', 'design', 'mobile', 'data', 'hardware',
    'Robotics Score', 'Web Dev Score', 'Design Score', 'Mobile Score', 
    'Data Science Score', 'Hardware Score'
  ];
  
  for (const propName of categoryScoreProps) {
    const property = page.properties[propName];
    if (property?.type === 'number' && property.number !== null) {
      // Map property name to our category IDs
      const categoryId = mapPropertyToCategory(propName);
      if (categoryId) {
        scores[categoryId] = property.number;
      }
    }
  }
  
  // If no explicit scores, infer from categories with default score of 3
  const categories = getCategoriesFromPage(page);
  categories.forEach(category => {
    if (!(category in scores)) {
      scores[category] = 3; // Default score
    }
  });
  
  return scores;
}

function mapPropertyToCategory(propName: string): string | null {
  const mapping: Record<string, string> = {
    'robotics': 'robotics',
    'robotics score': 'robotics',
    'web': 'web',
    'web dev score': 'web',
    'design': 'design', 
    'design score': 'design',
    'mobile': 'mobile',
    'mobile score': 'mobile',
    'data': 'data',
    'data science score': 'data',
    'hardware': 'hardware',
    'hardware score': 'hardware'
  };
  
  return mapping[propName.toLowerCase()] || null;
}

function getDateFromPage(page: PageObjectResponse): string {
  const property = page.properties['Year'];
  if (property?.type === 'number' && property.number !== null) {
    return property.number.toString();
  }
  return new Date().getFullYear().toString(); // Fallback to current year
}

// Default categories - Updated with Figma design colors
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'research', name: 'Research', color: '#97CCF6', icon: 'research' },
  { id: 'robotics', name: 'Robotics', color: '#B2E272', icon: 'robotics' },
  { id: 'software', name: 'Software', color: '#D096F5', icon: 'software' },
  { id: 'sculpture', name: 'Sculpture', color: '#F1BD6B', icon: 'sculpture' },
  { id: 'videography', name: 'Videography', color: '#F5C16B', icon: 'videography' },
  { id: 'play', name: 'Play', color: '#EC6F6B', icon: 'play' },
];
