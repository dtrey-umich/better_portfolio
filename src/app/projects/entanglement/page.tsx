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
        <h1 className="text-4xl font-bold mb-2">Entanglement</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>In this work, I wanted to continue involving the internet as a subject in my art. However, this time, I wanted to communicate how little we actually know about how the internet works, representing it with a black box with only a little light coming out of it. Additionally, with these photos, I wanted to involve a human subject more like I did in Infinitely Interconnected and At Your Door, incorporating the idea that humans and their networks are inseparable. Again, I used only a hand to express the interaction between humans and their networks. Although, this time I wanted to create more interaction between the human subject and the work by entangling the hand in the composition with the optical fibers.

The box in the picture is made of 6 custom 3D-printed panels and brackets. The inside of the box is lit with a custom-made cubic LED panel, that efficiently delivers enough light to optical fibers that attach to the square panels of the cube. The whole assembly is mounted on an acrylic rod and placed on a black backdrop for all of the photos.</p>
        </div>
      </motion.div>
    </div>
  );
}