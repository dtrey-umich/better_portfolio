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
        <h1 className="text-4xl font-bold mb-2">Minidisk</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>This is my leatherwork at its best. I made this case for a MiniDisk player that my mom had from a few years ago so that I could give both the player and the case to my friend from robotics who likes old ways of listening to music as a graduation gift. In the process, I made a video and Instagram post from it that got a lot of attention. Plus, the final product looks really stylish. I love how the silver hardware works together with the white stitching and rainbow ribbon to make a really lovely color palette.

Sometimes when I show projects like this to people, they assume that I’m just really good at leatherworking but the truth is that I learn a lot on the fly. For this project, I tried stitching two panels of leather perpendicular to each other for the first time. That’s something I really enjoy about making a bunch of little projects. Over time, I have accumulated a decent amount of applicable knowledge that allows me to make more and more interesting things.</p>
        </div>
      </motion.div>
    </div>
  );
}