'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/down_the_clown/mech.jpeg",
    "width": 2368,
    "height": 1116,
    "alt": "Mechanical Diagram"
  },
  {
    "src": "/images/down_the_clown/elec.png",
    "width": 1280,
    "height": 753,
    "alt": "Electrical Diagram"
  }
];
const photos2 = [
  {
    "src": "/images/down_the_clown/team.jpeg",
    "width": 1280,
    "height": 960,
    "alt": "My wonderful team. Look at how happy they are"
  },
  {
    "src": "/images/down_the_clown/action.jpg",
    "width": 2048,
    "height": 1365,
    "alt": "People playing our game at the expo"
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
        <h1 className="text-4xl font-bold mb-2">Down the Clown</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>Collaborators: Muskaan Mittal, Riley LaMay, Charlie Herz, Jack Stifter</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="my-8"><iframe width="100%" height="500" src="https://www.youtube.com/embed/lvEIGGizwrE?si=45rNlIzB1FYMQc2v" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
<p className="mb-6">Down the Clown is a two-player version of the arcade game that shares its name. In our version of the game, one player (the clown destroyer) throws balls at two moving clowns controlled by another player (the clown savior). Made in collaboration with 4 other people, this project is the largest scale embedded systems project that I have done. As the artist of the team, I was responsible for entire the physical construction of the project in addition to a fair share of the electronics and software.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={2} spacing={16} /></div>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}><strong>Technical achievements:</strong></span></h3>
<ul className="list-disc list-outside ml-12 mt-0 mb-6 space-y-2">
<li className="mb-2">Audio: DMA and double-buffering to stream WAV audio from SD card into memory and from memory to the DAC</li>
<li className="mb-2">Graphical Display: DMA and dirty line tracking for efficient rendering; lookup table to display characters</li>
<li className="mb-2">Clowns: Up position held by permanent magnet; falling is detected by a limit switch, which triggers a servo to push the clown back up before retracting safely</li>
<li className="mb-2">Physical structure: Wood paneling and netting to support heavy linear slides, custom 3D-printed clown chassis, and wooden front box with mounts for screen & button</li>
<li className="mb-2">Electrical: Four proto-boards and intensive wire management to run wires safely behind clowns and 6 feet down the game structure</li>
<li className="mb-2">Software: state and timer management to track game status, countdowns, and clown servo delays</li>
</ul>
<div className="my-8"><ImageGrid photos={photos2} layout="columns" columns={2} spacing={16} /></div>
<p className="mb-6"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>Muskaan, Charlie, Riley, and Jack: if you’re reading this, I had a wonderful time working with you and I wish you all the best!</span></p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}