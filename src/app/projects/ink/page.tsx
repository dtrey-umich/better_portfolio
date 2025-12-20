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
        <h1 className="text-4xl font-bold mb-2">Ink</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">I created a macro rig for my camera not too long ago to capture pictures of flowers and other natural subjects. I never guessed that I would end up using it to create some of my most popular work: photos of ink. The ink I use is harvested from black disposable Bic pens and when combined with alcohol, water, and oil, it makes for a brilliantly colored subject. The vibrant hues come from the ink’s ability to change color as it dries from a royal purple to a bright orange. When lit well, it has the power to produce space-like images that draw the viewer in. Take a look below to see what I’m talking about.

In several of my many shoots involving ink, I experimented with how the background can significantly change the color of the ink. Notice the color difference between the image above and the image to the left. That’s just another reason why ink is so cool to work with.

I don’t always stick to pen ink and alcohol. In fact, I found that cooking oils create interesting effects with pen ink too. As seen by some of the surrounding images, the oil creates these really interesting forms and details that just alcohol does not. I have also experimented with acrylic paint and food dye from the same perspective and they have created equally interesting compositions.</p>
        </div>
      </motion.div>
    </div>
  );
}