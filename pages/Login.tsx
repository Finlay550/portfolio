
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Specified admin email: finlay@finlays.xyz
      // User must create this user in Firebase Console with password: finlay550adminportfolio
      await signInWithEmailAndPassword(auth, 'finlay@finlays.xyz', password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Lock size={120} />
          </div>
          
          <div className="relative z-10 text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-600/30">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
            <p className="text-slate-400">Secure access for finlays.xyz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter password..."
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={20} />
            </button>
          </form>
          
          <p className="mt-8 text-center text-slate-500 text-sm">
            Content management for finlay@finlays.xyz
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
