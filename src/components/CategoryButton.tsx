'use client';

import { motion } from 'framer-motion';
import React from 'react';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  onToggle: () => void;
  onHover: (categoryId: string | null) => void;
}

// Icon component that uses your original SVG files with color overlay
const CategoryIcon = ({ category, isActive }: { category: Category; isActive: boolean }) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/category-icons/${category.id}_icon.svg`);
        const text = await response.text();
        // Remove the hardcoded fill="black" and force dimensions to make it inherit CSS size
        const modifiedSvg = text
          .replace(/fill="black"/g, '')
          .replace(/width="[^"]*"/g, 'width="100%"')
          .replace(/height="[^"]*"/g, 'height="100%"');
        setSvgContent(modifiedSvg);
      } catch (error) {
        console.error(`Failed to load ${category.id} icon:`, error);
      }
    };
    
    loadSvg();
  }, [category.id]);
  
  if (!svgContent) {
    return <div className="w-10 h-10" />; // Placeholder while loading
  }
  
  return (
    <div 
      className={`w-10 h-10 transition-all duration-200`}
      style={{ 
        color: category.color,
        fill: category.color
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export function CategoryButton({ 
  category, 
  isActive, 
  onToggle, 
  onHover 
}: CategoryButtonProps) {
  return (
    <motion.button
      className={`
        w-[240px] h-20 rounded-2xl font-medium text-lg transition-all duration-200 border
        flex items-center justify-between px-6
        ${isActive 
          ? 'border-2 shadow-md' 
          : 'bg-white border border-gray-300 hover:border-gray-400 shadow-lg'
        }
      `}
      style={{
        backgroundColor: isActive ? `${category.color}15` : '#FFFFFF',
        borderColor: isActive ? category.color : '#d1d5db',
        fontFamily: 'Gabarito, sans-serif',
      }}
      onClick={onToggle}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
    >
      {/* Text left-aligned */}
      <span>{category.name}</span>
      
      {/* Icon right-aligned */}
      <CategoryIcon 
        category={category}
        isActive={isActive}
      />
    </motion.button>
  );
}
