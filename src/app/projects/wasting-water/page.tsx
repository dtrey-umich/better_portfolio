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
        <h1 className="text-4xl font-bold mb-2">Wasting water</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">After Shepherd of Chaos and Prosperity, the idea that hiding our engineering processes also concealed dangerous practices became far more prevalent in my works. After all, the tension between the chaos and the wonders we can create with innovation was an interesting idea to explore. This made me review some of my previous ideas with renewed eyes. Yes, the distribution systems that brought packages to our doors with increasing certainty were wonderful expressions of human innovation and spirit that I readily explored in At Your Door. However, supply chains are also a dangerous fight with nature, as we take advantage of Earth’s abundant resources to make them exist. They are a fight against the forces that do not want these systems to exist. They are a fight we are certain to lose as our power is far smaller than that of nature. That’s what I wanted to explore in this work.

The tension between the human spirit that wills distribution systems into existence and nature that wishes not to be exploited was a key component of this work, and it goes hand in hand with the tension between the wonders and terrors of engineering. I wanted to illustrate that tension with two objects in motion, one for the human force and one for the natural force. This had the added benefit of making the image appear more temporary which serves as a symbol for the human experience, something that never ceases to change.

Another interesting thing about making an image with two objects in motion is that it makes it harder to control the composition. Since I had a distinct idea about what I wanted this image to look like, I needed to control it in a way I hadn’t done with any of my other works which allowed me to let my engineering skills shine. In order to get the water to move in the way I wanted,</p>
<p className="mb-6">I designed a mechanism that could stir the water really quickly, creating a whirlpool effect. This system was composed of two magnetically aligned spinners that were able to get the water to move without having to drill a hole into the container I was using and risk water leaking all over my expensive camera equipment. By spinning the bottom spinner really quickly with a motor I took out of a vacuum cleaner, the top spinner swirled the water, creating the desired effect.</p>
        </div>
      </motion.div>
    </div>
  );
}