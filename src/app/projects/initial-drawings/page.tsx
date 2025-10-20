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
        <h1 className="text-4xl font-bold mb-2">Initial drawings</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>The core purpose of this project is to showcase the beautiful complexity of the world around us; these works are the most literal interpretation of that goal. They were the first drawings I completed when I started this project, and they allowed me to explore the complexity of my topic before digging into the technical challenges of representing my ideas in sculptures. Like infographics, both drawings showcase a product and technical information about it. In drawing #1, I used a disposable lighter to explore hidden design choices and discoveries in a common product and how that information can be displayed visually. In drawing #2, I did the same thing with paper labels but tried to focus more on manufacturing techniques rather than design choices. These themes of hidden design choices and manufacturing techniques were key ideas that guided the works that came after these drawings. The drawings served as an important stepping stone to exploring those themes in all their complexity.

Some people around me wondered why on earth I would draw a lighter for my first work. The answer is that it is a relatively simple product with a complex story. The only way the modern disposable lighter could be possible is with the invention of plastics, isobutane, and the other materials used in its manufacturing process. I wanted to showcase those things plus a little bit about the inventors and chemistry inside a lighter. I used chemical structures and reactions because they are easily visible and understood. While that is a really rudimentary way to capture the complexity of this product, it definitely works, and there were aspects of this method of capturing meaning that I used later on.

Over the summer, I worked with the maintenance team of a paper label factory as an intern. While</p>
<p>at that job, I discovered that a lot of background work takes place to create simple products. I knew that manufacturing systems were complex but I began to understand the depth of that complexity in a way only experiencing it could deliver. In this work, I wanted to show some of that complexity as I did in the lighter drawing. I tried to break down the process and display some of the machines used to make paper labels, ultimately discovering that attempting to represent the manufacturing process of even a simple product in all its complexity was impossible in these highly literal drawings. This pushed me to create the first abstract sculptural work for this set of art pieces.</p>
        </div>
      </motion.div>
    </div>
  );
}