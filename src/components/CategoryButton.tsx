'use client';

import { motion } from 'framer-motion';

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

export function CategoryButton({ 
  category, 
  isActive, 
  onToggle, 
  onHover 
}: CategoryButtonProps) {
  return (
    <motion.button
      className={`
        w-[140px] h-12 rounded-2xl font-medium text-base transition-all duration-200 border
        flex items-center justify-between px-4
        ${isActive 
          ? 'text-white border-transparent shadow-sm' 
          : 'text-black bg-white border-gray-200 hover:border-gray-300'
        }
      `}
      style={{
        backgroundColor: isActive ? category.color : '#FFFFFF',
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
      <img 
        src={`/category icons/${category.id}_icon.svg`} 
        alt={`${category.name} icon`}
        className="w-4 h-4"
        style={{ 
          filter: isActive ? 'brightness(0) invert(1)' : 'none' 
        }}
      />
    </motion.button>
  );
}
