'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryButton, Category } from '@/components/CategoryButton';
import { ProjectCard, Project } from '@/components/ProjectCard';
import { IconSprite } from '@/components/IconSprite';

interface HomePageClientProps {
  initialProjects: Project[];
  categories: Category[];
}

export function HomePageClient({ initialProjects, categories }: HomePageClientProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // Simple: calculate which projects should be in gallery
  const galleryProjects = showAllProjects 
    ? initialProjects
    : activeCategories.length === 0 
      ? []
      : initialProjects.filter(project => {
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
  const stackProjects = initialProjects.filter(project => !galleryProjects.includes(project));
  
  // Current active category for determining layout
  const currentCategory = activeCategories.length > 0 ? activeCategories[0] : null;

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setShowAllProjects(false);
  };

  const handleSeeAllProjects = () => {
    setShowAllProjects(true);
    setActiveCategories([]);
  };

  const handleProjectClick = (project: Project) => {
    console.log('Navigate to project:', project.slug);
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
        {/* Main Content Layout */}
        <div className="flex items-start gap-[120px] mb-[80px]">
          {/* Left: Card Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <div 
              className="relative w-[350px] h-[280px]"
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => setIsStackHovered(false)}
            >
              {/* See All Projects Card */}
              <motion.div
                className="absolute inset-0 w-[350px] h-[280px] bg-white rounded-2xl shadow-lg cursor-pointer flex items-center justify-center text-black border"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSeeAllProjects}
                style={{ 
                  zIndex: initialProjects.length + 1,
                  fontFamily: 'Gabarito, sans-serif'
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">📂</div>
                  <div className="text-[32px] font-medium mb-2">See All Projects</div>
                  <div className="text-base opacity-60">
                    {initialProjects.length} projects
                  </div>
                </div>
              </motion.div>

              {/* All Cards - Always render all for smooth layoutId transitions */}
              <AnimatePresence>
                {initialProjects.map((project, index) => {
                  const isVisible = !currentCategory || stackProjects.slice(0, 4).includes(project);
                  const shouldPeek = hoveredCategory && project.categoryScores[hoveredCategory] > 0;
                  const shouldSplay = isStackHovered;
                  const stackIndex = stackProjects.indexOf(project);
                  const isInVisibleStack = stackIndex >= 0 && stackIndex < 4;
                  const isInGallery = currentCategory && galleryProjects.includes(project);
                  
                  return (
                    <motion.div
                      key={`stack-${project.id}`}
                      className="absolute inset-0"
                      style={{ 
                        zIndex: isInVisibleStack ? 4 - stackIndex : 0,
                        pointerEvents: isVisible ? 'auto' : 'none',
                        opacity: isInGallery ? 1 : undefined // Force instant opacity for gallery cards
                      }}
                      layoutId={project.id}
                      initial={false}
                      animate={{
                        x: isInVisibleStack && shouldSplay ? (stackIndex + 1) * 12 : (isInVisibleStack && shouldPeek ? (stackIndex + 1) * 8 : 0),
                        y: isInVisibleStack ? (shouldSplay ? (stackIndex + 1) * 8 : (stackIndex + 1) * 4) : 20,
                        rotate: isInVisibleStack && shouldSplay ? (stackIndex + 1) * 2 : (isInVisibleStack && shouldPeek ? (stackIndex + 1) * 1 : 0),
                        opacity: isInGallery ? undefined : (isVisible ? 1 : 0), // Don't animate opacity for gallery cards
                        scale: isVisible ? 1 : 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: isVisible ? 500 : 80,
                        damping: isVisible ? 40 : 20,
                        duration: isVisible ? 0.5 : 2.5,
                      }}
                    >
                      <ProjectCard
                        project={project}
                        categories={categories}
                        onClick={() => handleProjectClick(project)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Category Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-[300px]">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="grid grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {galleryProjects.map((project, index) => (
                <motion.div
                  key={`gallery-${project.id}`}
                  layoutId={project.id}
                  initial={{ opacity: 0 }}
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
