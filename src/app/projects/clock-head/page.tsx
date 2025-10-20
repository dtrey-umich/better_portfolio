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
        <h1 className="text-4xl font-bold mb-2">Clock head</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>I am obsessed with time. I like to be at places at exact times, although my mom might argue with me about that. Sometimes I feel like my life is set to the tick of a clock rather than the free will of my brain. I go to class, eat lunch, drive home, and work on homework at about the same times every day. It makes me wonder if humans run the time or if time runs the humans. I made this clock to celebrate the tension and ambiguity of my relationship with time.

Before I got the watch I now wear every day, I had a cheap Armitron that I modified to be a bit more colorful (seen below to the left). I set that watch to beep every hour which was helpful to keep track of time throughout the day. Although, when I retired that watch, replacing it with something far better, I stored it in a box under my bed where it continued to beep every single hour. I remember at some point making an attempt to turn it off and failing so it continued to beep all hours of the day. I decided that instead of getting rid of the watch, I would give it new life as a desk clock. I deconstructed the watch and removed the electronics which I installed in a 3D-printed case in the shape of a head. Now it lives on my desk and is a favorite project of those who observe my work. It stands as an offputting nod to the control that we give to inhuman systems.</p>
        </div>
      </motion.div>
    </div>
  );
}