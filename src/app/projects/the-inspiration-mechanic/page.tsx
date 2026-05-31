'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';


export default function ProjectPage() {
  return (
    <div className="pt-20 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">The Inspiration Mechanic</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Made as an assignment for my videography class, this film explores the fictional identity of a person in control of the inspiration of the world. With an outsized role in defining the outcome of the world, the short film explores the effect we have on others’ creative lives.</p>
<div className="my-8"><iframe width="560" height="315" src="https://www.youtube.com/embed/jXBR_s3Q8S8?si=qGnNNyYCPVlEMgtH" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
<p className="mb-6"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>Just watch the video. There isn’t much more to say</span></p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}