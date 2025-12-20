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
        <h1 className="text-4xl font-bold mb-2">Infinitely interconnected</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">At this point in my project, I was wondering how I hadn’t yet incorporated the internet into any of my works since the internet is such a big force in our lives. In preparing for this work, I tried to abstractly imagine what the physical representation of the internet would look like. It would be discrete but vast, glowy but dark, industrial but organic, and inhuman in a way only humans could accomplish. These photos are the representation of that thought process and they serve as the entry point for the internet into the conversation amongst my works.

Infinitely Interconnected

The photos are situated within a box of 6 mirrors. There are 9 3D printed boxes that are reflected infinitely across the image. Each box has 4 LEDs powered by some custom circuitry. They are lit and run independently for long enough to take these photos. I like the one to the right the most because as alien as the situation looks, it is grounded by my eyes peering into the top of the frame. As with the last piece, this human element brings the whole work together and reminds the viewer that our inorganic systems are human despite our efforts to make them not so.

I just want to note here that originally, I was only going to show 9 modules in my final photo, abandoning the idea of the internet being vast when I explained to my Dad what I was doing. When I told him that I wanted to originally make it look infinite, he exclaimed “mirrors!”. So at 10 pm that night, we set off to find mirrors and sure enough, we found 6 square mirrors big enough to make a box. Those mirrors really made the work come together and match my vision. I love my parents and all they do for me. I don’t know where I would be without them.</p>
        </div>
      </motion.div>
    </div>
  );
}