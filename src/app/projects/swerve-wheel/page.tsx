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
        <h1 className="text-4xl font-bold mb-2">Swerve wheel</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>Additional Contributors: See Iron Reign About page

Reach was a robot built for the 2021-2022 FTC season in which robots were tasked with retrieving small blocks and balls and depositing them across the field over a small barrier. Reach was designed to accomplish this by using its expanding chassis to stretch across the field, retrieve an element with one side, transfer the element to the other side, and deposit the element in its appropriate location. Reach's expanding chassis and one-of-a-kind hybrid differential-swerve design allowed it to do this with surprising efficiency. The robot made it to the Texas state-level competition because of its stunning documentation and design. It would have made it to the world competition but narrowly missed the cutoff because of the competition’s dramatically reduced size at the tail end of the pandemic.

As the design lead of a team mostly composed of seniors completing college applications, I had to pick up most of the work in designing this robot. Thus, I designed most of the subsystems of this robot only with the limited help of my coach. After that, I oversaw all of and personally manufactured most of the 146 custom components of the design. Then, as the most informed person on the construction of each subsystem, I led the assembly, testing, and repair of the entire robot for the rest of the season. In the sections photos and writing below, I showcase the swerve drive subsystem of the robot as it's the most complex part of the design that I created.

Another important element of the design is the custom 3D-printed compliant wheel which allowed the robot to traverse the rough terrain of the field with ease. In addition, the hub-mounted motors inside the wheel which made the design far more compact, reducing collisions with</p>
<p>other subsystems when the wheel rotates.

The challenge of this half of the robot was that it needed to house two coaxial rotation points: the turntable for the carbon fiber arm and the rotation point for the wheel below. This was accomplished using two independent bearings with housings that also doubled as pulleys for each rotation point's drive motor. To ensure that the swerve wheel could turn as many times as needed, a slip ring was also incorporated into the design.</p>
        </div>
      </motion.div>
    </div>
  );
}