'use client';

import { motion } from 'framer-motion';
import { Category } from './CategoryButton';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  categories: string[]; // category IDs
  categoryScores: Record<string, number>; // category ID -> score
}

interface ProjectCardProps {
  project: Project;
  categories: Category[];
  onClick: () => void;
}

export function ProjectCard({ project, categories, onClick }: ProjectCardProps) {
  const projectCategories = categories.filter(cat => 
    project.categories.includes(cat.id)
  );

  return (
    <motion.div
      className="w-[350px] h-[280px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" 
      }}
      onClick={onClick}
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
      {/* Image Section - 5:4 aspect ratio */}
      <div className="aspect-[5/4] relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <h3 
          className="text-[32px] font-medium text-black mb-3 leading-tight"
          style={{ fontFamily: 'Gabarito, sans-serif' }}
        >
          {project.title}
        </h3>
        
        <p 
          className="text-base text-gray-600 mb-4 leading-relaxed"
          style={{ fontFamily: 'Gabarito, sans-serif' }}
        >
          {project.description}
        </p>
        
        {/* Category Indicators */}
        <div className="flex gap-2 flex-wrap">
          {projectCategories.map(category => (
            <div
              key={category.id}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
              title={category.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
