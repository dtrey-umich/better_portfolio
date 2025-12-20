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
        <h1 className="text-4xl font-bold mb-2">Flowers</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">I live on a Trail in Dallas, Texas and when spring comes around, the flowers in the grass on either side of the trail bloom in all their orange and yellow beauty. They brighten up my neighborhood and give our trails a distinctive look. I shot these photos in the height of spring when all of the flowers on my local trail were in full bloom. I picked as many varieties as I could, brought them into my studio, and shot them against a black background with my macro lens.

I love how in some of these photos, the flowers bring an element of movement to the composition. For example, in the photo on the right, the grain of the flowers guides the viewer’s eyes from the center of the image outward which is very appealing. You can see the same effect in the image of a smaller flower below. In that photo, I especially like how the movement and symmetry of the subject are contrasted with the dark space.

I have shot many subjects with a macro lens against a solid background before. What makes this project special is the video I made to go with the photos. This video, seen to the left, not only details how I shot each flower but also features a series of robotics-enabled clips. In these clips, the flowers rotate back and forth on the screen to show off their colors, textures, and depth. To make these, I mounted each subject on a metal clip (seen below) attached to a programmable servo motor. Then, using an Arduino and my laptop, I programmed and filmed the motion of each flower. Finally, using the best clips and video editing software, I created longer repetitive sequences. I suppose that I could have done all of this manually, rotating the flowers back and forth by hand. However, this simple setup allowed me to capture the motion of my subjects more precisely. I see this project as a</p>
<p className="mb-6">precursor to my Robot Arm project in which I seek to use robotics to film clips like these but at a much larger scale.</p>
        </div>
      </motion.div>
    </div>
  );
}