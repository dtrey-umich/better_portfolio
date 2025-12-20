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
        <h1 className="text-4xl font-bold mb-2">The ocean</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">With many of my previous works, I have attempted to represent different perspectives of the same idea of the complexity of the engineering world around us. In the process of this, I developed a complex understanding of the idea as a whole. In this work, I tried for the first time to fit the entire abstract idea into one set of images. When I think about being a designer and engineer in this world, I see myself swimming among an endless sea of connections, each representing a solution to a problem, observing others’ work, and using it to leverage my own. I see millions of connections from across the ocean binding pairs of unrelated ideas together in beautiful solutions. This is the most abstract and complete idea of all the sculptures in this project that I wanted to realize in this work. And that came in the form of the most complex thread network that I have ever created. A kind of thread network that changes depending on how you look at it and is easy to get lost in.

The piece is made of 50 3D-printed rods, placed in one of the two attached base plates at varying heights. Then, thread is strung between each rod to create 20 independent grids, each one parallel to the last. When viewed at the proper angle, everything aligns and you can see the grid. From any other viewpoint, it’s a colorful mess. Because of the long rods, stringing this piece would have proven difficult to accomplish by hand. Instead, I created the tool above to make it easier to weave the thread around each rod.</p>
        </div>
      </motion.div>
    </div>
  );
}