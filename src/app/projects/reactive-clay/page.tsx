'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/reactive_clay/test.jpg",
    "width": 4000,
    "height": 3000,
    "alt": "A ceramic bowl with prototype lights"
  },
  {
    "src": "/reactive_clay/wet.jpg",
    "width": 4000,
    "height": 3000,
    "alt": "Fresh clay, thrown off the hump"
  },
  {
    "src": "/reactive_clay/trimmed.jpg",
    "width": 4000,
    "height": 3000,
    "alt": "Trimmed to the right shape"
  },
  {
    "src": "/reactive_clay/glazed.jpg",
    "width": 4000,
    "height": 3000,
    "alt": "A selection of glazed final pieces"
  }
];
const photos2 = [
  {
    "src": "/images/reactive_clay/system_diagram.png",
    "width": 1660,
    "height": 693,
    "alt": "Electrical system diagram"
  }
];
const photos3 = [
  {
    "src": "/images/reactive_clay/pcb_front.png",
    "width": 1302,
    "height": 1170,
    "alt": "PCB Front"
  },
  {
    "src": "/images/reactive_clay/pcb_back.png",
    "width": 1302,
    "height": 1170,
    "alt": "PCB Back"
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
        <h1 className="text-4xl font-bold mb-2">Reactive Clay</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">To exist between robotics and art is to be in constant tension between two communities that may never fully accept your work. </p>
<p className="mb-6">In the artist community, the discomfort created by my robotics background is warranted. My industry rarely makes space for the value brought by traditional craft. In reactive clay, I imagine a different reality in which robotics works to support traditional craft. This work incorporates the most complicated electronics system I have ever independently designed. But, it is being used to bring the organic properties of ceramic into the foreground with a playful twist of sounds and lights, bringing the viewer into closer contact with traditional ceramics than they may be used to.</p>
<p className="mb-6">In the robotics community, the free thinking of artists is undervalued. But, in a space on the bleeding edge of how technology interfaces with society, we need people who can think beyond the first designs that pop into their head. Working as an artist allows me to free myself from the obligations of creating a robot for immediate release. Within this work, I can truly examine what kind of a robot I want to interact with every day. It will never be the next greatest consumer robot. But, when it comes time to challenge the norm in robotics, I will have been thankful of my artist roots to giving me space to practice free thinking.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="carousel" columns={2} spacing={16} /></div>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>System design (Nerd stuff)</span></h3>
<div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">The electrical system is comprised of 12 bus-connected nodes, each in control of a rotary encoder with a push button, solenoid, and 6 addressable RGB LEDs. Because of inherent space constraints created by the ceramic bodies and the need for 12 identical nodes, creating a PCB was the best choice. </p>
<p className="mb-6">The independent nodes communicate using an RS-485 bus arbitrated by an ESP32-based controller. At the start of the project, I considered simply adding a return data line to the SPI communication used by many addressable RGB LEDs. But, as I refined the viewer interaction to focus on turning the ceramics, the design required a communication paradigm that could expand to control many components. A cheap microcontroller on each node for local control and global communication over RS-485 was the next best choice. </p></div>
<div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos2} layout="rows" columns={2} spacing={16} /></div></div>
            </div>
<p className="mb-6">I selected the Attiny816 as the microcontroller for each node because its capability matches the scale of each node. Although, my search was limited to the tinyAVR series because of my comfort with them through Arduino development boards. Within this lineup, the 816 is cheap, has plenty of flash space for control software, has robust libraries to simplify set-up, and can control the 5v LEDs without a logic level converter. It also has a USART module fast enough to push data to and from a controller for a human interface.</p>
<p className="mb-6">I ran a few tests on some Attiny416 (same controller but less flash) development boards before moving ahead with a PCB design. The final designs have a few choices I want to highlight. First, I made sure that all surface mount components are on the same side, simplifying the assembly process since I am doing it myself. Second, placed the wire ports on the top of the board with the encoder so the wires don’t distort the light from the LEDs. Because of this, I added a cutout for the wires on the side of the board so that they could be threaded through and mounted on a center post attaching the PCB to the wall, safely out of the way. Finally, I discovered in prototyping that placing the LEDs close to the edge of the ceramic body causes the light to reflect off the side of the bowl, distorting it. Placing them far inside the perimeter reduces this effect significantly.</p>
<div className="my-8"><ImageGrid photos={photos3} layout="columns" columns={2} spacing={16} /></div>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>What’s next?</span></h3>
<p className="mb-6">If none of the above made sense to you, that’s ok! I’m still developing this project. As of now, the PCBs have been ordered and I’m waiting for them to ship. Here’s what I need to accomplish next:</p>
<ol className="list-decimal list-outside ml-12 mt-0 mb-6 space-y-2">
<li className="mb-2">Finalizing a mechanical design to mount the ceramics and the electronics</li>
<li className="mb-2">Assembling the boards during my internship at MIT</li>
<li className="mb-2">Creating a TouchDesigner project for prototyping interactions with the installation</li>
<li className="mb-2">Creating the final communication software stack for the controller and the nodes (only half done right now)</li>
<li className="mb-2">Converting TouchDesigner prototype interactions into final control software that does not require my laptop to run</li>
<li className="mb-2">Installing and testing the project for the first time</li>
<li className="mb-2">Finding a show interested in exhibiting the work before I leave the University of Michigan</li>
<li className="mb-2">Installing this project in my home (I originally built this because I wanted it)</li>
</ol>
<p className="mb-6">I’ve been working on this for about a year now, taking significant breaks for my classes. With renewed energy, I’m hoping to have it done before the end of the fall semester! </p>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}