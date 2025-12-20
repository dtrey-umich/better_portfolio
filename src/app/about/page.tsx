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
          <h1 className="text-4xl font-bold mb-2">About</h1>
          
          <div className="flex justify-between items-center mb-8">
            <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>yellow bolt who?</p>
            <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          </div>
          <div className="flex gap-12 mb-12">
            {/* Bio content - first paragraph */}
            <div className="flex-1 prose prose-lg max-w-none">
              <motion.p 
                className="text-lg text-gray-700 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              >
                Trey Davis is a robotics engineer, artist, and researcher currently studying at the University of Michigan. His portfolio of works, playfully named <span style={{ color: '#F1BD6B', fontFamily: "'Trey Handwrite', cursive" }}>yellow bolt</span>, contains not just robots but explorations into how robots can change the way we see the constructed world and each other. His most recent artwork is meant to engage the viewer in thinking about the reality of being a creative individual and how technology stretches our perception of what being creative really means. In the same scope, he is currently researching how social robots can scaffold the creative process to make creativity more accessible and rewarding.
              </motion.p>
            </div>

            {/* Headshot */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <img 
                src="/better_portfolio/images/about_picture.jpg"
                alt="Trey Davis"
                className="w-64 h-80 object-cover rounded-lg"
              />
            </motion.div>
          </div>

          {/* Second paragraph - full width */}
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Trey is not active on most traditional social media but you can find him on <a href="https://www.linkedin.com/in/trey-davis-916163221" target="_blank" rel="noopener noreferrer" className="transition-opacity duration-200 hover:opacity-60" style={{ color: '#5B9BD5' }}>LinkedIn</a> and <a href="https://github.com/dtrey-umich" target="_blank" rel="noopener noreferrer" className="transition-opacity duration-200 hover:opacity-60" style={{ color: '#5B9BD5' }}>Github</a>. If you really would like to speak to him, he would much prefer you to reach out to him directly at <a href="mailto:yellowboltphotography@gmail.com" className="transition-opacity duration-200 hover:opacity-60" style={{ color: '#5B9BD5' }}>yellowboltphotography@gmail.com</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
