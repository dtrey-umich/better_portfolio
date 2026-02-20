'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/creative_respiration/face.jpg",
    "width": 6000,
    "height": 4000,
    "alt": "The front of the zoetrope"
  },
  {
    "src": "/images/creative_respiration/controller.jpg",
    "width": 6000,
    "height": 4000,
    "alt": "The custom controller circuit that drives the lights and zoetrope motor"
  },
  {
    "src": "/images/creative_respiration/insides.jpg",
    "width": 5596,
    "height": 3731,
    "alt": "A full look at the mechanical mechanism"
  },
  {
    "src": "/images/creative_respiration/animation.gif",
    "width": 480,
    "height": 320,
    "alt": "The animation inside of the zoetrope"
  }
];


export default function ProjectPage() {
  return (
    <div className="pt-20 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">Creative Respiration</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>A zoetrope and animation about the essentiality of observation in creativity</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2024</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="my-8"><iframe width="560" height="315" src="https://www.youtube.com/embed/35hLi5jyS8c?si=T0-XiJMlnHhQuoI9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
<p className="mb-6">Sometimes I hear this idea that artists are hypersensitive people. They can be perceptive of others’ emotions, world events, or simple facts of being. So much art starts with the simple act of noticing something that people ought to pay attention to. It’s this property that makes artists good at social commentary. </p>
<p className="mb-6">When I was introduced to this idea, I felt excluded because to me artistic process feels and is often portrayed as internal to the mind. This kind of work, the internal processing, reframing, and packaging of ideas, is something that I am very good at. As an engineer, I am very good at analyzing the world to bring new value to it. As an artist, I love brining this analytical view of the world into my work because it can bring unparalleled conceptual depth. But, in this process it’s easy to lose sight of the importance of observation, forgetting that this component of creative thinking is essential. </p>
<p className="mb-6">In this work, I make a homage of the creative process in which the intake of the world holds a definite natural stake. In contrast to popularized views of the artist as thoughtful, this work brings the respiration into the complete picture.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={2} spacing={16} /></div>
        </div>
      </motion.div>
    </div>
  );
}