
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Testimonial, SocialLinks } from '../types';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data';

interface PortfolioContextType {
  projects: Project[];
  testimonials: Testimonial[];
  isAuthenticated: boolean;
  isAvailable: boolean;
  location: string;
  socialLinks: SocialLinks;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateAvailability: (status: boolean) => void;
  updateSettings: (location: string, socialLinks: SocialLinks) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const DEFAULT_SOCIALS: SocialLinks = {
  twitter: '#',
  github: '#',
  linkedin: '#',
  dribbble: '#',
  behance: '#'
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [location, setLocation] = useState('Hertfordshire, UK');
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(DEFAULT_SOCIALS);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedTestimonials = localStorage.getItem('portfolio_testimonials');
    const savedAuth = localStorage.getItem('portfolio_auth');
    const savedAvailability = localStorage.getItem('portfolio_availability');
    const savedLocation = localStorage.getItem('portfolio_location');
    const savedSocials = localStorage.getItem('portfolio_socials');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
    }

    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
    }
    
    if (savedAvailability !== null) {
      setIsAvailable(savedAvailability === 'true');
    }

    if (savedLocation) {
      setLocation(savedLocation);
    }

    if (savedSocials) {
      setSocialLinks(JSON.parse(savedSocials));
    }
    
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(newTestimonials));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject = { ...projectData, id: Date.now().toString() };
    saveProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonialData, id: Date.now().toString() };
    saveTestimonials([newTestimonial, ...testimonials]);
  };

  const deleteTestimonial = (id: string) => {
    saveTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateAvailability = (status: boolean) => {
    setIsAvailable(status);
    localStorage.setItem('portfolio_availability', String(status));
  };

  const updateSettings = (newLocation: string, newSocialLinks: SocialLinks) => {
    setLocation(newLocation);
    setSocialLinks(newSocialLinks);
    localStorage.setItem('portfolio_location', newLocation);
    localStorage.setItem('portfolio_socials', JSON.stringify(newSocialLinks));
  };

  const login = (password: string) => {
    if (password === 'finlay550adminportfolio') {
      setIsAuthenticated(true);
      localStorage.setItem('portfolio_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_auth');
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      testimonials, 
      isAuthenticated, 
      isAvailable,
      location,
      socialLinks,
      addProject, 
      deleteProject, 
      addTestimonial,
      deleteTestimonial,
      updateAvailability,
      updateSettings,
      login, 
      logout 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider');
  return context;
};
