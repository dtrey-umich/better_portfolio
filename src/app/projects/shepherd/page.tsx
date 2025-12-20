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
        <h1 className="text-4xl font-bold mb-2">Shepherd</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">The dynamic between humans and the artificial world of engineering they have created is a central theme for these works. In working with that idea, I have realized that a lot is lost when we hide the inner workings of our world. Of course, there are a lot of hidden wonders that I have tried to highlight within other works, but there are also a lot of hidden dangers. For example, your experience buying a phone involves no learning about the lithium mining or aluminum refinement that has to take place to get it into your hands, and ultimately the costs of these practices are hidden from sight. In this set, I tried to focus on the danger of the hidden, its tension with the intricate, and the control we exert over the balance between chaos and life. This set also serves as a turning point for the whole project, as I begin to incorporate more symbols of danger and stress.

Shepherd of chaos and prosperity

The different parts of the composition and what they represent are perhaps a little obvious. The fire represents danger, chaos, and disorder while the threaded network below represents the beauty of complexity like in all of my other works. The hand in the middle is the human aspect of this work. It is composed of different branding and logos, ultimately depicting that the large corporations that control the balance of danger and order act on behalf of humanity. There’s also tension represented by the transition from light to dark in the background, amplifying the themes of the rest of the composition.

The hand was made with a 3D-printed inner core which was covered in branding taken from magazines. It is held above the baseplate with a custom steel bracket and thread is strung between the hand and the baseplate using eye-screws. The fire was created in a controlled</p>
<p className="mb-6">environment using some old physics homework.</p>
        </div>
      </motion.div>
    </div>
  );
}