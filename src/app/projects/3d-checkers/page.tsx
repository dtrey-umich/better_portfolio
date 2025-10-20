'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';

export default function ProjectPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">3d checkers</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>I initially encountered 3D checkers in a pizza restaurant in Massachusetts, an old version of the game from the 70s made of black and red injection-molded plastic. I never actually got to play the game but became obsessed with redesigning it. I wanted to use higher-quality materials that would last longer and improve the user experience. On the rest of that trip, I spent a lot of time in my head designing the game you can see below.

The board has 16 tiles on which checkers can be placed. 4 are glued to the wooden baseboard and the remaining 12 float above the board. Each tile is placed on one of the 4 acrylic rods affixed to the base piece. They are separated by long spacers that lock into the tiles, ensuring everything aligns when assembled. In each tile, there are 4 pieces of felt that dampen the checkers as they are moved about the board, preventing them from falling. The checkers have grooves that I filled with colorful beads and clear glue. This mimics the crowns on the bottoms of the original pieces that indicate when a checker has reached the opposing end of the board and can now move in all directions.

I modeled the checkerboard completely before I started printing. This practice ensures all the pieces fit together which was especially important for the pieces that lock together.</p>
        </div>
      </motion.div>
    </div>
  );
}