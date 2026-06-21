import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Users, FolderGit2, Image as ImageIcon, FileEdit, Settings, LogOut, ShieldAlert, CreditCard, Languages } from 'lucide-react';
import { User } from '../types';

import Overview from '../components/admin/Overview';
import UserManagement from '../components/admin/UserManagement';
import ProjectManagement from '../components/admin/ProjectManagement';
import MediaLibrary from '../components/admin/MediaLibrary';
import CMS from '../components/admin/CMS';
import SettingsView from '../components/admin/Settings';

import PaymentConfig from '../components/admin/PaymentConfig';
import TranslationManagement from '../components/admin/TranslationManagement';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    // In a real app we would fetch the live data here
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` }});
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (e) {
        console.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, [token]);

  const TABS = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects & Events', icon: <FolderGit2 className="w-5 h-5" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'cms', label: 'Website CMS', icon: <FileEdit className="w-5 h-5" /> },
    { id: 'settings', label: 'Global Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'payments', label: 'Payment Integration', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'translations', label: 'Languages & Translation', icon: <Languages className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-200 bg-slate-900 border-b-4 border-amber-500">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <ShieldAlert className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="font-bold font-serif text-lg leading-tight">Super Admin</h2>
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Enterprise Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[100vw] md:max-w-[calc(100vw-18rem)]">
        <header className="bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-bold text-slate-900">{TABS.find(t => t.id === activeTab)?.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-right">
              <div>
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Super Admin</p>
              </div>
              <img src={user.profileImage} referrerPolicy="no-referrer" alt="" className="w-10 h-10 rounded-full border-2 border-slate-200 object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 h-[calc(100vh-5rem)] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'users' && <UserManagement users={users} />}
              {activeTab === 'projects' && <ProjectManagement />}
              {activeTab === 'media' && <MediaLibrary />}
              {activeTab === 'cms' && <CMS />}
              {activeTab === 'settings' && <SettingsView />}
              {activeTab === 'payments' && <PaymentConfig />}
              {activeTab === 'translations' && <TranslationManagement />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
