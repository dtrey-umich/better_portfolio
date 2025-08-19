'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function InstructionalText() {
  return (
    <motion.div
      className="text-left mb-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Main instruction text */}
      <h2 
        className="text-3xl text-black mb-1"
        style={{ fontFamily: 'Gabarito, sans-serif' }}
      >
        Mix and match topics of interest to see relevant projects
      </h2>
      
      {/* Subtext with clickable Principles link */}
      <p 
        className="text-xl text-black"
        style={{ fontFamily: 'Trey Handwrite, cursive' }}
      >
        For more information, see{' '}
        <Link href="/principles">
          <motion.span
            className="text-[#97CCF6] hover:text-[#7BB8E8] cursor-pointer no-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            PRINCIPLES
          </motion.span>
        </Link>
      </p>

      {/* Large arrow overlay positioned to the right of main text */}
      <img 
        src="/images/Explanatory text arrow.png" 
        alt="Explanatory arrow pointing to text"
        className="absolute -top-30 right-7 h-70 w-auto pointer-events-none z-10"
      />
    </motion.div>
  );
}
