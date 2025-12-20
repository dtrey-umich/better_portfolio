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
        <h1 className="text-4xl font-bold mb-2">Ringevator</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Additional Contributors: See Iron Reign About page

Proteus was a robot built for the 2020-2021 FTC season where robots were tasked with picking up rings from a field and launching them into immobile goals on one end of the field. Proteus was specifically designed to accomplish this task using its turntable-mounted ring launcher that allowed it to automatically target the goals and launch rings at them with high accuracy. However, there was a problem with this design. The ring launcher takes up a lot of the allowed space so a subsystem that picks up and transfers rings into the launcher needed to be designed in such a way that it could fit the remaining slim space on the chassis of the robot. The subsystem with the big red belt on the front of the robot called the "Ringevator" was my solution to this design challenge.

I designed this subsystem in my first year as the design team lead for my team. I was completely responsible for the design, manufacturing, and assembly of this subsystem but because of my role as the design lead, I also oversaw the mechanical design, manufacturing, assembly, and maintenance of the the entire robot and its 67 custom components. The robot made it to the Texas state-level competition because of its standout design and documentation. Like the robot above, this robot would have advanced to the world competition if it weren’t canceled due to the ongoing pandemic.

The ringevator features a custom flexible 3D printed belt that is able to rotate rings from a flat position, pull them to the top of the robot, and deposit them in the loading tray of the ring launcher. It accomplishes this using its 4 degrees of freedom that allow it to deploy outward, walk over a ring before pulling it in, and tilt back to reliably transfer it into the launcher.</p>
<p className="mb-6">This is shown in the diagram and video of a full transfer below.</p>
        </div>
      </motion.div>
    </div>
  );
}