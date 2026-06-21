import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { Search, MapPin, Mail, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigate } from 'react-router';

export default function Directory() {
  const { token, user } = useAuth();
  const [alumni, setAlumni] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filterBatch, setFilterBatch] = useState('');
  const [filterProfession, setFilterProfession] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch('/api/directory', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAlumni(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAlumni();
  }, [token]);

  const filteredAlumni = alumni.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchBatch = filterBatch ? a.batch === filterBatch : true;
    const matchProfession = filterProfession ? a.profession === filterProfession : true;
    const matchLocation = filterLocation ? (a.location || '').toLowerCase().includes(filterLocation.toLowerCase()) : true;
    return matchSearch && matchBatch && matchProfession && matchLocation;
  });

  const batches = Array.from(new Set(alumni.map(a => a.batch).filter(Boolean))).sort();
  const professions = Array.from(new Set(alumni.map(a => a.profession).filter(Boolean))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col gap-6 mb-12 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 mb-2 font-bold tracking-tight">Alumni Directory</h1>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold italic underline decoration-amber-400 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              Verified Member Network
            </div>
            <p className="text-slate-500 text-sm">Connect with your peers and network across the globe.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-full border-none focus:ring-2 focus:ring-amber-500/20 outline-none text-sm shadow-inner"
            />
          </div>
        </div>
        
        <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Batch Year</label>
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20 outline-none text-sm shadow-inner cursor-pointer"
            >
              <option value="">All Batches</option>
              {batches.map(b => (
                <option key={b as string} value={b as string}>{b}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Industry</label>
            <select
              value={filterProfession}
              onChange={(e) => setFilterProfession(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20 outline-none text-sm shadow-inner cursor-pointer"
            >
              <option value="">All Industries</option>
              {professions.map(p => (
                <option key={p as string} value={p as string}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="City or Country..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-amber-500/20 outline-none text-sm shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-slate-500">
            Showing {filteredAlumni.length} {filteredAlumni.length === 1 ? 'member' : 'members'}
          </p>
          {(search || filterBatch || filterProfession || filterLocation) && (
            <button
              onClick={() => {
                setSearch('');
                setFilterBatch('');
                setFilterProfession('');
                setFilterLocation('');
              }}
              className="text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-amber-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-20 rounded-bl-full blur-2xl z-0"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-3xl border border-slate-100 h-48" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumni.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl -z-10 group-hover:bg-amber-50 transition-colors"></div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shadow-sm relative">
                  <img 
                    src={member.profileImage} 
                    referrerPolicy="no-referrer"
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name='+member.name+'&background=random' }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex flex-col text-[11px] text-slate-500 mt-1 gap-1">
                    <span className="font-bold text-[#001375]">Batch of {member.batch || 'Unknown'}</span>
                    {member.profession && <span>{member.profession}</span>}
                  </div>
                </div>
                <div className="ml-auto mt-2 w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center truncate">
                  <Mail className="w-4 h-4 mr-2 text-slate-400" />
                  {member.email || "No email visible"}
                </div>
                {member.location && (
                  <div className="flex items-center shrink-0 ml-2">
                    <MapPin className="w-3 h-3 mr-1 text-amber-500" />
                    {member.location}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {filteredAlumni.length === 0 && (
            <div className="col-span-full text-center py-24 text-slate-500 font-medium">
              No alumni found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
