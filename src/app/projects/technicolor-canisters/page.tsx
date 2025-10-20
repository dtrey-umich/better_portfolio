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
        <h1 className="text-4xl font-bold mb-2">Technicolor canisters</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>Like many sane humans, I love small containers. I have a box in my room that I use to store random recycled containers and bottles for projects, ready to use at a moment’s notice. However, this is a story of one container I didn’t have. I first found pictures of Technicolor film canisters after a rabbit hole of random internet research late at night. As a fan of old technology, I wanted one as a reminder of what brilliant innovations look like. The problem was that all the antique canisters on eBay were expensive. So, like any good maker, I made my own.

Technicolor Canisters

The canister to the right is my miniature rendering of a technicolor film canister. The canister itself is custom vacuum-formed styrene painted silver with spray paint and weathered with acrylic washes. The form used to make the vacuum-formed shell was 3D printed and loaded onto my small-scale dental thermoforming machine. I experimented with various thicknesses of plastic before I arrived at the result to the right. Of course, the canister would not be complete without the label and since there were no online materials to use for that, I painstakingly redesigned it myself. I did my best to match the original colors and fonts as closely as possible in Adobe Illustrator and used the print and cut function on my Cricut cutting machine to cut out the final labels in two sizes.

I wasn’t fully satisfied with my own rendition of the canister so when I got the chance, I bought an actual canister and put my own label on it which you can see above. Of course, this looks a lot better but I like my custom version more because it looks loved in a way that only a completely handmade object could. It’s interesting how the label really became the star of this project. I eventually ended up putting one on my</p>
<p>computer because I was so proud of how they turned out. That sticker is still on the back of that computer to this day.</p>
        </div>
      </motion.div>
    </div>
  );
}