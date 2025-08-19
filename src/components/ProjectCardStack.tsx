'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCard } from './ProjectCard';
import { Category } from './CategoryButton';

interface ProjectCardStackProps {
  projects: Project[];
  categories: Category[];
  hoveredCategory: string | null;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onProjectClick: (project: Project) => void;
}

export function ProjectCardStack({ 
  projects, 
  categories, 
  hoveredCategory, 
  isExpanded,
  onToggleExpanded,
  onProjectClick 
}: ProjectCardStackProps) {
  
  // Filter projects that should peek when hovering a category
  const peekingProjects = hoveredCategory 
    ? projects.filter(project => 
        project.categoryScores[hoveredCategory] > 0
      )
    : [];

  return (
    <div className="relative w-[350px] h-[280px]">
      {/* See All Projects Card - Same size as other cards, all white */}
      <motion.div
        className="absolute inset-0 w-[350px] h-[280px] bg-white rounded-2xl shadow-lg cursor-pointer flex items-center justify-center text-black border"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggleExpanded}
        style={{ 
          zIndex: projects.length + 1,
          fontFamily: 'Gabarito, sans-serif'
        }}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">📂</div>
          <div className="text-[32px] font-medium mb-2">See All Projects</div>
          <div className="text-base opacity-60">
            {projects.length} projects
          </div>
        </div>
      </motion.div>

      {/* Project Cards Stack */}
      <AnimatePresence>
        {projects.map((project, index) => {
          const shouldPeek = hoveredCategory && peekingProjects.includes(project);
          const shouldSplay = isExpanded || shouldPeek;
          
          return (
            <motion.div
              key={project.id}
              className="absolute inset-0"
              style={{ zIndex: projects.length - index }}
              initial={false}
              animate={{
                x: shouldSplay ? (index + 1) * 12 : 0,
                y: shouldSplay ? (index + 1) * 8 : (index + 1) * 8,
                rotate: shouldSplay ? (index + 1) * 2 : (index + 1) * 2,
                opacity: shouldSplay ? 0.95 : 0.1,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40
              }}
            >
              <ProjectCard
                project={project}
                categories={categories}
                onClick={() => onProjectClick(project)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}