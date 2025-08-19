'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    title: "Interdisciplinary Innovation",
    description: "Breaking down silos between technology, art, and research to create work that transcends traditional boundaries.",
    icon: "🔬"
  },
  {
    title: "Human-Centered Design",
    description: "Every project starts with understanding human needs, experiences, and the broader impact on communities.",
    icon: "🤝"
  },
  {
    title: "Experimental Mindset",
    description: "Embracing failure as learning, prototyping rapidly, and pushing beyond conventional solutions.",
    icon: "⚡"
  },
  {
    title: "Sustainable Practice",
    description: "Considering environmental impact and long-term sustainability in both process and outcomes.",
    icon: "🌱"
  },
  {
    title: "Open Collaboration",
    description: "Sharing knowledge, building on others' work, and fostering communities of practice.",
    icon: "🌐"
  },
  {
    title: "Ethical Technology",
    description: "Developing technology that respects privacy, promotes equity, and enhances human agency.",
    icon: "⚖️"
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
          <h1 className="text-[48px] font-medium text-black mb-8">Principles</h1>
          
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed mb-12 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            These core principles guide every project, decision, and collaboration. 
            They represent not just how I work, but what I believe technology and creativity can achieve.
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
                  <div className="text-3xl">{principle.icon}</div>
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
