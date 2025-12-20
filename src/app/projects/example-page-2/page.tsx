'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/better_portfolio/images/test_image_3.jpg",
    "width": 800,
    "height": 600,
    "alt": "Test Image 1"
  },
  {
    "src": "/better_portfolio/images/test_image_2.jpg",
    "width": 400,
    "height": 600,
    "alt": "Test Image 2"
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
        <h1 className="text-4xl font-bold mb-2">Example Page 2</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">Good morning, it’s quarter to 8 and I am mostly awake. This morning, I went for a little walk around Paris by myself because I went to sleep at 6pm and was awake at 6am before everyone else. Actually, I was awake at 5:30 and I did my best to at least stay down until 6am. But, when the hour came, I did not hesitate to rise, get dressed, brush my teeth, and get out the door. The hotel room Austin and I are in is small. There’s barely enough room for the two of us and our bags so figuring out how to find my clothes in the dark while also not tripping over the me-sized snowboard bag in the room was certainly a trick. Thankfully, Austin is a heavy sleeper. I was able to get out of the door without a hitch.</p></div>
<div className="flex-1 w-full"><p className="mb-6">Good morning, it’s quarter to 8 and I am mostly awake. This morning, I went for a little walk around Paris by myself because I went to sleep at 6pm and was awake at 6am before everyone else. Actually, I was awake at 5:30 and I did my best to at least stay down until 6am. But, when the hour came, I did not hesitate to rise, get dressed, brush my teeth, and get out the door. The hotel room Austin and I are in is small. There’s barely enough room for the two of us and our bags so figuring out how to find my clothes in the dark while also not tripping over the me-sized snowboard bag in the room was certainly a trick. Thankfully, Austin is a heavy sleeper. I was able to get out of the door without a hitch.</p></div>
            </div>
<div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">Good morning, it’s quarter to 8 and I am mostly awake. This morning, I went for a little walk around Paris by myself because I went to sleep at 6pm and was awake at 6am before everyone else. Actually, I was awake at 5:30 and I did my best to at least stay down until 6am. But, when the hour came, I did not hesitate to rise, get dressed, brush my teeth, and get out the door. The hotel room Austin and I are in is small. There’s barely enough room for the two of us and our bags so figuring out how to find my clothes in the dark while also not tripping over the me-sized snowboard bag in the room was certainly a trick. Thankfully, Austin is a heavy sleeper. I was able to get out of the door without a hitch.</p></div>
<div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={2} spacing={16} /></div></div>
            </div>
<div className="my-8"><blockquote className="tiktok-embed" cite="https://www.tiktok.com/@yellowbolt__/video/7042546078645751046" data-video-id="7042546078645751046" style={{maxWidth:'605px',minWidth:'325px'}} > <section> <a target="_blank" title="@yellowbolt__" href="https://www.tiktok.com/@yellowbolt__?refer=embed">@yellowbolt__</a> <p>Macro photography of black pen ink dissociation on glass with alcohol</p> <a target="_blank" title="♬ The Bottom of It - Fruit Bats" href="https://www.tiktok.com/music/The-Bottom-of-It-6767569037774817281?refer=embed">♬ The Bottom of It - Fruit Bats</a> </section> </blockquote> <Script src="https://www.tiktok.com/embed.js" /></div>
<p className="mb-6">text after</p>
<div className="my-8"><iframe width="560" height="315" src="https://www.youtube.com/embed/fOTPELLoUXI?si=OBn9fu4za8lLQtGh" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe></div>
        </div>
      </motion.div>
    </div>
  );
}