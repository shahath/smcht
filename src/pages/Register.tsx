import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Loader2, CheckCircle2, CreditCard } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    uniqueId: '',
    batch: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock Payment fields
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Simulate payment
      await new Promise(r => setTimeout(r, 1000));
      if (card.length < 16) throw new Error("Invalid card details for registration fee");

      // 2. Register user
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">Registration Submitted!</h2>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed">
            Your membership fee was processed. Your account is now pending admin approval. You will receive an email once approved.
          </p>
          <Link
            to="/login"
            className="inline-block bg-slate-900 text-white font-bold text-sm tracking-wider uppercase py-3 px-8 rounded-xl hover:bg-slate-800 transition-all shadow-md"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-12 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Become a Member</h2>
          <p className="text-slate-500 text-sm">
            {step === 1 ? 'Step 1: Personal Details' : 'Step 2: Registration Fee ($10)'}
          </p>
          
          <div className="flex gap-2 mt-6">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-100'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-100'}`} />
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm font-medium border border-rose-100">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleNext}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Batch (Year)</label>
                  <input
                    type="text"
                    required
                    value={formData.batch}
                    onChange={(e) => setFormData({...formData, batch: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
                    placeholder="e.g. 2005"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Unique Admission ID</label>
                  <input
                    type="text"
                    required
                    value={formData.uniqueId}
                    onChange={(e) => setFormData({...formData, uniqueId: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Link to="/login" className="text-slate-500 font-bold text-sm tracking-wide hover:text-slate-900">Cancel</Link>
                <button
                  type="submit"
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-md hover:bg-slate-800 transition-all active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRegister}
              className="space-y-5"
            >
              <div className="bg-slate-50 border border-dashed border-slate-200 p-6 rounded-2xl mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">OBA Registration Fee</span>
                  <span className="text-3xl font-black text-slate-900">$10.00</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">CVC</label>
                      <input
                        type="text"
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 font-bold text-sm tracking-wide hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-amber-500 text-slate-900 px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-md hover:bg-amber-400 transition-all flex items-center gap-2 active:scale-95 shadow-amber-500/20"
                >
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'SECURE CHECKOUT'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
