import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/history', label: 'History' },
    { href: '/projects', label: 'Projects' },
    { href: '/directory', label: 'Alumni Directory' },
    { href: '/events', label: 'Events' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact Us' },
  ];

  if (user?.role === 'admin') {
    links.push({ href: '/admin', label: 'Dashboard' });
  }

  return (
    <nav className="bg-[#1b3281] border-b border-[#1b3281] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-[#f4d13b] overflow-hidden">
                <img src="/logo.png" alt="SMC Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-bold tracking-tight uppercase leading-none">St. Mary's College</span>
                <span className="text-[#f4d13b] text-[10px] uppercase tracking-widest mt-1">Hambantota • Alumni</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors relative py-2",
                  location.pathname === link.href ? "text-[#f4d13b]" : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="active-nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#f4d13b] rounded-t-full"
                  />
                )}
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-6 border-l pl-6 border-white/20">
              <LanguageSwitcher />
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-3 group">
                    <div className="text-right hidden lg:block group-hover:opacity-80 transition-opacity">
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-white/60 uppercase tracking-tighter">Batch of {user.batch || 'Verified'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#f4d13b] shadow-md overflow-hidden relative group-hover:scale-105 transition-transform">
                      <img src={user.profileImage} referrerPolicy="no-referrer" alt={user.name} className="h-full w-full object-cover" />
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-white/60 hover:text-red-400 transition-colors rounded-full hover:bg-white/10"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#f4d13b] text-[#1b3281] px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#ffe16b] transition-all shadow-md active:scale-95"
                >
                  Member Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button and language switcher */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/60 hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#1b3281]"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block px-3 py-3 rounded-lg text-sm font-bold tracking-wide uppercase",
                    location.pathname === link.href ? "bg-white/10 text-[#f4d13b]" : "text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                {user ? (
                   <>
                     <Link
                       to="/profile"
                       onClick={() => setIsOpen(false)}
                       className="block px-3 py-3 rounded-lg text-sm font-bold tracking-wide uppercase text-[#f4d13b] hover:bg-white/10"
                     >
                       My Profile
                     </Link>
                     <button
                       onClick={() => {
                         logout();
                         setIsOpen(false);
                       }}
                       className="w-full text-left px-3 py-3 text-sm font-bold tracking-wide uppercase text-red-400 hover:bg-red-400/10 rounded-lg"
                     >
                       Log Out
                     </button>
                   </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-lg bg-[#f4d13b] text-[#1b3281] font-bold uppercase text-xs tracking-widest shadow-md transition-all active:scale-95 mt-2"
                  >
                    Member Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
