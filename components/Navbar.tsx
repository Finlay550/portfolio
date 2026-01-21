
import React, { useState } from 'react';
import { Menu, X, Globe, User, Briefcase, Mail, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = usePortfolio();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <User size={18} /> },
    { name: 'Graphic Design', path: '/work/graphic-design', icon: <Globe size={18} /> },
    { name: 'ROBLOX', path: '/work/roblox', icon: <Briefcase size={18} /> },
    { name: 'Lighting', path: '/work/lighting', icon: <Globe size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20">F</div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">finlays.xyz</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === link.path 
                      ? 'text-indigo-400 bg-indigo-400/10' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="w-px h-6 bg-slate-800 mx-2"></div>
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      location.pathname === '/admin' 
                        ? 'text-indigo-400 bg-indigo-400/10' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Settings size={18} /> Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-950 border-b border-slate-800 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-4 rounded-xl text-base font-medium flex items-center gap-3 ${
                location.pathname === link.path 
                  ? 'bg-indigo-600/20 text-indigo-400' 
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="border-t border-slate-800 pt-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-4 rounded-xl text-base font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-3"
                >
                  <Settings size={18} /> Dashboard
                </Link>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full text-left px-4 py-4 rounded-xl text-base font-medium text-red-400 hover:bg-red-400/10 flex items-center gap-3"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 rounded-xl text-base font-medium text-slate-300 hover:bg-slate-900 flex items-center gap-3"
              >
                <Settings size={18} /> Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
