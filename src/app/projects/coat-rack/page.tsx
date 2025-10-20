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
        <h1 className="text-4xl font-bold mb-2">Coat rack</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>During the pandemic, I started wearing this orange hat that my dad gave me every day. It made keeping my hair out of my eyes easy and I liked its worn look. At some point when I realized the hat was an important part of my wardrobe, I originally designed a simple yet weak little hook to place next to my door where I could store it initially. This worked for a while until I realized that I had more things I wanted to store in the same location that the hook couldn’t handle (like my jacket and growing hat collection). I needed a vertical coat rack with multiple hooks, so I made one.

Like many other engineers and designers that I know, I have a tendency to overcomplicate things. I like this project because I think I hit the target perfectly. This coat rack fits perfectly in that space next to my door and is absolutely strong enough to hang my heavy bags and coats as well as my hats. Plus, it totally matches my build style: brushed aluminum, 3D printed parts, and polycarbonate. It continues to be a monument of the good projects I am capable of, greeting me every time I return to my space.</p>
        </div>
      </motion.div>
    </div>
  );
}