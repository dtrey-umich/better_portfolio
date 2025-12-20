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
        <h1 className="text-4xl font-bold mb-2">Lamp base</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">I always need an atrocious amount of light for my desk. For a while, that light was provided by a single multi-jointed desk lamp from Ikea which was fine until I started to do a lot more building and found a need for more light. In June of 2021, I bought a second lamp. The issue was that Ikea designed these lamps with tiny bases that provided little support for the high use I was putting them through, causing my lamps to be unstable. Eager to fix the problem, I designed my own base.

The design above was not my first attempt at a modular lamp base. I went through 3 different designs before I arrived at the final one. Initially, I tried to use a long wooden block for the base with several plastic inserts. The problem with this was that it would be difficult to manufacture these bases without the use of a CNC which would have made the build more complex. In the end, I like how the final design turned out. It’s easier to manufacture, does the same job as the initial designs, and fits well into the aesthetic of my room. I actually loved the design of the final lamp base so much that I used almost the same design to create a coat rack for my room too.

The base I designed utilizes the hardware from the original Ikea lamps but creates a number of spots for a lamp to be placed, allowing the base to facilitate a high level of modularity for custom lighting setups. The design is made of an aluminum rail with several 3D-printed inserts, each capable of holding a lamp. The reason why I used individual parts for each lamp placement location was to make it really easy to replace worn-out components as the lamps grind away at the plastic over time. This way, the design is future-proofed and has been able to hold up for the 2+ years I have been using it.</p>
        </div>
      </motion.div>
    </div>
  );
}