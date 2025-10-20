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
        <h1 className="text-4xl font-bold mb-2">Stapler</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>At one point in the pandemic, I was sick of using the stapler in my house to staple stuff I was working on for online school. In need of a small project, I found this stapler at an estate sale. I fell in love with its style and wanted to clean it up, surpassing its former glory. I decided that giving it a red coat of paint would bring out its sleek form. In the end, it turned out to be a brilliantly colored piece of equipment in the end.

I want to be clear that I am not trying to pass off someone else's work as my own. Instead, I use this stapler project as an example of the types of projects I enjoy working on and the style that I tend to gravitate towards. As you can see in some of my other projects, I really enjoy bold colors and well-designed objects. However, I discovered that this stapler is so old that I can't find the size of the staples that it uses. As a result, it remains on my wall as a decorative piece and a reminder of my love for interesting mechanisms. Despite not being able to use it as a stapler, I appreciate its well-designed mechanism and eye-catching red color.</p>
        </div>
      </motion.div>
    </div>
  );
}