'use client';

import { motion } from 'framer-motion';
import React from 'react';

// Icon component that uses your original SVG files with color overlay
const CategoryIcon = ({ principleId, color }: { principleId: string; color: string }) => {
  const [svgContent, setSvgContent] = React.useState<string>('');
  
  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/better_portfolio/category-icons/${principleId}_icon.svg`);
        const text = await response.text();
        // Remove the hardcoded fill="black" and force dimensions to make it inherit CSS size
        const modifiedSvg = text
          .replace(/fill="black"/g, '')
          .replace(/width="[^"]*"/g, 'width="100%"')
          .replace(/height="[^"]*"/g, 'height="100%"');
        setSvgContent(modifiedSvg);
      } catch (error) {
        console.error(`Failed to load ${principleId} icon:`, error);
      }
    };
    
    loadSvg();
  }, [principleId]);
  
  if (!svgContent) {
    return <div className="w-12 h-12" />; // Placeholder while loading
  }
  
  return (
    <div 
      className="w-12 h-12"
      style={{ 
        color: color,
        fill: color
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

const principles = [
  {
    id: 'research',
    title: "Research",
    description: "When the focus is centered on learning something new",
    color: '#97CCF6'
  },
  {
    id: 'robotics',
    title: "Robotics",
    description: "Custom Electro-mechanical systems",
    color: '#B2E272'
  },
  {
    id: 'software',
    title: "Software",
    description: "Anything that I have bootstrapped to enable a project or system",
    color: '#D096F5'
  },
  {
    id: 'sculpture',
    title: "Sculpture",
    description: "Installations and physical objects made to be displayed as art",
    color: '#F1BD6B'
  },
  {
    id: 'videography',
    title: "Videography",
    description: "Moving images presented online and in person",
    color: '#F5C16B'
  },
  {
    id: 'play',
    title: "Play",
    description: "Silly goofy projects that are not super professional",
    color: '#EC6F6B'
  }
];
export default function Principles() {
  return (
    <div 
      className="min-h-screen bg-white"
      style={{ fontFamily: 'Gabarito, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-[60px] py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h1 className="text-4xl font-bold mb-2">Principles</h1>
          <div className="flex justify-between items-center mb-8">
            <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>How to understand my wacky portfolio</p>
            <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          </div>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed mb-12 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            As a roboticist, artist, and researcher, I find myself wildly swinging between individual disciplines that other people spend their whole lives studying. My projects never seem to fit cleanly into one category which makes presenting my work a frustrating task. My approach to combat this is to document the degree to which each of my projects fits into the themes below and curate what I send people based on what I know they are interested in. Since I can’t be there to individually curate for everyone, you can pick one or more of these themes that align with what you want to see and my portfolio will automatically find and display the best projects based on what you picked.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.1), 
                  ease: [0.2, 0.8, 0.2, 1] 
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start gap-4">
                  <CategoryIcon principleId={principle.id} color={principle.color} />
                  <div>
                    <h3 className="text-xl font-medium text-black mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <h2 className="text-2xl font-medium text-black mb-4">In Practice</h2>
            <p className="text-gray-700 leading-relaxed">
              These principles aren't just aspirational—they're embedded in every project workflow, 
              from initial research and ideation through prototyping, testing, and deployment. 
              They inform decisions about tools, methodologies, partnerships, and the broader 
              impact of each piece of work.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
