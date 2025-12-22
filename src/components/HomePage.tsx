'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryButton, Category } from '@/components/CategoryButton';
import { ProjectCard, Project } from '@/components/ProjectCard';
import { IconSprite } from '@/components/IconSprite';
import { InstructionalText } from '@/components/InstructionalText';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import React from 'react';

// Small icon component for the "See All Projects" card
const CategoryIconSmall = ({ category }: { category: Category }) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/better_portfolio/category-icons/${category.id}_icon.svg`);
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
    return <div className="w-5 h-5" />; // Placeholder while loading
  }
  
  return (
    <div 
      className="w-5 h-5 opacity-60"
      style={{ 
        color: category.color,
        fill: category.color
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

interface HomePageClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export function HomePageClient({ initialProjects, categories }: HomePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
    const isInitialMount = React.useRef(true);
  // After first mount, suppress entrance animations so query param changes don't replay them
  const disableEntrance = React.useRef(false);
  useEffect(() => {
    disableEntrance.current = true;
  }, []);
  
  const allCategories = ['research', 'robotics', 'software', 'sculpture', 'videography', 'play'];
  
  // Load active categories from URL on mount
  useEffect(() => {
    const categoriesParam = searchParams.get('categories');
    
    if (categoriesParam) {
      const cats = categoriesParam.split(',').filter(cat => cat.trim());
      setActiveCategories(cats);
    }
  }, [searchParams]);
  
    // Update URL when active categories change (but not on initial mount)
  useEffect(() => {
      // Skip URL update on initial mount to prevent loop
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
    
    const updateUrl = () => {
      const params = new URLSearchParams();
      if (activeCategories.length > 0) {
        params.set('categories', activeCategories.join(','));
      }
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      
      // Only push if URL actually changed
      const currentQuery = searchParams.toString();
      const nextQuery = queryString || '';
      if (currentQuery !== nextQuery) {
        router.replace(newUrl, { scroll: false });
      }
    };
    
    // Use a small timeout to avoid too many updates
    const timeout = setTimeout(updateUrl, 100);
    return () => clearTimeout(timeout);
    }, [activeCategories, router, searchParams]);
  
  // Simple: calculate which projects should be in gallery
  const galleryProjects = initialProjects
    .filter(project => project.publishStatus === 'Published') // Always filter for published projects first
    .filter(project => {
      if (activeCategories.length === 0) return false;
      const totalScore = activeCategories.reduce((sum, categoryId) => {
        return sum + (project.categoryScores[categoryId] || 0);
      }, 0);
      return totalScore > 0;
    }).sort((a, b) => {
          const scoreA = activeCategories.reduce((sum, categoryId) => sum + (a.categoryScores[categoryId] || 0), 0);
          const scoreB = activeCategories.reduce((sum, categoryId) => sum + (b.categoryScores[categoryId] || 0), 0);
          return scoreB - scoreA;
        });

  // Simple: calculate which projects should be in stack (not in gallery)
  const stackProjects = initialProjects
    .filter(project => project.publishStatus === 'Published') // Only show published projects in stack
    .filter(project => !galleryProjects.includes(project));
  
  // Current active category for determining layout
  const currentCategory = activeCategories.length > 0 ? activeCategories[0] : null;

  const toggleCategory = (categoryId: string) => {
    setIsTransitioning(true);
    setActiveCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    
    // Clear transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3500); // Slightly longer than the longest animation (3.0s + buffer)
  };

  const handleSeeAllProjects = () => {
    setActiveCategories(allCategories);
  };
  
  const handleProjectClick = (project: Project) => {
    const params = new URLSearchParams();
    
    if (activeCategories.length > 0) {
      params.set('categories', activeCategories.join(','));
    }
    
    const queryString = params.toString();
    const url = queryString 
      ? `/projects/${project.slug}?${queryString}`
      : `/projects/${project.slug}`;
    
    router.push(url);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Could disable animations here if needed
    }
  }, []);

  return (
    <div 
      className="min-h-screen bg-white"
      style={{ fontFamily: 'Gabarito, sans-serif' }}
    >
      <IconSprite />
      
      <div className="max-w-7xl mx-auto px-[60px] py-[60px]">
        {/* Instructional Text */}
        <InstructionalText />
        
        {/* Main Content Layout */}
        <div className="flex items-start gap-[120px] mb-[80px]">
          {/* Left: Card Stack */}
          <motion.div
            initial={disableEntrance.current ? false : { opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <div 
              className="relative w-[500px] h-[400px]"
              onMouseEnter={() => !isTransitioning && setIsStackHovered(true)}
              onMouseLeave={() => !isTransitioning && setIsStackHovered(false)}
            >
              {/* See All Projects Card */}
              <motion.div
                className="absolute inset-0 w-[500px] h-[400px] bg-white rounded-2xl shadow-lg cursor-pointer flex items-center text-black border"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSeeAllProjects}
                style={{ 
                  zIndex: 40, // High enough to be above other cards but below navigation
                  fontFamily: 'Gabarito, sans-serif'
                }}
              >
                <div className="pl-12">
                  <div className="text-[40px] font-medium">See All Projects</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <CategoryIconSmall key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stack Cards - Render visible stack cards + all potential gallery cards */}
              <AnimatePresence>
                {initialProjects.map((project, index) => {
                  const shouldPeek = hoveredCategory && project.categoryScores[hoveredCategory] > 0 && !isTransitioning;
                  const shouldSplay = isStackHovered && !isTransitioning;
                  const stackIndex = stackProjects.indexOf(project);
                  const isInVisibleStack = stackIndex >= 0 && stackIndex < 4;
                  const isInGallery = currentCategory && galleryProjects.includes(project);
                  const couldBeInGallery = activeCategories.some(catId => project.categoryScores[catId] > 0);
                  
                  // Render if: in visible stack OR could potentially be in gallery OR currently in gallery
                  const shouldRender = isInVisibleStack || couldBeInGallery || isInGallery;
                  
                  if (!shouldRender) return null;
                  
                  return (
                    <motion.div
                      key={`stack-${project.id}`}
                      className="absolute inset-0"
                      style={{ 
                        zIndex: isInVisibleStack ? 10 - stackIndex : -1, // Stack cards have lower z-index than See All
                        pointerEvents: isInVisibleStack ? 'auto' : 'none',
                      }}
                      layoutId={project.id}
                      initial={false}
                      animate={{
                        x: isInVisibleStack && shouldSplay ? (stackIndex + 1) * 20 : (isInVisibleStack && shouldPeek ? (stackIndex + 1) * 12 : 0),
                        y: isInVisibleStack ? (shouldSplay ? (stackIndex + 1) * 12 : (stackIndex + 1) * 4) : 4,
                        rotate: isInVisibleStack && shouldSplay ? (stackIndex + 1) * 3 : (isInVisibleStack && shouldPeek ? (stackIndex + 1) * 1.5 : 0),
                        opacity: isInVisibleStack ? 1 : (isInGallery ? 1 : 0), // Pre-rendered cards are invisible until needed
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: {
                          type: "spring",
                          stiffness: 80,
                          damping: 20,
                          duration: 2.5
                        }
                      }}
                      transition={{
                        type: "spring",
                        stiffness: isInVisibleStack ? 500 : 80,
                        damping: isInVisibleStack ? 40 : 20,
                        duration: isInVisibleStack ? 0.5 : 2.5,
                        // Make opacity instant for gallery cards
                        opacity: { duration: isInGallery ? 0 : undefined }
                      }}
                    >
                      <ProjectCard
                        project={project}
                        categories={categories}
                        onClick={isInVisibleStack ? undefined : () => handleProjectClick(project)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Category Buttons */}
          <motion.div
            initial={disableEntrance.current ? false : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 w-[500px]">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={disableEntrance.current ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6 + (index * 0.1),
                    ease: [0.2, 0.8, 0.2, 1] 
                  }}
                >
                  <CategoryButton
                    category={category}
                    isActive={activeCategories.includes(category.id)}
                    onToggle={() => toggleCategory(category.id)}
                    onHover={setHoveredCategory}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gallery - Cards animate here from the stack */}
        <motion.div
          initial={disableEntrance.current ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="grid grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {galleryProjects.map((project, index) => (
                <motion.div
                  key={`gallery-${project.id}`}
                  layoutId={project.id}
                  initial={disableEntrance.current ? false : { opacity: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    transition: { 
                      duration: 0.4,
                      ease: "easeInOut"
                    }
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: (index + 1) * 0.3,
                    duration: 3.0,
                  }}
                  style={{ zIndex: 1 }}
                >
                  <ProjectCard
                    project={project}
                    categories={categories}
                    onClick={() => handleProjectClick(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
