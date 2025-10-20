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
        <h1 className="text-4xl font-bold mb-2">Disposable matrix</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>After realizing that I was trying to chase something impossible with my drawings, I turned to my sculptural skills in conceptual artwork to try and deliver my new message. Similar to how people cannot understand the size of numbers like 2.8x10^89, I believe the complexity of the supply chain is beyond human comprehension. I wanted to show this complexity by depicting it as a colorful network of threads. I chose thread because it can be used to make visually intriguing patterns with its wide range of colors and ability to form complex paths through the work. In the center of this sculpture are several miniatures of disposable products: a soda can, a wine bottle, and a coffee cup. I chose these products because they are meant to be used and forgotten. This aligns with my idea of the world of engineering being overlooked in our daily lives in the same way we often don’t think about these disposable products.</p>
        </div>
      </motion.div>
    </div>
  );
}