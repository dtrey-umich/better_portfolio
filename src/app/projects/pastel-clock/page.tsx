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
        <h1 className="text-4xl font-bold mb-2">Pastel clock</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>When I can, I watch The Great Pottery Throw Down with my parents. We like how the potters overcome unexpectedly difficult challenges and admire the craftsmanship of the contestants’ builds. This clock is inspired by that show. I tried to pick colors that give a nod to the soft colors of clay and incorporated a design that I might see on the show. If I had the tools to work with clay, I would have done this in clay. Instead, I stuck to what I’m strong with acrylic paint, polycarbonate sheets, and computer-aided design.

I designed the shapes of the different sections of the clock in Fusion 360 and the pattern for the face of the clock in Adobe illustrator. Then using exported DXFs from both, I used my Cricut cutting machine to cut the patterns for the tiles out of large shipping labels. The Cricut machine produced stickers in the shape of the triangular sections of the clock that guided me when cutting the pieces on my bandsaw. The machine also cut stickers in the shape of the negative space of the pattern that I used as masking for the polycarbonate sections when I painted them. Once painted, the pieces were given a coat of white acrylic paint to fill in the lines and mounted on a wooden base with a clock mechanism placed inside.</p>
        </div>
      </motion.div>
    </div>
  );
}