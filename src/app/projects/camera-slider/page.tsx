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
        <h1 className="text-4xl font-bold mb-2">Camera slider</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Additional Contributors: None

This project is intended to be an open-source and budget-friendly way to take motion control photography and videography using easily accessible electronics and hardware components. The design features a variable-length rail and lightweight carriage that can laterally move and rotate cameras of varying sizes and adapt to different shoot settings. Throughout development, two prototype assemblies were created in Fusion 360, prioritizing ease of manufacture and modularity. Inexpensive and easy-to-use electronics have also been sourced to make a modular control system that any hobbyist could make. In addition to this, custom control software has been used to program the movement of the camera in 2 degrees of freedom and trigger the shutter of the camera automatically.

The first prototype in the pictures above was a strong initial attempt but the carriage construction was far too weak and unstable because the outside structure had to reach around the rails. In addition, the decision to mount the motor on the carriage dramatically limited its mobility, as the weight of the carriage dramatically slowed it down. This led to a second, more developed design that also incorporated an additional degree of freedom.

A carriage without motors for lighter, faster movement

A custom differential belt arrangement to give the carriage the ability to rotate the camera

Accessible electronics (3D printer stepper motor drivers and an esp32)

A more enclosed design that prevents collisions with other objects

An internal carriage with more strength

Circuitry that can trigger the mounted camera’s shutter</p>
        </div>
      </motion.div>
    </div>
  );
}