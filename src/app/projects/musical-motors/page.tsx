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
        <h1 className="text-4xl font-bold mb-2">Musical Motors</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>I find the idea of attention as currency to be an increasingly strong fixation for me. Attention is how we show our care for people and concepts in our world. Your ability to pay attention is scarce. And yet, I can easily catch your attention and direct it towards something you care very little about. As a technical person, I love paying attention to the intricacies of modern infrastructure. It’s easy for me to get lost in an electrical system, ponder a budling’s structure, or re-construct an object’s manufacturing process. In my conversations with others, this is something most people cannot relate to, creating a significant gap in understanding of how the modern world works between me and most people I talk to. Closing that gap by bringing the attention of others to the intricacies of human technological creation is the kind of thing I live for. The intent of the musical motors installation is to play with the way technology can draw our attention to technical parts of our space that we don’t take notice of. </p>
<p>In a past project, I played with this idea by strapping a dynamic and colorful sculpture to pieces of electrical infrastructure. This does create an attention shift for the observer, with many people drawing their eyes to the sculpture and the infrastructure it adorns. But, it doesn’t draw them into the dynamics of the infrastructure. With this project, I wanted to experiment with how bringing the auditory dynamics of the ceiling to the attention of the viewer could get them to take note of more than the appearance of the infrastructure.</p>
<p>In a sense, the installation gamifies the infrastructure to make it more appealing by using its intrinsic properties to create distracting and semi-rhythmic sounds. While the original goal of the installation was to use these sounds to make a kind of music, I found the asynchronous chatter of the installation to also be just as interesting in the task of drawing the attention of the viewer upward and into the ceiling.</p>
<p>Of course, I found the technical creation of the system to be a fun challenge as well. At its largest, the system I created is capable of controlling 8 separate strikers connected to 4 different nodes arranged around the ceiling. The strikers are made of a motor and a limit switch that drive a striking arm to a raised position before releasing it onto the surface its mounted on. The strikers are connected to a motor controller PCB that I designed specifically for this project. The PCB houses two motor drivers, some power circuitry, header pins for an ESP32 dev board, and reliable JST connectors for all the external devices. The ESP32 drives the motors until the striking arm comes into contact with the limit switch, holding it at the ready and releases it when it receives an OSC command to do so.</p>
<p>I used Touchdesigner as the OSC controller, enabling me to bind the release command for all 8 motors to keys on my keyboard. And, to make the rapid development of different sounds easier, the project can also record 8 different tracks of timed triggers from a simple interface. This enables me to record layers of triggers and play them back on loop for the duration of the installation.</p>
<p>To make the viewer feel more connected to the piece, I wanted it to react to how they were looking at it by turning off when they look at it directly. In a perfect world, media pipe would have been the best thing to use for this kind of reaction. But, because of the number of people in the room and my limited development time, I decided to make it manually triggered with my phone’s camera. I used some of the image processing features in Touchdesigner to detect when my finger was covering my phone camera, connected wirelessly to the project. Then, as I was in the installation, I would hold my finger on the phone camera to run the system and if I saw someone taking their time to look at my installation, I could take my finger off to pause it, causing several surprised reactions.</p>
<p>While the installation was temperamental and didn’t sound exactly “musical”, it was a fun experiment in using robotics to modulate people’s attention and a huge technical leap for me. In this project, I designed a PCB for the first time, made a semi-reliable wireless multi-robot system, and used Touchdesigner to coordinate it all. It’s not perfect but I’m proud of it.</p>
<p></p>
        </div>
      </motion.div>
    </div>
  );
}