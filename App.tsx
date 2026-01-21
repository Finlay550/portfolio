
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkCategory from './pages/WorkCategory';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = usePortfolio();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const Footer: React.FC = () => {
  const { socialLinks } = usePortfolio();
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href={socialLinks.dribbble} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Dribbble</a>
          <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Behance</a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} finlays.xyz. All rights reserved.</p>
      </div>
    </footer>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/work/:categoryId" element={<WorkCategory />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } 
    />
  </Routes>
);

const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </PortfolioProvider>
  );
};

export default App;
