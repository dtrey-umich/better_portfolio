'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Category } from './CategoryButton';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  date: string; // Added date field
  categories: string[]; // category IDs
  categoryScores: Record<string, number>; // category ID -> score
}

interface ProjectCardProps {
  project: Project;
  categories: Category[];
  onClick?: () => void;
}

// Reusable CategoryIcon component for cards
const CategoryIcon = ({ 
  categoryId, 
  categories, 
  size = 'w-6 h-6' 
}: { 
  categoryId: string; 
  categories: Category[];
  size?: string;
}) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  
  // Find the actual category color from the categories prop
  const category = categories.find(cat => cat.id === categoryId);
  const categoryColor = category?.color || '#000000';
  
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/better_portfolio/category-icons/${categoryId}_icon.svg`);
        const text = await response.text();
        // Remove the hardcoded fill="black" and force dimensions to make it inherit CSS size
        const modifiedSvg = text
          .replace(/fill="black"/g, '')
          .replace(/width="[^"]*"/g, 'width="100%"')
          .replace(/height="[^"]*"/g, 'height="100%"');
        setSvgContent(modifiedSvg);
      } catch (error) {
        console.error(`Failed to load ${categoryId} icon:`, error);
      }
    };
    
    loadSvg();
  }, [categoryId]);
  
  if (!svgContent) {
    return <div className={size} />; // Placeholder while loading
  }
  
  return (
    <div 
      className={`${size} transition-all duration-200`}
      style={{ 
        color: categoryColor,
        fill: categoryColor
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export function ProjectCard({ project, categories, onClick }: ProjectCardProps) {
  // Get categories with non-zero scores and sort by score (weakest to strongest)
  const relevantCategories = Object.entries(project.categoryScores)
    .filter(([_, score]) => score > 0)
    .sort(([_, a], [__, b]) => a - b) // Sort by score ascending (weakest first)
    .map(([categoryId]) => categoryId);

  return (
    <motion.div
      className={`w-[500px] h-[400px] bg-white rounded-2xl shadow-lg overflow-hidden group relative ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" 
      }}
      onClick={onClick ? onClick : undefined}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 40
      }}
    >
      <div className="p-8 h-full flex flex-col">
        {/* Header with title, date, and image */}
        <div className="flex justify-between items-start mb-6">
          {/* Left side - Title and Date */}
          <div className="flex-1 pr-6">
            <h3 
              className="text-[30px] font-medium text-black mb-2 leading-tight"
              style={{ fontFamily: 'Gabarito, sans-serif' }}
            >
              {project.title}
            </h3>
            <p 
              className="text-base text-gray-500 italic"
              style={{ fontFamily: 'Gabarito, sans-serif' }}
            >
              {project.date}
            </p>
          </div>
          
          {/* Right side - Project Image */}
          <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* Description */}
        <p 
          className="text-lg text-gray-700 mb-6 leading-relaxed flex-1"
          style={{ fontFamily: 'Gabarito, sans-serif' }}
        >
          {project.description}
        </p>
        
        {/* Bottom row with "Click to read more" and category icons */}
        <div className="flex justify-between items-center">
          {/* Click to read more */}
          {onClick && (
            <p 
              className="text-base text-gray-500 underline"
              style={{ fontFamily: 'Gabarito, sans-serif' }}
            >
              Click to read more
            </p>
          )}
          
          {/* Category icons - positioned with consistent margins */}
          <div className="flex gap-3">
            {relevantCategories.map(categoryId => (
              <CategoryIcon 
                key={categoryId}
                categoryId={categoryId}
                categories={categories}
                size="w-8 h-8"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
