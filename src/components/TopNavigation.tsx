'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

const navigationItems = [
  { name: 'Explore', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Principles', href: '/principles' },
];

const categories = [
  { id: 'research', color: '#97CCF6' },
  { id: 'robotics', color: '#B2E272' },
  { id: 'software', color: '#D096F5' },
  { id: 'sculpture', color: '#F1BD6B' },
  { id: 'videography', color: '#F5C16B' },
  { id: 'play', color: '#EC6F6B' },
];

// Category Icon component for nav
const CategoryIconNav = ({ categoryId, color, isActive, onClick }: { categoryId: string; color: string; isActive: boolean; onClick: () => void }) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/category-icons/${categoryId}_icon.svg`);
        const text = await response.text();
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
    return <div className="w-6 h-6" />;
  }
  
  return (
    <motion.button
      onClick={onClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer`}
      style={{ 
        backgroundColor: isActive ? `${color}30` : 'transparent',
        border: isActive ? `2px solid ${color}` : '1px solid #e5e7eb',
        color: color,
        fill: color
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="w-4 h-4"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </motion.button>
  );
};

export function TopNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get active categories from URL
  const categoriesParam = searchParams.get('categories');
  const activeCategories = categoriesParam ? categoriesParam.split(',').filter(cat => cat.trim()) : [];

  // Preserve URL params when navigating to home
  const getHomeHref = () => {
    const query = searchParams.toString();
    return query ? `/?${query}` : '/';
  };

  // Handle category icon click - toggle category in URL
  const handleCategoryClick = (categoryId: string) => {
    const newCategories = activeCategories.includes(categoryId)
      ? activeCategories.filter(id => id !== categoryId)
      : [...activeCategories, categoryId];
    
    const params = new URLSearchParams();
    if (newCategories.length > 0) {
      params.set('categories', newCategories.join(','));
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    router.push(newUrl, { scroll: false });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-200"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-[60px] py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={getHomeHref()} className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <img
                src="/images/Site Logo.JPG"
                alt="Site Logo"
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Category Icon Circles */}
            <div className="flex gap-2">
              {categories.map((category) => {
                const isActive = activeCategories.includes(category.id);
                return (
                  <motion.div
                    key={category.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryIconNav 
                      categoryId={category.id} 
                      color={category.color}
                      isActive={isActive}
                      onClick={() => handleCategoryClick(category.id)}
                    />
                  </motion.div>
                );
              })}
            </div>
            
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const query = searchParams.toString();
              const href = query ? `${item.href}?${query}` : item.href;
              
              return (
                <Link key={item.name} href={href}>
                  <motion.div
                    className={`
                      relative px-4 py-2 text-base font-medium transition-colors duration-200
                      ${isActive 
                        ? 'text-black' 
                        : 'text-gray-600 hover:text-black'
                      }
                    `}
                    style={{ fontFamily: 'Gabarito, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
