
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Testimonial, SocialLinks } from '../types';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ref, onValue, set, push, remove, update } from 'firebase/database';

interface PortfolioContextType {
  projects: Project[];
  testimonials: Testimonial[];
  isAuthenticated: boolean;
  currentUser: User | null;
  isAvailable: boolean;
  location: string;
  socialLinks: SocialLinks;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateAvailability: (status: boolean) => void;
  updateSettings: (location: string, socialLinks: SocialLinks) => void;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [location, setLocation] = useState('Hertfordshire, UK');
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(DEFAULT_SOCIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Listen for Database changes
    const rootRef = ref(db, '/');
    const unsubscribeDb = onValue(rootRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.projects) {
          const projectList = Object.entries(data.projects).map(([id, val]) => ({
            id,
            ...(val as any)
          }));
          setProjects(projectList.reverse());
        } else {
          setProjects([]);
        }

        if (data.testimonials) {
          const testimonialList = Object.entries(data.testimonials).map(([id, val]) => ({
            id,
            ...(val as any)
          }));
          setTestimonials(testimonialList);
        } else {
          setTestimonials([]);
        }

        if (data.settings) {
          setIsAvailable(data.settings.isAvailable ?? true);
          setLocation(data.settings.location ?? 'Hertfordshire, UK');
          setSocialLinks(data.settings.socialLinks ?? DEFAULT_SOCIALS);
        }
      } else {
        // Initialize with default data if empty
        initializeDefaults();
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDb();
    };
  }, []);

  const initializeDefaults = () => {
    const projectsObj: any = {};
    INITIAL_PROJECTS.forEach(p => {
      projectsObj[p.id] = { ...p };
      delete projectsObj[p.id].id;
    });

    const testimonialsObj: any = {};
    INITIAL_TESTIMONIALS.forEach(t => {
      testimonialsObj[t.id] = { ...t };
      delete testimonialsObj[t.id].id;
    });

    set(ref(db, '/'), {
      projects: projectsObj,
      testimonials: testimonialsObj,
      settings: {
        isAvailable: true,
        location: 'Hertfordshire, UK',
        socialLinks: DEFAULT_SOCIALS
      }
    });
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const projectsRef = ref(db, 'projects');
    push(projectsRef, projectData);
  };

  const deleteProject = (id: string) => {
    remove(ref(db, `projects/${id}`));
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const testimonialsRef = ref(db, 'testimonials');
    push(testimonialsRef, testimonialData);
  };

  const deleteTestimonial = (id: string) => {
    remove(ref(db, `testimonials/${id}`));
  };

  const updateAvailability = (status: boolean) => {
    update(ref(db, 'settings'), { isAvailable: status });
  };

  const updateSettings = (newLocation: string, newSocialLinks: SocialLinks) => {
    update(ref(db, 'settings'), {
      location: newLocation,
      socialLinks: newSocialLinks
    });
  };

  const logout = () => {
    signOut(auth);
  };

  if (loading) return null;

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      testimonials, 
      isAuthenticated: !!currentUser,
      currentUser,
      isAvailable,
      location,
      socialLinks,
      addProject, 
      deleteProject, 
      addTestimonial,
      deleteTestimonial,
      updateAvailability,
      updateSettings,
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
