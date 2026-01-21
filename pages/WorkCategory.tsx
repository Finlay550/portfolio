
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from '../components/ProjectCard';
import { Category } from '../types';

const WorkCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { projects } = usePortfolio();

  const currentCategory: Category = useMemo(() => {
    switch (categoryId) {
      case 'graphic-design': return 'Graphic Design';
      case 'roblox': return 'ROBLOX';
      case 'lighting': return 'Lighting';
      default: return 'All';
    }
  }, [categoryId]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => p.category === currentCategory || currentCategory === 'All');
  }, [currentCategory, projects]);

  const getCategoryDetails = () => {
    switch (currentCategory) {
      case 'Graphic Design': return { title: 'Graphic Design', desc: 'Visual storytelling and brand architecture.', color: 'from-blue-500 to-indigo-600' };
      case 'ROBLOX': return { title: 'Roblox Development', desc: 'Immersive metaverse worlds and gameplay engineering.', color: 'from-purple-500 to-pink-600' };
      case 'Lighting': return { title: 'Lighting Design', desc: 'Painting environments with light and shadow.', color: 'from-amber-400 to-orange-600' };
      default: return { title: 'All Work', desc: 'A collective showcase of my diverse creative output.', color: 'from-indigo-500 to-purple-600' };
    }
  };

  const details = getCategoryDetails();

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${details.color} text-white text-xs font-bold mb-6`}>
            {currentCategory.toUpperCase()}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">{details.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl">{details.desc}</p>
        </header>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <h3 className="text-2xl font-bold text-slate-500">No projects found in this category yet.</h3>
            <p className="text-slate-600 mt-2">Check back soon for new additions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCategory;
