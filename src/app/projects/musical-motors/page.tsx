'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/better_portfolio/images/musical_motors/exhibition.jpg",
    "width": 800,
    "height": 600,
    "alt": "The exibition where the project was installed"
  },
  {
    "src": "/better_portfolio/images/musical_motors/installed2.jpg",
    "width": 800,
    "height": 600,
    "alt": "One Installed Node"
  }
];
const photos2 = [
  {
    "src": "/better_portfolio/images/musical_motors/all_modules.jpg",
    "width": 800,
    "height": 600,
    "alt": "All of the nodes made for the project"
  }
];

export default function ProjectPage() {
  return (
    <div className="pt-32 pb-16 min-h-screen">
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h1 className="text-4xl font-bold mb-2">Musical Motors</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>A full stack attempt at coordinating performance robots </p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="my-8"><iframe width="560" height="315" src="https://www.youtube.com/embed/HH7m-cDbLSk?si=VpxpXVYoxl4DMy3x" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
<p className="mb-6">I am fascinated by attention as a kind of currency. Attention is how we show care for people and ideas. It is scarce, yet easy to disproportionately direct to things that do not need it. I love focusing on the intricacies of modern infrastructure. I can get lost in an electrical system, ponder a building’s structure, or reconstruct an object’s manufacturing process. Most people cannot relate, creating a gap in how we understand the world. Closing that gap by bringing others’ attention to the intricacies of human technological creation is what I live for. The intent of the musical motors installation is to play with how technology can pull our attention toward technical parts of our space that we usually ignore.</p>
<p className="mb-6">In a past project, I strapped a dynamic, colorful sculpture to pieces of electrical infrastructure. It shifted viewers’ gaze to the sculpture and the hardware it adorned, but it did not draw them into the dynamics of the infrastructure. Here, I experiment with how exposing the ceiling’s auditory dynamics might help viewers notice more than its appearance. The installation gamifies the infrastructure, making it more inviting by using its intrinsic properties to create distracting, semi-rhythmic sounds.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={2} spacing={16} /></div>
<p className="mb-6">The technical build was a fun challenge. At its largest, the system can control eight strikers across four ceiling nodes. Each striker raises a striking arm to a limit switch and then releases it onto its mounted surface upon command. The strikers connect to a motor-controller PCB I designed for this project. It carries two motor drivers, power circuitry, header pins for an ESP32 dev board, and JST connectors for the external devices. The ESP32 drives each motor until the striking arm hits its limit switch, holding it ready and releasing it when it receives an OSC command.</p>
<div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">I used TouchDesigner as the OSC controller, binding release commands for all eight motors to keyboard keys. To speed up sonic experimentation, the project can record eight tracks of timed triggers from a simple interface, so I can layer triggers and loop them during the installation. To further connect viewers to the piece, I wanted it to react when someone looked directly at it by turning off. I chose to manually trigger this function using Touchdesigner image processing nodes that detect when my finger is on the camera. While in the installation, I held my finger on the camera to run the system; if I saw someone lingering on the piece, I could lift my finger to pause it, often to surprised reactions.</p></div>
<div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos2} layout="columns" columns={1} spacing={16} /></div></div>
            </div>
<p className="mb-6"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>The full software stack is </span><a href="https://github.com/dtrey-umich/musical_motors" target="_blank" rel="noopener noreferrer"><span className="transition-opacity duration-200 hover:opacity-60" style={{color: "#5B9BD5", fontFamily: "Trey Handwrite, cursive"}}>available on github</span></a></p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}