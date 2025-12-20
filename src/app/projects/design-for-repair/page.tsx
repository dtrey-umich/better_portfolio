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
        <h1 className="text-4xl font-bold mb-2">Design for repair</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Additional Contributors: None

The goal of this independent research project was to test academic theories of how to make consumer products more repairable. To do this, the researched techniques were used to redesign selected components of a coffee machine. Then, using repair videos of the coffee machine before and after the modification in a custom survey, consumer perception of the repairability of the product before and after the modification was measured and compared to see if there was a statistically significant difference as a result of the modification. The whole project was summarized in an original 22-page research paper.

The two coffee machines to the left show the changes made due to the researched modular optimization method. The video below shows the two repair guides used in the survey (sped up quite a lot).

This experimental procedure of testing repairability optimization methods is the first of its kind in this field. The survey created for the experiment was a synthesis of existing tests used to measure product repairability and several other basic questions that asked the participants to rate the likelihood that they would attempt a repair on the given product.

The figure on the left displays the most significant information of the study. It shows that the product repair optimization resulted in a clear change in reported repairability scores. Although the study's sample size was small, the statistical analysis of this data showed that the difference in repairability scores was statistically significant, confirming that the optimization methods were at least partially effective. The participants also reported that they would be more likely to repair the optimized product. These findings demonstrate that repair optimization is a worthwhile endeavor</p>
<p className="mb-6">for future product development which is useful to know for designers and environmental advocates who rely on these techniques to make their products easier to maintain.</p>
        </div>
      </motion.div>
    </div>
  );
}