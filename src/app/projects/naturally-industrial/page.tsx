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
        <h1 className="text-4xl font-bold mb-2">Naturally industrial</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>In a sense, this project is an attempt to view a complex idea from many different perspectives by incorporating certain symbols and hidden meanings. So far, I have been playing with the idea of the world of engineering as inseparable from and entangled with humans. While I used this idea in some of my other works, I did not acknowledge that humans and their systems are also a product of nature and very much at its whims. In these photos, I wanted to capture the idea of our systems being one with nature while also using strange materials as I did in At Your Door.

Originally, I wanted to use fish as an exotic material within this work but because of the high cost and preparation, I decided not to. In searching for a new addition to the piece, I remembered that I had these plants in my room and I think they are a perfect alternative because their roots match the network-look of the thread that I have used in other works.</p>
        </div>
      </motion.div>
    </div>
  );
}