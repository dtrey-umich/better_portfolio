'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div 
      className="min-h-screen bg-white"
      style={{ fontFamily: 'Gabarito, sans-serif' }}
    >
      <div className="max-w-4xl mx-auto px-[60px] py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h1 className="text-[48px] font-medium text-black mb-8">About</h1>
          
          <div className="prose prose-lg max-w-none">
            <motion.p 
              className="text-xl text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Welcome to my portfolio—a dynamic showcase of projects spanning research, robotics, 
              software development, sculpture, videography, and experimental play.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              Each project is categorized and scored across six core areas, allowing you to explore 
              work that resonates with your interests. Whether you're drawn to cutting-edge research, 
              hands-on robotics, elegant software solutions, artistic expression, visual storytelling, 
              or creative experimentation, you'll find projects that push boundaries and explore new possibilities.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              This portfolio represents a commitment to interdisciplinary innovation—where technology 
              meets artistry, where research informs practice, and where creative play leads to 
              unexpected discoveries.
            </motion.p>
            
            <motion.div
              className="bg-gray-50 rounded-2xl p-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h2 className="text-2xl font-medium text-black mb-4">How to Navigate</h2>
              <p className="text-gray-600 leading-relaxed">
                Use the category buttons to filter projects by your areas of interest. 
                Hover over the project stack to see all available work, or click individual 
                category buttons to discover projects that align with specific disciplines. 
                Each project card shows its relative strength across categories through 
                color-coded icons in the bottom right.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
