
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Testimonial } from '../types';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data';

interface PortfolioContextType {
  projects: Project[];
  testimonials: Testimonial[];
  isAuthenticated: boolean;
  isAvailable: boolean;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateAvailability: (status: boolean) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedAuth = localStorage.getItem('portfolio_auth');
    const savedAvailability = localStorage.getItem('portfolio_availability');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
    }
    
    if (savedAvailability !== null) {
      setIsAvailable(savedAvailability === 'true');
    }
    
    setTestimonials(INITIAL_TESTIMONIALS);
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject = { ...projectData, id: Date.now().toString() };
    saveProjects([newProject, ...projects]);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  const updateAvailability = (status: boolean) => {
    setIsAvailable(status);
    localStorage.setItem('portfolio_availability', String(status));
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
      addProject, 
      deleteProject, 
      updateAvailability,
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
