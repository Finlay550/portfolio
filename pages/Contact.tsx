
import React, { useState } from 'react';
import { Mail, MapPin, Twitter, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Let's <br /> <span className="gradient-text">Connect.</span></h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Whether you have a specific project in mind or just want to chat about the future of the metaverse, I'm all ears.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:border-indigo-500/50 transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-sm font-medium">Email Me</h4>
                  <p className="text-lg font-bold">hello@creativeportfolio.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:border-indigo-500/50 transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-slate-500 text-sm font-medium">Based In</h4>
                  <p className="text-lg font-bold">London, United Kingdom</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <button key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all">
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-slate-800 rounded-xl font-bold hover:bg-slate-700 transition-all"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Name</label>
                    <input required type="text" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                    <input required type="email" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                  <select className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all">
                    <option>Graphic Design Inquiry</option>
                    <option>ROBLOX Collaboration</option>
                    <option>Lighting Project</option>
                    <option>General Chat</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <textarea required className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 h-40 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none" placeholder="How can I help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3">
                  Send Message <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
