'use client';

import { motion } from 'framer-motion';

export function BottomFooter() {
  return (
    <motion.footer
      className="w-full bg-white mt-16"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-[60px] py-8">
        <div className="flex items-center justify-between">
          {/* Signature on the left */}
          <div className="flex items-center">
            <img
              src="/images/signature.png"
              alt="Signature"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Date on the right */}
          <div className="flex items-center">
            <img
              src="/images/date.png"
              alt="Date"
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
