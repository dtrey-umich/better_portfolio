'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/portfolio/infra_diagram.jpg",
    "width": 1468,
    "height": 1640,
    "alt": "How I used GitHub actions to sync notion content with static website pages"
  }
];


export default function ProjectPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">The Interdisciplinary Portfolio</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>A custom website that gracefully fits right into my workflow</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">These are the problems I had with Squarespace:</p>





<p className="mb-6">I’m under no illusion that there are thousands of people reading about what I have to say online. But, writing and organizing my thoughts about my projects in a visual manner brings purpose and vision to my otherwise eclectic pursuits. And, the idea that thousands of people could be reading about my work is exciting enough to keep me going. But, the way I used to present my work with Squarespace caused too much of a barrier to adding new work that toppled all these motivations while also extracting $200 out of me very year.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={1} spacing={16} /></div>
<p className="mb-6">The core design principle of the portfolio was to imagine each project as a single piece in a larger narrative. On the surface level of the site design, each project is organized into a “card” with just the most important information. Keeping each project compartmentalized in this way enables them to be rearranged in appealing ways depending on the viewer. </p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}