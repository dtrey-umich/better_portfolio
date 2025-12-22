import { HomePageClient } from './HomePage';
import path from 'path';
import fs from 'fs/promises';
import { Suspense } from 'react';

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
  // Load real projects from generated JSON
  let projects = [];
  try {
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf-8');
    const { projects: loadedProjects } = JSON.parse(projectsData);
    projects = loadedProjects;
  } catch (error) {
    console.error('Error loading projects:', error);
  }

  const categories = DEFAULT_CATEGORIES;
  
  console.log('Loaded projects:', projects.length);

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomePageClient 
        initialProjects={projects}
        categories={categories}
      />
    </Suspense>
  );
}
