import { mockProjects } from '@/data/mockProjects';
import { HomePageClient } from './HomePage';

// Define the categories with their colors and icons
export const DEFAULT_CATEGORIES = [
  { id: 'research', name: 'Research', color: '#97CCF6', icon: '🔬' },
  { id: 'robotics', name: 'Robotics', color: '#B2E272', icon: '🤖' },
  { id: 'software', name: 'Software', color: '#D096F5', icon: '💻' },
  { id: 'sculpture', name: 'Sculpture', color: '#F1BD6B', icon: '🎨' },
  { id: 'videography', name: 'Videography', color: '#F5C16B', icon: '🎬' },
  { id: 'play', name: 'Play', color: '#EC6F6B', icon: '🎮' }
];

export async function HomePageServer() {
  // Use mock data for testing animations
  const projects = mockProjects;
  const categories = DEFAULT_CATEGORIES;
  
  console.log('Using mock projects for testing:', projects.length);

  return (
    <HomePageClient 
      initialProjects={projects}
      categories={categories}
    />
  );
}
