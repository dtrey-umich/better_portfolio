import { Project } from '@/components/ProjectCard';

export const mockProjects: Project[] = [
  {
    id: 'neural-net-visualizer',
    title: 'Neural Network Visualizer',
    description: 'Interactive web application for visualizing deep learning architectures and training processes in real-time.',
    image: '/better_portfolio/images/test_image_1.jpg',
    slug: 'neural-net-visualizer',
    date: 'March 2024',
    categories: ['research', 'software'],
    categoryScores: {
      research: 0.9,
      robotics: 0.0,
      software: 0.8,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.0
    }
  },
  {
    id: 'robotic-arm-controller',
    title: '6-DOF Robotic Arm',
    description: 'Custom-built robotic arm with computer vision for precise object manipulation and assembly tasks.',
    image: '/images/test_image_2.jpg',
    slug: 'robotic-arm-controller',
    date: 'January 2024',
    categories: ['robotics'],
    categoryScores: {
      research: 0.0,
      robotics: 1.0,
      software: 0.0,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.0
    }
  },
  {
    id: 'kinetic-sculpture',
    title: 'Kinetic Light Sculpture',
    description: 'Large-scale interactive sculpture combining motion sensors, LED arrays, and generative algorithms.',
    image: '/images/test_image_3.jpg',
    slug: 'kinetic-sculpture',
    date: 'December 2023',
    categories: ['sculpture', 'software'],
    categoryScores: {
      research: 0.0,
      robotics: 0.0,
      software: 0.6,
      sculpture: 1.0,
      videography: 0.0,
      play: 0.0
    }
  },
  {
    id: 'documentary-series',
    title: 'Tech Innovation Documentary',
    description: 'Multi-part documentary series exploring the intersection of technology and human creativity.',
    image: '/images/test_image_4.jpg',
    slug: 'documentary-series',
    date: 'November 2023',
    categories: ['videography'],
    categoryScores: {
      research: 0.0,
      robotics: 0.0,
      software: 0.0,
      sculpture: 0.0,
      videography: 1.0,
      play: 0.0
    }
  },
  {
    id: 'game-physics-engine',
    title: 'Real-time Physics Engine',
    description: 'Custom physics simulation engine built for interactive games and educational simulations.',
    image: '/images/test_image_5.jpg',
    slug: 'game-physics-engine',
    date: 'October 2023',
    categories: ['software', 'play'],
    categoryScores: {
      research: 0.0,
      robotics: 0.0,
      software: 0.9,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.9
    }
  },
  {
    id: 'ar-prototyping-tool',
    title: 'AR Prototyping Platform',
    description: 'Augmented reality development toolkit for rapid prototyping of spatial computing experiences.',
    image: '/images/test_image_1.jpg',
    slug: 'ar-prototyping-tool',
    date: 'September 2023',
    categories: ['research', 'software', 'play'],
    categoryScores: {
      research: 0.8,
      robotics: 0.0,
      software: 0.8,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.6
    }
  },
  {
    id: 'drone-swarm-ai',
    title: 'Autonomous Drone Swarm',
    description: 'Distributed AI system for coordinating multiple drones in search and rescue operations.',
    image: '/images/test_image_2.jpg',
    slug: 'drone-swarm-ai',
    date: 'August 2023',
    categories: ['robotics', 'research'],
    categoryScores: {
      research: 0.9,
      robotics: 0.9,
      software: 0.0,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.0
    }
  },
  {
    id: 'generative-art-installation',
    title: 'Generative Art Installation',
    description: 'AI-powered art installation that creates unique visual compositions based on audience interaction.',
    image: '/images/test_image_3.jpg',
    slug: 'generative-art-installation',
    date: 'July 2023',
    categories: ['sculpture'],
    categoryScores: {
      research: 0.0,
      robotics: 0.0,
      software: 0.0,
      sculpture: 0.9,
      videography: 0.0,
      play: 0.0
    }
  },
  {
    id: 'vr-music-experience',
    title: 'VR Music Visualization',
    description: 'Immersive virtual reality experience that transforms music into interactive 3D environments.',
    image: '/images/test_image_4.jpg',
    slug: 'vr-music-experience',
    date: 'June 2023',
    categories: ['software', 'play'],
    categoryScores: {
      research: 0.0,
      robotics: 0.0,
      software: 0.8,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.9
    }
  },
  {
    id: 'biomedical-device',
    title: 'Smart Health Monitor',
    description: 'Wearable device for continuous health monitoring with machine learning-based anomaly detection.',
    image: '/images/test_image_5.jpg',
    slug: 'biomedical-device',
    date: 'May 2023',
    categories: ['research'],
    categoryScores: {
      research: 1.0,
      robotics: 0.0,
      software: 0.0,
      sculpture: 0.0,
      videography: 0.0,
      play: 0.0
    }
  }
];
