
export type Category = 'Graphic Design' | 'ROBLOX' | 'Lighting' | 'All';

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  imageUrl: string;
  tags: string[];
  date: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
  dribbble: string;
  behance: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
