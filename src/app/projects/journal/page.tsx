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
        <h1 className="text-4xl font-bold mb-2">Journal</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>A lot of my making comes from things I need since I would rather learn how something is made, make it myself, and give it handmade sentimental value than buy it. In this case, I needed a journal to keep track of assignments in my Junior year of high school. I could have used the mass-produced one that I found in my closet but I figured that was too poorly constructed for daily use. Instead, I deconstructed that notebook and rebound it with a new, stronger, and better-looking cover made of leather.

I have been leatherworking for a number of years now. I was still learning the ropes in this project but I think it still turned out great. I like the contrast between the dyed sections and the veg-tan-colored areas of the cover. I died the black sections of the cover with screen printing ink which seemed to stick well to the leather and never came off. Then, I gave the cover a stitch around its edge for style. This design was so much better than the journal that I started with that I would expect it to survive for another few years if I needed it to.</p>
        </div>
      </motion.div>
    </div>
  );
}