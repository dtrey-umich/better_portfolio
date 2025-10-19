'use client';

import { motion } from 'framer-motion';
import ImageGrid from '@/components/ImageGrid';
import Script from 'next/script';
const photos = [
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
  },
  {
    "src": "/better_portfolio/images/test_image_1.jpg",
    "width": 800,
    "height": 600,
    "alt": "Test Image 3"
  },
  {
    "src": "/better_portfolio/images/test_image_4.jpg",
    "width": 800,
    "height": 600,
    "alt": "Test Image 4"
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
        <h1 className="text-4xl font-bold mb-2">Example Page 1</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>Additional Contributors: Erfun Ackley</p>
          <p className="text-xl" style={{ fontFamily: 'Trey Handwrite, cursive', color: '#EC6F6B' }}>2023</p>
        </div>
        <div className="prose prose-lg max-w-none">
          <p>Good morning, it’s quarter to 8 and I am mostly awake. This morning, I went for a little walk around Paris by myself because I went to sleep at 6pm and was awake at 6am before everyone else. Actually, I was awake at 5:30 and I did my best to at least stay down until 6am. But, when the hour came, I did not hesitate to rise, get dressed, brush my teeth, and get out the door. The hotel room Austin and I are in is small. There’s barely enough room for the two of us and our bags so figuring out how to find my clothes in the dark while also not tripping over the me-sized snowboard bag in the room was certainly a trick. Thankfully, Austin is a heavy sleeper. I was able to get out of the door without a hitch.</p>
<ImageGrid photos={photos} layout="columns" columns={3} spacing={16} />
<p>At 5:30 am in Paris, nothing is open because why would anything be. At 6 am, the first cafes in the city begin to open their doors, at least according to google maps. I made my way down the stairs of the hotel and out onto the city street. The nearest open cafe is a 6 minute walk away, in the direction opposite to the arc. It’s dark out, the sun has not come up yet but the city lights give an everlasting glow to the quiet streets. I begin to walk in the direction of the cafe. I would be afraid of this new city but at this hour, the only people who are awake in Paris are either working or on their way to work. My presence barely registers for most people and I am able to slip from street to street without stirring up any trouble. The cafe was in what seemed to be a small market close to the main walkways of Paris.</p>
<p>In the market, I noted that while there were several people waiting for stores and produce stands to open, most of the people on the street worked for those stands. The bustle of the street was almost entirely composed of workers laying out fresh fruit and vegetables for the day’s tourists to buy. Trucks came in and out of the closed of street to load the stores with their much needed produce and consumable goods. The cafe stood at the corner of this quiet bustle. The people inside were clearly just beginning to open, sweeping the floors, and setting tables out. Inside, there the customers included a handful of the workers from the street market. And, it was in the moment, contemplating walking in and ordering something that I felt a shred of fear. While I was able to slip unnoticed along the streets, walking into a cafe at this hour was asking to be noticed. I continued down the street instead.</p>
<p>At this point, I have lied to you. None of the above paragraph was going through my head at the time. What was going through my head was more like some rough combination of surface level observations. I enjoyed the lights of the street and the energy of the people. But, if I had constructed the story I just told you in my own head, I would have been able to overcome my anxiety. It took walking past the cafe and around to corner to form the beginnings of this story and have the leverage to overcome the anxiety. I turned around and walked back to the cafe.</p>
<p>Walking into the cafe, it was clear they were not ready for someone who only speaks English at this hour. The person sweeping by the door directed me to the woman behind the counter and she spoke less English than one would expect for a cafe in a part of town where many tourists come. She took my order — a cappuccino, chocolate croissant, and orange for here. Then, she took the order of the other man who just walked through the door in French, indistinguishable to me. He was holding an empty fruit box. She filled it with 5 espresso shots and he walked off. Then, she made my order, pulling the croissant out of a warm box in the back. I asked to pay and she pushed a few buttons on her calculator to some to 9 euro. On the wall, there was a sign that said the minimum for card purchases was 10 euro but she didn’t seem to mind. I took my things out front.</p>
<p>I began to piece together the story I just told you as I watched the workers lay out their fruit, watching from the patio of the cafe. I’m a total coffee snob so the coffee left something to be desired but the croissant was perhaps the best I had ever tasted. The warm, flakey pastry was clearly a centerpiece of the cafe’s menu. The blend of flavors was perfect, sweet with a warm umami flavor. Of course, everything tastes better in a new place, with the dangling Christmas lights lighting up the dark streets. </p>
        </div>
      </motion.div>
    </div>
  );
}