'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/droodles/comic/Panel_1.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_2.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_3.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_4.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_5.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_6.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_7.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_8.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_9.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
  },
  {
    "src": "/images/droodles/comic/Panel_10.jpg",
    "width": 1800,
    "height": 1200,
    "alt": ""
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
        <h1 className="text-4xl font-bold mb-2">Droodles Creative Assistant</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>Contributors: Erfun Ackley, Patricia Alves-Oliveira, Peter H. Kahn Jr.</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2026</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>TLDR</span></h3>
<p className="mb-6">Current LLMs like ChatGPT are bad at co-creative problems. Have you ever tried to come up with an idea using ChatGPT? Instead of thinking with you and helping you tease out possible new concepts, it jumps directly to the conclusion and gives you a wealth of bad ideas. This is what my team wanted to fix. </p>
<p className="mb-6">To make LLMs better at co-creative interactions, we unpack foundational creative psychology research to create a set of requirements and creativity eliciting strategies that a co-creative LLM should have. Then, we implement a multi-agent framework that automatically analyzes the context of the conversation, decides which co-creative strategy to apply, and responds to the user.</p>
<p className="mb-6">We tested the novel system design in a user study with 62 participants, comparing it against a typical LLM and a human. Our results indicate that our agent was able to apply a divergent set of creative strategies, lengthen the time the user spent thinking about the problem, and be more of a creative guide than a source of bad ideas. Despite this, we found the typical LLM and our system to be not statistically significantly different. To understand why, I recommend that you read the discussion section of my paper, attached below.</p>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>My role</span></h3>
<p className="mb-6">This was a big project that I have been working on for almost 2 years. Here’s a sample of the things I did in that time:</p>
<ul className="list-disc list-outside ml-12 mt-0 mb-6 space-y-2">
<li className="mb-2">Completed the Creative psychology literature review, identifying core strategies that could be applied to our agent</li>
<li className="mb-2">Drafted a novel system of co-creative LLM prompts (and all the other prompts)</li>
<li className="mb-2">Designed the backend multi-agent system</li>
<li className="mb-2">Devised the experimental design and passed it through IRB review</li>
<li className="mb-2">Ran the experiment with about half of the participants</li>
<li className="mb-2">Trained the human creative mentors</li>
<li className="mb-2">Devised the Qualitative analysis codebook instrumental in our most important findings</li>
<li className="mb-2">Completed a comprehensive literature review to place the study within the academic context</li>
<li className="mb-2">Drafted almost all of the paper (not including some of the data analysis sections)</li>
</ul>
<p className="mb-6">The rest of the work was done by my project partner, Erfun Ackely, and much of the direction of the project was contributed by Dr. Patricia Alves-Oliveira. Peter H. Khan was a kind of external advisor.</p>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>The publication</span></h3>
<p className="mb-6">I will not go into further detail of the functionality of our system or our experimental results because that’s why we wrote a paper about it. As of February 2026, the publication has been submitted to <a href="https://cc.acm.org/2026/" target="_blank" rel="noopener noreferrer"><span className="transition-opacity duration-200 hover:opacity-60" style={{color: "#5B9BD5"}}>Creativity and Cognition</span></a> and my team is awaiting a response. I have the most recent draft hosted here for you to read</p>
<div className="my-8"><iframe src="https://drive.google.com/file/d/1KUql0s8OtSc2QBJvebrdJW3Z8eIeG0nd/preview" width="640" height="480"></iframe></div>
<h3 className="text-2xl font-semibold mt-6 mb-3"><span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>A fun little comic I made that explains our system</span></h3>
<p className="mb-6">If you’re curious about the technical design of our LLM-based agent, there is fairly comprehensive documentation on our <a href="https://github.com/studiorobot/droodles_creative_mentor" target="_blank" rel="noopener noreferrer"><span className="transition-opacity duration-200 hover:opacity-60" style={{color: "#5B9BD5"}}>github page</span></a>. Or, you can read this short comic I made for fun.</p>
<div className="my-8"><ImageGrid photos={photos1} layout="carousel" columns={2} spacing={16} /></div>
        </div>
      </motion.div>
    </div>
  );
}