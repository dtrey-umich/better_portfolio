'use client';

import { motion } from 'framer-motion';
import { NotionContent } from '@/components/NotionContent';
import { DEFAULT_CATEGORIES } from '@/data/mockProjects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* Project content will be inserted here during build time */}
        <div className="prose prose-lg max-w-none">
          {/* Content will be generated here */}
        </div>
      </motion.div>
    </div>
  );
}