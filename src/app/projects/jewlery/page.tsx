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
        <h1 className="text-4xl font-bold mb-2">Jewlery</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">I like making jewelry out of brass and interesting materials that I have worked with in other projects. Most significantly, I have made several ear cuffs out of brass that I wear quite often in conjunction with some fake piercings. These ear cuffs and fake piercings are simply open rings of metal that clip around the top ridge of my ear and I like the way they tend to complete my style. I have pictures of those ear cuffs and more below.

Necklaces and Earrings

I don’t wear a lot of jewelry. I wear bracelets and earrings and that’s about it. The rest of the jewelry that I have made is for other people. Most significantly, I have made a necklace for a teammate at robotics and axe earrings as a birthday gift for another friend. The necklace is made of scrap carbon fiber from CNC cutting projects at robotics, jeweler’s wire, and sewing thread. At the request of my other friend, the earrings were made of aluminum, dyed bamboo chopsticks, and some extra hardware. I especially like how the handles were dyed with the same ink that I harvested from disposable pens and used in the ink  photos in my photography portfolio.

To the right, you can see the ear cuff that I wear along with a few fake piercings in a custom-designed leather and fleece basket that I use to store my jewelry. You can see it’s a little empty because I have a tendency to lose my earrings, including the one below and to the right (my friends called it the cheese grater ear cuff). On one occasion, one person liked my cuff so much that they asked me to make another one for them. I made them the one in the orange case on the bottom left and sold it to them as my first-ever commission. Ever since then, the ear cuff has been an essential part of my wardrobe.</p>
        </div>
      </motion.div>
    </div>
  );
}