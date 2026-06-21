import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Mail, GraduationCap, Award, CreditCard, Activity, Heart, Download, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'transactions'>('overview');
  const [showIdCard, setShowIdCard] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Mock event history (could be fetched based on user.id)
  const eventHistory = [
    { id: '1', title: 'Annual General Meeting 2023', date: 'September 3, 2023', status: 'Attended' },
    { id: '2', title: 'Cricket Match: Past vs. Present', date: 'September 21, 2023', status: 'Attended' },
    { id: '3', title: 'OBA Networking Night', date: 'December 15, 2023', status: 'Registered' },
  ];

  const transactionHistory = [
    { id: '1', title: 'New Library Building Fund', type: 'Donation', date: 'January 15, 2024', amount: 'Rs. 25,000', status: 'Completed' },
    { id: '2', title: 'Annual Membership Fee 2024', type: 'Membership', date: 'January 1, 2024', amount: 'Rs. 5,000', status: 'Completed' },
    { id: '3', title: 'Annual Scholarship Program', type: 'Donation', date: 'March 10, 2023', amount: 'Rs. 10,000', status: 'Completed' },
  ];

  const engagementData = [
    { name: 'Jan', events: 1, donations: 50 },
    { name: 'Feb', events: 0, donations: 0 },
    { name: 'Mar', events: 2, donations: 100 },
    { name: 'Apr', events: 1, donations: 0 },
    { name: 'May', events: 0, donations: 0 },
    { name: 'Jun', events: 1, donations: 150 },
    { name: 'Jul', events: 0, donations: 0 },
    { name: 'Aug', events: 0, donations: 50 },
    { name: 'Sep', events: 2, donations: 200 },
    { name: 'Oct', events: 1, donations: 0 },
    { name: 'Nov', events: 1, donations: 0 },
    { name: 'Dec', events: 2, donations: 250 },
  ];

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 print:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
      >
        <div className="h-32 bg-slate-900 border-b-4 border-amber-500 relative">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
        </div>
        
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-8">
            <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white overflow-hidden">
              <img src={user.profileImage} referrerPolicy="no-referrer" alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowIdCard(true)}
                className="px-5 py-2 rounded-lg bg-[#1b3281] text-white font-bold text-sm tracking-wide hover:bg-[#294098] transition-colors flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Membership Card
              </button>
              <button className="px-5 py-2 rounded-lg bg-amber-100 text-amber-800 font-bold text-sm tracking-wide hover:bg-amber-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-display">{user.name}</h1>
                <p className="text-slate-500 font-medium">Member ID: {user.uniqueId}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Member
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm">{user.email || 'No email provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <GraduationCap className="w-5 h-5 text-slate-400" />
                  <span className="text-sm">Batch of {user.batch || 'Verified'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Award className="w-5 h-5 text-slate-400" />
                  <span className="text-sm capitalize">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex gap-6 border-b border-slate-200 mb-8 overflow-x-auto pb-px">
                <button 
                  onClick={() => setActiveTab('overview')} 
                  className={`pb-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${activeTab === 'overview' ? 'border-[#f4d13b] text-[#1b3281]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('events')} 
                  className={`pb-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${activeTab === 'events' ? 'border-[#f4d13b] text-[#1b3281]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  Event History
                </button>
                <button 
                  onClick={() => setActiveTab('transactions')} 
                  className={`pb-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${activeTab === 'transactions' ? 'border-[#f4d13b] text-[#1b3281]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  Transaction History
                </button>
              </div>

              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-emerald-500" />
                      Annual Engagement
                    </h3>
                    <div className="h-64 mb-10 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={engagementData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                          <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: '#f8fafc' }}
                          />
                          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                          <Bar yAxisId="left" dataKey="events" name="Events Attended" fill="#001375" radius={[4, 4, 0, 0]} maxBarSize={30} />
                          <Bar yAxisId="right" dataKey="donations" name="Donations ($)" fill="#d8b022" radius={[4, 4, 0, 0]} maxBarSize={30} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <CreditCard className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Membership Status</h4>
                      <p className="text-sm text-slate-600 mb-3">Your annual membership is active until December 31, 2024.</p>
                      <button className="text-sm font-bold text-amber-600 hover:text-amber-700">Manage Subscription</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-500" />
                    Event History
                  </h3>
                  {eventHistory.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all bg-slate-50 hover:bg-white group">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{event.title}</h4>
                        <p className="text-sm text-slate-500">{event.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        event.status === 'Attended' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500" />
                    Transaction History
                  </h3>
                  {transactionHistory.map((transaction) => (
                    <div key={transaction.id} className="p-4 rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all bg-slate-50 hover:bg-white group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{transaction.title}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            transaction.type === 'Membership' ? 'bg-[#1b3281]/10 text-[#1b3281]' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {transaction.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-slate-500">{transaction.date}</p>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <p className="text-sm font-semibold text-slate-700">{transaction.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-8 p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                    <p className="text-slate-500 mb-4">Want to support another project?</p>
                    <Link to="/donate" className="inline-block bg-[#1b3281] text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide hover:bg-[#294098] transition-colors shadow-md">
                      View Open Campaigns
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    
    <AnimatePresence>
      {showIdCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm print:absolute print:inset-0 print:bg-white print:p-0 print:m-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full relative print:shadow-none print:w-full print:max-w-none print:rounded-none"
          >
            <button 
              onClick={() => setShowIdCard(false)}
              className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 text-white rounded-full backdrop-blur-md transition-colors z-10 print:hidden"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* ID Card Front */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#1b3281] to-[#0a1540] print:from-white print:to-white print:bg-none print:border-8 print:border-[#1b3281] p-8 text-white print:text-[#1b3281] h-[26rem] flex flex-col justify-between" id="membership-card">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 print:opacity-[0.03] pointer-events-none">
                <img src="/logo.png" alt="watermark" className="w-[150%] h-[150%] object-cover object-center transform -translate-x-1/4 -translate-y-1/4" />
              </div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-[#f4d13b] print:text-[#1b3281] font-display font-bold text-2xl uppercase tracking-widest">St. Mary's College</h3>
                  <p className="text-white/80 print:text-[#1b3281]/80 text-sm font-bold tracking-widest uppercase mt-1">Past Pupils Association</p>
                </div>
                <img src="/logo.png" alt="SMC Logo" className="w-16 h-16 object-contain bg-white rounded-full p-1 border-2 border-[#f4d13b] print:border-[#1b3281]" />
              </div>
              
              <div className="relative z-10 flex gap-6 items-end mt-12">
                <div className="w-32 h-32 rounded-xl border-4 border-[#f4d13b] print:border-[#1b3281] overflow-hidden bg-white shrink-0 shadow-lg">
                  <img src={user.profileImage} referrerPolicy="no-referrer" alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pb-1">
                  <p className="text-[#f4d13b] print:text-[#1b3281] text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Official Member</p>
                  <h2 className="text-3xl font-bold leading-tight mb-2">{user.name}</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4">
                    <div>
                      <p className="text-white/50 print:text-slate-500 text-[10px] uppercase tracking-wider">Member ID</p>
                      <p className="font-mono font-bold text-[#f4d13b] print:text-[#1b3281] text-base">{user.uniqueId}</p>
                    </div>
                    <div>
                      <p className="text-white/50 print:text-slate-500 text-[10px] uppercase tracking-wider">Batch</p>
                      <p className="font-bold print:text-[#1b3281] text-base">{user.batch}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center print:hidden">
              <p className="text-sm text-slate-500 font-medium">Digital Membership Card</p>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-[#f4d13b] text-[#1b3281] px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide hover:bg-[#e0bb2a] transition-colors"
              >
                <Download className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
