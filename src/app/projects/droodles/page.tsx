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
        <h1 className="text-4xl font-bold mb-2">Droodles</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}></p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2025</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">Additional Contributors: Erfun Ackley, Patricia Alves-Oliveira, Peter H. Kahn Jr.

After the introduction of LLMs into commonplace workflows, understanding the role that these tools should hold in creative tasks has been a struggle. On a high level, our work assumes that humans will always remain in the loop when these tools are used and seeks to find ways to improve collaboration between humans and LLMs in creative tasks in order to improve the outcome of these human-LLM partnerships. Using widely accepted creative psychology research, we have been writing specially curated prompts for creative collaboration and leveraging the flexibility of multi-agent systems to explore how LLMs can elicit creativity from humans.

Due to the complexity and novelty of this project, I’ve chosen to depict it in comic form. I hope this makes things clearer.

The struggle with LLMs we seek to address through our project is that they seem unable to make creative ideas within a broad context while simultaneously speaking as if they can. This idea that LLMs are inherently uncreative is supported by other research released shortly after the proliferation of chatGPT. And, my personal theory is that this problem could be because LLMs are probabilistic models that need a precedent of ideas to create new derivative ideas that would be by definition non-creative. Regardless of the reason for the creative shortcomings of LLMs, my team seeks to use LLMs as a tool to leverage the psychology of the human user instead, creating a collaborative environment where the natural creativity of the human is strengthened. The difficulty of this approach is that creative collaboration is highly reactive and non-linear which contrasts the more rigid speaking patterns of an LLM. We use the multi-agent system as a</p>
<p className="mb-6">technique make LLM responses more reactive.

The main features of our system are:

A multi-agent design for dynamic decision-making

Curated prompts that guide the creative process

A rigorous archival system for reconstructing conversations with users

A custom interface designed for conversation about droodles

In order to enhance the creative output of the users interfacing with our system, I conducted a study of psychological research about creativity, focusing on creativity enhancement from the 1980s to the present. My study highlighted a few strategies that most authors said to lead to enhanced creative output. These recurring ideas formed the basis of the process outlined in our main prompt. The prompt is composed of several modules, each containing a specific strategy to move the creative process forward. While they can be used in order, they are best used in reaction to the user’s messages in a highly chaotic order. The modules are as follows:

Play: Engaging in free conversation as a source of new ideas and identification of interests.

Targeted observation: Noticing and identifying interesting aspects of the droodle.

Stimulation: Providing input to inspire new ideas about what the droodle could be.

Reforming: Reshaping current ideas into a cohesive narrative.

Grounding: Linking the narrative to visual elements of the droodle before captioning.

Captioning: Creating a formal droodle caption using the developed ideas and narrative.

Refining: Polishing and improving the droodle caption for greater creativity and coherence.

Aiding: Assisting the human when they are stuck by taking control of the step.

The color coding of these modules refers to their place in the double-diamond visualization of creativity where the modules in blue are meant to enhance</p>
<p className="mb-6">divergent thinking, modules in pink are meant to enhance convergent thinking, and the green module can be used at any time. Each module also contains a more enhanced description of the strategy and specific “conversational tools” that the LLM can use to leverage the strategy. By changing what additional text the modules are combined with we can also change how the LLM represents the strategy. In the system below, this is used to make some agents that argue for why their strategy is the best next strategy and others that simply apply the strategy in conversation.

By multi-agent structure, I’m simply referring to a system in which multiple LLM-powered agents autonomously converse about the conversation at hand. By way of conversation, the agents come to an answer that is a better response to the human than a single LLM agent could generate alone. In our system, we use the modularity of our core prompt to create agents that collectively decide which creativity-enhancing strategy to use and how at every point in the conversation. A technical diagram of this system is below:

Our system didn’t start this complex and my hope is that the comic at the top of the page explains how we got to this point. Essentially, we first tried to use LLMs with a single prompt and discovered that the agent was highly inflexible in its approach to creative collaboration. Slowly, we began to break out the different roles that we hoped our single agent would adopt into independent agents and noticed significant performance increases. But, as we continued to make the system more complex, response time suffered and we found this system to be a happy medium between quality of response and response time.

At this point in the project, we’re feeling pretty confident about the functionality of our</p>
<p className="mb-6">system. In our small-scale tests, the multi-agent structure can hold dynamic conversations about droodle captioning, which we think produces more creative captions. But, we still need to test the system more rigorously. To do this, we have designed a user study in which we’re testing our custom system against a standard LLM system and a human disguised as an LLM. We’re looking to find whether our system and LLMs, in general, can increase droodle caption scores. The study is waiting for IRB approval

All the Prompts we use for this project are accessible here although they will remain largely disorganized until we get the project ready to publish as a paper. Additionally, the code base is available through GitHub here.</p>
        </div>
      </motion.div>
    </div>
  );
}