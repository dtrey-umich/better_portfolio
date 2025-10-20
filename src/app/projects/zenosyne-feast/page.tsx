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
        <h1 className="text-4xl font-bold mb-2">Zenosyne feast</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>At this point in the project, I’m starting to fall into that modern nihilistic trope that humans are destroying themselves by harvesting far too much than nature can afford to give. To be fair, I agree with this trope and think that it’s something worth exploring through creative expression. Still, I want to be careful that my work doesn’t look too derivative. This work is, in fact, about the aforementioned fear that humans are taking more from nature than nature can afford to give; however, I want to bring some of the unique qualities of my style to this narrative to produce something interesting. Particularly, I want to use the abilities of this artistic technique to introduce strange temporary materials and bring the disgust I feel toward non-eco-conscious companies to the foreground of this work.

As I mentioned in the description at the top of the page, this technique of making a sculpture that needs to only survive long enough for me to take photos has afforded me some interesting abilities. In this case, it allows me to use materials like gelatin and ketchup which would never last in a gallery, in Shepherd of Chaos and Prosperity, it let me tell a story with fire, and in Wasting Water, it allowed me to stop time within my composition. These opportunities gave me some interesting conceptual ideas to explore with innovative storytelling and have made some of the photographs within this body of work stand out amongst other sculptural works.

Obviously, one major part of making this artwork feel disgusting is using abnormal materials that look revolting. In my mind, gelatin is the perfect material for this because it has the ability to look like food while also looking unnatural and gross. This is accentuated by the red yarn and juice. However, the red yarn and juice</p>
<p>also bear some resemblance to human remains and blood, and that’s completely intentional. In addition to the composition looking disgusting, I wanted to convey that feasting on earth hurts other humans, and the red yarn and blood-like liquid establish that connection well.</p>
        </div>
      </motion.div>
    </div>
  );
}