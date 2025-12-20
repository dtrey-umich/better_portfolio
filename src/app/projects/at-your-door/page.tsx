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
        <h1 className="text-4xl font-bold mb-2">At your door</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">In this work, I wanted to pair the abstract ideas from the Disposable Matrix with the more literal ideas from my drawings by using a common product as a starting point to explore complex systems. Similar to my drawings, I used an Amazon shipping box to ground this exploration in reality and incorporated the same abstract symbols of complex interconnected systems to elicit a conversation about the systems behind this product. In this work, the symbols come in the form of images from Amazon patents, tape, pieces of maps, and bits of thread to show the expansive interconnectivity and complexity of the fulfillment networks that bring packages to our doors every day. In addition, the hand in the top left of the first image gives the work a greater human connection since these networks I’m trying to make art about are intrinsically human-made.</p>
        </div>
      </motion.div>
    </div>
  );
}