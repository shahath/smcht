import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uniqueId, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      login(data.token, data.user);
      navigate(data.user.role === 'admin' ? '/admin' : '/directory');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-maroon-700 rounded-lg flex items-center justify-center border-2 border-amber-400">
            <span className="text-white font-bold text-lg">SMC</span>
          </div>
        </div>
        <h2 className="text-3xl font-serif text-slate-900 mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-500 mb-8 text-center text-sm">Enter your unique Alumni ID to login.</p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Unique ID (or Admin User)</label>
            <input
              type="text"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="e.g. 76 or admin_001"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-slate-900 font-bold uppercase tracking-wider text-sm py-3.5 rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'SECURE LOGIN'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Not a member yet?{' '}
          <Link to="/register" className="text-amber-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
