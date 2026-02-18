'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/ringevator/proteus.jpg",
    "width": 947,
    "height": 560,
    "alt": "The entire robot design rendered in CAD"
  }
];
const photos2 = [
  {
    "src": "/images/ringevator/proteus_real.jpg",
    "width": 1000,
    "height": 667,
    "alt": "The final version of the robot with its launcher prominently displayed"
  }
];
const photos3 = [
  {
    "src": "/images/ringevator/ringevator.jpg",
    "width": 1000,
    "height": 667,
    "alt": "How the ringevator picks up rings and deposits them on top of the robot"
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
        <h1 className="text-4xl font-bold mb-2">Ringevator</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">Proteus was a robot built for the 2020-2021 FTC season where robots were tasked with picking up rings from a field and launching them into immobile goals on one end of the field. Proteus was specifically designed to accomplish this task using its turntable-mounted ring launcher that allowed it to automatically target goals and launch rings with high accuracy. However, there was a problem with this design. The ring launcher takes up almost all of the allowed space so a subsystem that picks up and transfers rings into the launcher needed to be designed in such a way that it could fit the remaining slim space on the chassis of the robot. The subsystem with the big red belt on the front of the robot called the "Ringevator" was my solution to this design challenge.</p></div>
<div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={1} spacing={16} /></div></div>
            </div>
<div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos2} layout="columns" columns={1} spacing={16} /></div></div>
<div className="flex-1 w-full"><p className="mb-6">I designed this subsystem in my first year as the design team lead for my team. I was completely responsible for the design, manufacturing, and assembly of this subsystem in addition to managing the design of the rest of the robot and its 67 custom components. The robot made it to the Texas state-level competition because of its standout design and documentation and would have made it to the world competition if not for the pandemic.</p></div>
            </div>
<p className="mb-6">The Ringevator features a custom flexible 3D printed belt that is able to rotate rings from a flat position, pull them to the top of the robot, and deposit them in the loading tray of the ring launcher. It accomplishes this using its 4 degrees of freedom that allow it to deploy outward, walk over a ring before pulling it in, and tilt back to reliably transfer it into the launcher. This is shown in the diagram and video of a full transfer below.</p>
<div className="my-8"><ImageGrid photos={photos3} layout="columns" columns={1} spacing={16} /></div>
        </div>
      </motion.div>
    </div>
  );
}