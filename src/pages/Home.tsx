import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Users, Calendar, ShieldCheck, GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { User } from '../types';

export default function Home() {
  const [spotlightAlumni, setSpotlightAlumni] = useState<User[]>([]);

  useEffect(() => {
    // Fetch alumni from directory API to simulate pulling spotlighted profiles
    const fetchAlumni = async () => {
      try {
        const response = await fetch('/api/directory');
        if (response.ok) {
          const data = await response.json();
          // Filter to approved members and pick top 3 for spotlight
          const members = data.filter((u: User) => u.status === 'approved' && u.role === 'member');
          setSpotlightAlumni(members.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch spotlight alumni', error);
      }
    };
    fetchAlumni();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[#1b3281] border-b-4 border-[#f4d13b]">
        <img src="https://upload.wikimedia.org/wikipedia/en/e/e6/St_Mary%27s_College%2C_Hambanthota.jpg" referrerPolicy="no-referrer" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale brightness-75 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b3281] to-[#1b3281]/90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/logo.png" alt="St. Mary's College Logo" className="w-32 h-32 mx-auto mb-8 rounded-2xl border-4 border-[#f4d13b] shadow-xl object-contain bg-white" />
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-[#f4d13b] mb-6 drop-shadow-md">
                Welcome Home, <br />
                <span className="text-white font-sans not-italic font-bold">
                  Global Alumni
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-slate-200 mb-12 font-medium"
            >
              Hambantota St. Mary's College Old Boys Association connects generations of proud alumni. Join the legacy, attend events, and network with your peers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center flex-wrap gap-4"
            >
              <Link
                to="/register"
                className="bg-[#f4d13b] text-[#1b3281] px-8 py-4 rounded-xl font-bold hover:bg-[#ffe16b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
              >
                Renew Membership <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/events"
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              >
                Upcoming Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About School Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d13b]/20 text-[#1b3281] text-sm font-bold tracking-widest uppercase">
                Est. 1905
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-display">A Pillar of Excellence in the Southern Province</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                St. Mary's College, Hambantota was established by Christian missionaries, starting as an English medium school on 23 January 1905 to provide quality education to children in the region.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Over the decades, the school has grown into a prominent national institution (named a National School on 15 March 1994). Today, it caters to over 2,000 students supported by nearly 70 dedicated teachers across primary and secondary levels.
              </p>
              <div className="pt-4">
                 <Link to="/history" className="text-[#db222a] font-bold hover:text-red-700 flex items-center gap-2 group">
                   Read Full History <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 relative group">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img src="https://upload.wikimedia.org/wikipedia/en/e/e6/St_Mary%27s_College%2C_Hambanthota.jpg" referrerPolicy="no-referrer" alt="St. Mary's College Campus" className="w-full h-full object-cover bg-white transform group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-[#1b3281] border-b border-[#0b2271]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
            <div className="w-24 h-1 bg-[#f4d13b] mx-auto rounded-full"></div>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto">Spotlighting the outstanding achievements of our notable alumni across the globe.</p>
          </div>
          
          {spotlightAlumni.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {spotlightAlumni.map((alumnus, i) => (
                <motion.div
                  key={alumnus.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden flex flex-col group hover:border-[#f4d13b]/50 transition-colors"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={alumnus.profileImage || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80'} referrerPolicy="no-referrer" alt={alumnus.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f4d13b] text-[#1b3281] text-[10px] font-bold tracking-widest uppercase">
                        Spotlight
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{alumnus.name}</h3>
                    
                    <div className="space-y-2 mb-6">
                      {alumnus.profession && (
                        <p className="text-slate-300 text-sm flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#f4d13b]" /> {alumnus.profession}
                        </p>
                      )}
                      {alumnus.location && (
                        <p className="text-slate-300 text-sm flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#f4d13b]" /> {alumnus.location}
                        </p>
                      )}
                      <p className="text-slate-300 text-sm flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#f4d13b]" /> Batch of {alumnus.batch || 'N/A'}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-sm italic line-clamp-3">
                        "The foundation I received at St. Mary's College has been instrumental in my career journey..."
                      </p>
                      <Link to="/directory" className="inline-flex items-center gap-2 mt-4 text-[#f4d13b] text-sm font-bold hover:text-white transition-colors">
                        View Full Profile <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-12">
              Loading alumni profiles...
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="h-8 w-8 text-[#1b3281]" />,
                title: "Alumni Directory",
                desc: "Search and connect with former classmates globally. Syncs right from your OBA records."
              },
              {
                icon: <Calendar className="h-8 w-8 text-[#1b3281]" />,
                title: "Event Registrations",
                desc: "Purchase tickets securely for our annual general meetings, cricket encounters and socials."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-[#1b3281]" />,
                title: "Official OBA Portal",
                desc: "Secure login using your unique student ID. All records are verified by the association."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform group"
              >
                <div className="bg-[#f4d13b]/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#f4d13b] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Photo Gallery Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Memories & Gatherings</h2>
            <div className="w-24 h-1 bg-[#1b3281] mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg hover:text-slate-800 transition-colors">
              A glimpse into our vibrant community. Explore highlights from recent reunions, sporting events, and academic celebrations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-md group relative"
            >
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" referrerPolicy="no-referrer" alt="Annual Gathering" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3281]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 md:p-8">
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Annual Grand Dinner</h3>
                  <p className="text-[#f4d13b] font-medium text-sm">December 2023</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-md group relative aspect-square"
            >
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" referrerPolicy="no-referrer" alt="Sports Meet" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3281]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base">Cricket Match</h3>
                  <p className="text-[#f4d13b] text-xs">September 2023</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-md group relative aspect-square"
            >
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80" referrerPolicy="no-referrer" alt="Awards Ceremony" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3281]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base">Awards Ceremony</h3>
                  <p className="text-[#f4d13b] text-xs">August 2023</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl overflow-hidden shadow-md group relative aspect-square md:col-span-2 md:aspect-auto"
            >
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80" referrerPolicy="no-referrer" alt="Networking Event" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b3281]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <div>
                  <h3 className="text-white font-bold text-base md:text-lg">OBA Networking Night</h3>
                  <p className="text-[#f4d13b] text-xs md:text-sm">October 2023</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/events" className="inline-flex items-center gap-2 text-[#db222a] font-bold hover:text-red-700 transition-colors group">
              View Upcoming Events <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
