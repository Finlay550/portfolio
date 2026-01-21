
import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Layout, Image, Tag, Calendar, ChevronRight } from 'lucide-react';
import { Category } from '../types';

const AdminDashboard: React.FC = () => {
  const { projects, addProject, deleteProject, logout } = usePortfolio();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Graphic Design' as Category,
    description: '',
    imageUrl: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000),
    tags: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    });
    setFormData({
      ...formData,
      title: '',
      description: '',
      imageUrl: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000),
      tags: ''
    });
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-slate-400">Manage your portfolio projects and showcase your latest work.</p>
          </div>
          <button 
            onClick={logout}
            className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Project Form */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-3xl border-slate-800 sticky top-32">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-indigo-500" /> Quick Add Project
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Title</label>
                  <input 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" 
                    placeholder="Project Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Category})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                  >
                    <option>Graphic Design</option>
                    <option>ROBLOX</option>
                    <option>Lighting</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Description</label>
                  <textarea 
                    required 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm h-24 focus:border-indigo-500 outline-none resize-none" 
                    placeholder="Project details..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Image URL</label>
                  <input 
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" 
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tags (comma separated)</label>
                  <input 
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" 
                    placeholder="UI, Logo, 3D"
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-4">
                  Add to Portfolio
                </button>
              </form>
            </div>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
              <Layout size={20} className="text-indigo-500" /> Current Inventory ({projects.length})
            </h2>
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-6 group hover:border-slate-700 transition-all">
                  <img src={project.imageUrl} className="w-24 h-24 object-cover rounded-xl border border-slate-700" alt="" />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-[10px] text-slate-500">{project.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                    <p className="text-sm text-slate-400 truncate max-w-md">{project.description}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => deleteProject(project.id)}
                      className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                  <p className="text-slate-500">No projects to display. Add your first one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
