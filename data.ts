
import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Brand Identity: Zenith',
    category: 'Graphic Design',
    description: 'A complete visual overhaul for a modern tech startup focusing on minimalist aesthetics and bold typography.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    tags: ['Branding', 'UI/UX', 'Vector'],
    date: 'Jan 2024'
  },
  {
    id: '2',
    title: 'Obby Master Universe',
    category: 'ROBLOX',
    description: 'A high-engagement obstacle course with custom physics and procedural level generation. Over 1M+ visits.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    tags: ['Lua', 'Game Design', 'Scripting'],
    date: 'Feb 2024'
  },
  {
    id: '3',
    title: 'Concert Hall Atmosphere',
    category: 'Lighting',
    description: 'Dynamic DMX lighting setup for a 5,000 capacity venue, synchronized with live music performance.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    tags: ['DMX', 'GrandMA3', 'Stage Design'],
    date: 'March 2024'
  },
  {
    id: '4',
    title: 'Editorial Layout: Future Tense',
    category: 'Graphic Design',
    description: 'Magazine layout for a speculative fiction publication, exploring experimental grid systems.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    tags: ['InDesign', 'Layout', 'Typography'],
    date: 'Dec 2023'
  },
  {
    id: '5',
    title: 'Cyber-City Showcase',
    category: 'ROBLOX',
    description: 'An atmospheric cyberpunk environment showcasing advanced lighting and PBR materials within the Roblox engine.',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    tags: ['Environmental Design', 'Atmosphere'],
    date: 'Nov 2023'
  },
  {
    id: '6',
    title: 'Architectural Lighting: Aura',
    category: 'Lighting',
    description: 'Smart lighting system for a corporate headquarters, adapting to circadian rhythms.',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    tags: ['IoT', 'Smart Home', 'Architecture'],
    date: 'Oct 2023'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO, Zenith Tech',
    content: 'The branding work exceeded all expectations. Our identity feels much more aligned with our vision now.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Studio Lead, BlockWorks',
    content: 'Unparalleled skill in ROBLOX scripting and environmental design. A true professional in the space.',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    role: 'Production Manager, EventLite',
    content: 'Transformed our stage presence with incredible lighting choreography. The audience was mesmerized.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  }
];
