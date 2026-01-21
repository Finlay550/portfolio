
import React, { useState } from 'react';
import { Project } from '../types';
import { getProjectInsights } from '../geminiService';
import { Sparkles, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async () => {
    if (insight) return;
    setLoadingInsight(true);
    const result = await getProjectInsights(project.title, project.description);
    setInsight(result);
    setLoadingInsight(false);
  };

  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-indigo-600/90 text-xs font-semibold rounded-full backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-slate-500 text-xs flex items-center gap-1">
            <Calendar size={12} /> {project.date}
          </span>
        </div>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={fetchInsight}
            disabled={loadingInsight}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium hover:from-indigo-500/20 hover:to-purple-500/20 transition-all disabled:opacity-50"
          >
            <Sparkles size={14} className={loadingInsight ? "animate-spin" : ""} />
            {loadingInsight ? 'Consulting AI...' : insight ? 'AI Director Review' : 'Get AI Insight'}
          </button>

          {insight && (
            <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg text-xs italic text-indigo-200 animate-in fade-in slide-in-from-top-2">
              "{insight}"
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
             <a 
              href={project.link || "#"} 
              className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
            >
              Details <ChevronRight size={16} />
            </a>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
