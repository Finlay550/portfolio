
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Testimonial } from '../types';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data';

interface PortfolioContextType {
  projects: Project[];
  testimonials: Testimonial[];
  isAuthenticated: boolean;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedAuth = localStorage.getItem('portfolio_auth');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
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

  const login = (password: string) => {
    // Simple mock auth - in a real app this would be a backend call
    if (password === 'admin') {
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
      addProject, 
      deleteProject, 
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
