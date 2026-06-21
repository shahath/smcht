import { motion } from 'motion/react';
import { Heart, CreditCard, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');

  const presefAmounts = [1000, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-6"
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Support Our School
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your generous contributions enable us to improve facilities, offer scholarships, and fund essential projects at St. Mary's College.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-display">Make a Donation</h2>
            
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Select Amount (LKR)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presefAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                      selectedAmount === amount
                        ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-inner'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 outline-none transition-all font-bold text-lg text-slate-900"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">Personal Information</label>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-400 outline-none transition-colors font-medium"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-400 outline-none transition-colors font-medium"
                />
                <select className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-400 outline-none transition-colors font-medium text-slate-600">
                  <option value="">Select Project Intent (Optional)</option>
                  <option value="general">General Fund</option>
                  <option value="hall">Main Hall Renovation</option>
                  <option value="itl">IT Lab Upgrades</option>
                  <option value="scholarship">Student Scholarships</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                const amount = selectedAmount || Number(customAmount || 0);
                if (!amount || amount <= 0) return;

                try {
                  const res = await fetch('/api/payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount, purpose: 'Donation' }),
                  });

                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error || 'Payment failed');
                  alert(data.message);
                } catch (error: any) {
                  alert(error.message || 'Payment failed.');
                }
              }}
              className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              Proceed to Payment <ArrowRight className="w-5 h-5" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure 256-bit encrypted checkout
            </div>
          </motion.div>

          {/* Alternate Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-800 rounded-bl-full opacity-50" />
              <Landmark className="w-10 h-10 text-amber-400 mb-6" />
              <h3 className="text-xl font-bold mb-2 font-display">Bank Transfer</h3>
              <p className="text-slate-400 mb-6 text-sm">
                You can also deposit funds directly into the St. Mary's College OBA trust account. Please email the deposit slip for our records.
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 block uppercase tracking-widest text-[10px] font-bold">Bank</span>
                  <span className="font-semibold">Bank of Ceylon</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-3">
                  <span className="text-slate-400 block uppercase tracking-widest text-[10px] font-bold">Branch</span>
                  <span className="font-semibold">Hambantota</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-3">
                  <span className="text-slate-400 block uppercase tracking-widest text-[10px] font-bold">Account Name</span>
                  <span className="font-semibold text-right">SMC OBA Development</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-700 pt-3">
                  <span className="text-slate-400 block uppercase tracking-widest text-[10px] font-bold">Account No</span>
                  <span className="font-mono text-amber-400 font-bold translate-y-1">000 1234 5678</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 rounded-3xl p-8 border border-amber-200">
               <h3 className="text-xl font-bold text-amber-900 mb-2 font-display">Transparency First</h3>
               <p className="text-amber-800/80 text-sm mb-4">
                 Our Old Boys Association handles all funds with strict auditing and regular financial reporting. Every donation is allocated meticulously to designated projects.
               </p>
               <a href="#" className="font-bold text-amber-700 text-sm hover:underline">Read our latest financial report →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
