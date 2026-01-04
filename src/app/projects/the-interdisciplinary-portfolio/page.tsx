'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos1 = [
  {
    "src": "/images/portfolio/figma_homepage.gif",
    "width": 1920,
    "height": 1080,
    "alt": "Using project cards in a homepage design"
  },
  {
    "src": "/images/portfolio/project_story.gif",
    "width": 1920,
    "height": 1080,
    "alt": "Using project cards to trace out a story"
  }
];
const photos2 = [
  {
    "src": "/images/portfolio/font.jpg",
    "width": 1260,
    "height": 1226,
    "alt": "A custom font to look like my handwriting"
  },
  {
    "src": "/images/portfolio/logo.jpg",
    "width": 820,
    "height": 170,
    "alt": "The cuttent yellow bolt logo, looking more handmade than ever"
  },
  {
    "src": "/images/portfolio/icons_colors_drafting.jpg",
    "width": 1045,
    "height": 759,
    "alt": "Selecting the colors and designs for the topic icons"
  }
];
const photos3 = [
  {
    "src": "/images/portfolio/infra_diagram.jpg",
    "width": 734,
    "height": 820,
    "alt": "How I used GitHub actions to sync notion content with static website pages"
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
        <h1 className="text-4xl font-bold mb-2">The Interdisciplinary Portfolio</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>A custom website that gracefully fits right into my workflow</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="my-8"><ImageGrid photos={photos1} layout="columns" columns={2} spacing={16} /></div>
<p className="mb-6">I’m under no grand illusion that there are thousands of people reading about what I have to say online. But, writing and organizing my thoughts about my work in a visual manner brings purpose and vision to otherwise eclectic pursuits. I started by presenting my work on a Squarespace website which was a fair introduction to web design but also had a myriad of problems from the onset:</p>
<ul className="list-disc list-outside ml-12 mt-0 mb-6 space-y-2">
<li className="mb-2">An absolute pain to write in</li>
<li className="mb-2">Costs $200 per year</li>
<li className="mb-2">Design doesn’t feel like it’s really mine</li>
<li className="mb-2">Forced me to categorize my projects</li>
</ul>
<p className="mb-6">My difficulties with Squarespace presented enough of a creative barrier that I never wanted to update my website. I’ve had my eye on building a website that better suits my needs for most of the three years I have been using Squarespace. But, a lack of time to learn the basics of developing in React or Javascript prevented me from considering this possibility. When “vibe coding” started gaining traction online, I realized that LLM-based programming assistants were powerful enough that I didn’t have to know anything about React or Javascript to make a website that suits all my needs. And, along the way, I could discover how to better integrate LLMs into my workflow to open more possibilities in developing projects that were originally outside of my skillset.</p>
<p className="mb-6">I started the project by framing the visual design of the website, something that was comfortably within my wheelhouse. The most important design principle was to imagine each project as a single piece in a larger narrative. On the surface level of the site design, each project is organized into a “card” with just the most important information. The typical viewer can get a sense of several projects in an instant by looking at several of these cards, while still retaining access to in-depth information about the project by clicking on the card. Keeping each project compartmentalized in this way also enables them to be rearranged in appealing ways depending on the viewer. I used these ideas to mock-up some basic designs in Figma. At the top of this page you can see my original design for a home page with several projects (left) and a more experimental project-based story page (right).</p>
<div className="my-8"><ImageGrid photos={photos2} layout="columns" columns={2} spacing={16} /></div>
<p className="mb-6">In these mock-ups, I developed a more rigorous visual language for the site design. I wanted the site to be a blend of clean and hand-crafted design elements to represent my mix of interests in engineering and art. The hand-crafted design elements are all based on a digitally hand-drawn aesthetic similar to the appearance of my digital design notes. This style appears in the form of <span style={{color: "#EC6F6B", fontFamily: "Trey Handwrite, cursive"}}>a custom font based on my handwriting</span>, my site logo, the topic icons used in the project cards, and several technical diagrams used in the project pages. Coupling this hand-crafted design language with moving project cards gives the site an experimental feeling that mirrors the way I feel about my work right now. </p>
<div className="flex flex-col md:flex-row gap-4 my-8">
              <div className="flex-1 w-full"><p className="mb-6">The other major goal of this project was to create a website writing workflow that I actually want to use. I chose to base the majority of the site content on a Notion database for writing and Google Drive folder for images because I already do my personal and academic writing and organization on these platforms. Then, in JavaScript, I created a program that uses the Notion and Google Cloud APIs to translate dynamic content in my workspaces into static Typescript pages. The scripts for assembling the pages are run on the cloud using GitHub actions and then hosted with GitHub pages.</p>
<p className="mb-6">While none of this is a revolutionary new way of managing website content, it’s also not your average setup. I was able to take my very specific design requirements and organizational needs and carry them into a product all the way to the finish line.</p></div>
<div className="flex-1 w-full"><div className="my-8"><ImageGrid photos={photos3} layout="columns" columns={1} spacing={16} /></div></div>
            </div>
<p className="mb-6"></p>
        </div>
      </motion.div>
    </div>
  );
}