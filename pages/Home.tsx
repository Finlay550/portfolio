
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from '../components/ProjectCard';
import { ArrowRight, ChevronDown, Award, Zap, Code, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { projects, testimonials } = usePortfolio();
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

        <div className="max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
            Crafting <span className="gradient-text">Experiences</span> <br /> 
            Across Dimensions.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Multi-disciplinary creative specializing in High-Fidelity Design, 
            Roblox Metaverse development, and Professional Lighting Systems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/work/graphic-design" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
              View Work <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl font-bold transition-all">
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-4 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                <Layout size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Graphic Design</h3>
              <p className="text-slate-400">Minimalist branding, editorial layouts, and digital experiences that prioritize clarity and emotion.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                <Code size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">ROBLOX Dev</h3>
              <p className="text-slate-400">Full-stack metaverse engineering. Custom Lua scripting, environmental design, and monetization strategies.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 transition-all">
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lighting Design</h3>
              <p className="text-slate-400">Atmospheric architectural and event lighting. Mastery over DMX protocols and smart home integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-slate-400">A hand-picked selection of my most recent and impactful projects.</p>
            </div>
            <Link to="/work/graphic-design" className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors">
              Explore All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-indigo-600/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 italic">Words from partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.id} className="p-8 rounded-3xl glass border-slate-800 flex flex-col justify-between">
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-indigo-500/50" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-slate-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/20 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to start a project?</h2>
          <p className="text-xl text-indigo-200/60 mb-12">Let's build something extraordinary together. My inbox is always open for bold ideas.</p>
          <Link to="/contact" className="px-12 py-5 bg-white text-slate-950 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">
            Say Hello
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
