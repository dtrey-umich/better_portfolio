'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCard } from './ProjectCard';
import { Category } from './CategoryButton';

interface ProjectGalleryProps {
  projects: Project[];
  categories: Category[];
  activeCategories: string[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGallery({ 
  projects, 
  categories, 
  activeCategories,
  onProjectClick 
}: ProjectGalleryProps) {
  
  // Filter and sort projects based on active categories and publish status
  const filteredProjects = projects
    .filter(project => {
      // Only show published projects in the gallery
      if (project.publishStatus !== 'Published') return false;
      
      // If no categories are active, show all published projects
      if (activeCategories.length === 0) return true;
      
      // Calculate total score for active categories
      const totalScore = activeCategories.reduce((sum, categoryId) => {
        return sum + (project.categoryScores[categoryId] || 0);
      }, 0);
      
      return totalScore > 0;
    })
    .sort((a, b) => {
      // Sort by total score descending
      const scoreA = activeCategories.reduce((sum, categoryId) => 
        sum + (a.categoryScores[categoryId] || 0), 0
      );
      const scoreB = activeCategories.reduce((sum, categoryId) => 
        sum + (b.categoryScores[categoryId] || 0), 0
      );
      return scoreB - scoreA;
    });

  return (
    <div className="w-full">
      <AnimatePresence>
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-12"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 500,
                        damping: 40
                      },
                      opacity: { 
                        duration: 0.3,
                        delay: index * 0.05 // Stagger animation
                      },
                      scale: { 
                        duration: 0.3,
                        delay: index * 0.05
                      }
                    }}
                  >
                    <ProjectCard
                      project={project}
                      categories={categories}
                      onClick={() => onProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
          style={{ fontFamily: 'Gabarito, sans-serif' }}
        >
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p>Try selecting different categories to see more projects.</p>
        </motion.div>
      )}
    </div>
  );
}
