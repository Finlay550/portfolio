
import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Layout, Settings, MessageSquare, Globe, Share2, MapPin, UserPlus } from 'lucide-react';
import { Category, SocialLinks } from '../types';

const AdminDashboard: React.FC = () => {
  const { 
    projects, addProject, deleteProject, 
    testimonials, addTestimonial, deleteTestimonial,
    logout, isAvailable, updateAvailability,
    location: currentLoc, socialLinks: currentSocials, updateSettings
  } = usePortfolio();

  // Project Form State
  const [projData, setProjData] = useState({
    title: '',
    category: 'Graphic Design' as Category,
    description: '',
    imageUrl: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000),
    tags: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  });

  // Testimonial Form State
  const [testData, setTestData] = useState({
    name: '',
    role: '',
    content: '',
    avatar: 'https://i.pravatar.cc/150?u=' + Math.floor(Math.random() * 1000)
  });

  // Settings Form State
  const [locInput, setLocInput] = useState(currentLoc);
  const [socialInputs, setSocialInputs] = useState<SocialLinks>({...currentSocials});

  const handleProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject({
      ...projData,
      tags: projData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    });
    setProjData({
      ...projData,
      title: '',
      description: '',
      imageUrl: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 1000),
      tags: ''
    });
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial(testData);
    setTestData({
      name: '',
      role: '',
      content: '',
      avatar: 'https://i.pravatar.cc/150?u=' + Math.floor(Math.random() * 1000)
    });
  };

  const handleSettingsSave = () => {
    updateSettings(locInput, socialInputs);
    alert('Settings updated successfully!');
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-slate-400">Manage your portfolio, testimonials, and online presence.</p>
          </div>
          <button 
            onClick={logout}
            className="px-6 py-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Forms & Settings */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* General Settings */}
            <div className="glass p-8 rounded-3xl border-slate-800">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings size={20} className="text-indigo-500" /> General Settings
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-4 pb-6 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Commission Status</span>
                    <button 
                      onClick={() => updateAvailability(!isAvailable)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-indigo-600' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={12} /> Your Location
                    </label>
                    <input 
                      value={locInput}
                      onChange={e => setLocInput(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Share2 size={12} /> Social Links
                  </label>
                  {Object.keys(socialInputs).map((key) => (
                    <div key={key} className="space-y-1">
                      <label className="text-[10px] text-slate-500 capitalize">{key}</label>
                      <input 
                        value={(socialInputs as any)[key]}
                        onChange={e => setSocialInputs({...socialInputs, [key]: e.target.value})}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-indigo-500 outline-none" 
                        placeholder={`URL for ${key}`}
                      />
                    </div>
                  ))}
                  <button 
                    onClick={handleSettingsSave}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Add Project */}
            <div className="glass p-8 rounded-3xl border-slate-800">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus size={20} className="text-indigo-500" /> New Project
              </h2>
              <form onSubmit={handleProjSubmit} className="space-y-4">
                <input required value={projData.title} onChange={e => setProjData({...projData, title: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" placeholder="Project Name" />
                <select value={projData.category} onChange={e => setProjData({...projData, category: e.target.value as Category})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none">
                  <option>Graphic Design</option>
                  <option>ROBLOX</option>
                  <option>Lighting</option>
                </select>
                <textarea required value={projData.description} onChange={e => setProjData({...projData, description: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm h-20 focus:border-indigo-500 outline-none resize-none" placeholder="Project details..." />
                <input value={projData.tags} onChange={e => setProjData({...projData, tags: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" placeholder="Tags (comma separated)" />
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">Add Project</button>
              </form>
            </div>

            {/* Quick Add Testimonial */}
            <div className="glass p-8 rounded-3xl border-slate-800">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <UserPlus size={20} className="text-indigo-500" /> New Testimonial
              </h2>
              <form onSubmit={handleTestSubmit} className="space-y-4">
                <input required value={testData.name} onChange={e => setTestData({...testData, name: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" placeholder="Client Name" />
                <input required value={testData.role} onChange={e => setTestData({...testData, role: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" placeholder="Role / Company" />
                <textarea required value={testData.content} onChange={e => setTestData({...testData, content: e.target.value})} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm h-20 focus:border-indigo-500 outline-none resize-none" placeholder="Testimonial content..." />
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all">Add Testimonial</button>
              </form>
            </div>
          </div>

          {/* Right Column - Inventory Management */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Projects List */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
                <Layout size={20} className="text-indigo-500" /> My Projects ({projects.length})
              </h2>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-6 group hover:border-slate-700 transition-all">
                    <img src={project.imageUrl} className="w-20 h-20 object-cover rounded-xl border border-slate-700" alt="" />
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
                      <p className="text-sm text-slate-400 truncate max-w-md">{project.description}</p>
                    </div>
                    <button 
                      onClick={() => deleteProject(project.id)}
                      className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials List */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
                <MessageSquare size={20} className="text-indigo-500" /> Testimonials ({testimonials.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
                    <button 
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="text-sm text-slate-300 italic mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img src={testimonial.avatar} className="w-10 h-10 rounded-full border border-slate-800" alt="" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
                        <p className="text-[10px] text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
