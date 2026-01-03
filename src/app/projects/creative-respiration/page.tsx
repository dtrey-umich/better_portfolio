'use client';

import React, { Suspense } from 'react';
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
        <h1 className="text-4xl font-bold mb-2">Creative Respiration</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="my-8"><iframe width="560" height="315" src="https://www.youtube.com/embed/35hLi5jyS8c?si=T0-XiJMlnHhQuoI9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
<p className="mb-6">some wonderful new text here to test a notion sync</p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}