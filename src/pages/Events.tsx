import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Ticket, Check, Loader2, Bell, BellRing, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

export default function Events() {
  const { token, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState<string | null>(null);
  const [notifiedEvents, setNotifiedEvents] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<'all' | 'my'>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate))
  });

  const toggleNotification = (eventId: string) => {
    setNotifiedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const headers: any = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const res = await fetch('/api/events', { headers });
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  const handleRegister = async (eventId: string, price: number) => {
    if (!user) {
      alert("Please login to register for events");
      return;
    }
    
    setRegistering(eventId);
    try {
      if (price > 0) {
        // Simulate payment gateway
        await new Promise(r => setTimeout(r, 1000));
      }
      
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        setEvents(prev => prev.map(e => {
          if (e.id === eventId) return { ...e, attendees: [...e.attendees, user.id] };
          return e;
        }));
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (e) {
      alert("Payment/Registration failed!");
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Upcoming Gatherings</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Event Feed</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">Register for the latest alumni events, AGMs, and sports encounters.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <CalendarIcon className="w-4 h-4" /> Calendar
            </button>
          </div>

          {user && (
            <div className="inline-flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setFilter('all')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => setFilter('my')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  filter === 'my' ? 'bg-white text-slate-900 shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Ticket className="w-4 h-4" /> My RSVPs
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-amber-500" /></div>
      ) : (() => {
        const displayedEvents = filter === 'my' && user ? events.filter(e => e.attendees.includes(user.id)) : events;
        
        if (displayedEvents.length === 0) {
          return (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Events Found</h3>
              <p className="text-slate-500">
                {filter === 'my' ? "You haven't RSVP'd to any upcoming events yet." : "There are currently no events scheduled."}
              </p>
            </div>
          );
        }

        return viewMode === 'list' ? (
          <div className="space-y-6">
            {displayedEvents.map((event, i) => {
            const isRegistered = user && event.attendees.includes(user.id);
            const evtDate = new Date(event.date);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden flex flex-col md:flex-row hover:border-amber-200 transition-colors group relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="md:w-1/4 bg-slate-50 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="text-amber-600 font-black uppercase tracking-widest text-[10px] mb-1">
                    {format(evtDate, 'MMM')}
                  </div>
                  <div className="text-5xl font-black text-slate-900 mb-2 font-serif">
                    {format(evtDate, 'dd')}
                  </div>
                  <div className="text-slate-500 font-bold text-xs uppercase tracking-widest">
                    {format(evtDate, 'h:mm a')}
                  </div>
                </div>

                <div className="p-8 md:w-3/4 flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{event.title}</h3>
                    <div className="bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1 rounded text-xs font-black uppercase tracking-widest whitespace-nowrap shadow-sm">
                      ${event.price}
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
                    {event.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-6 border-t border-slate-50 gap-4">
                    <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-300" /> {event.attendees.length} Registered
                      </div>
                    </div>

                    {isRegistered ? (
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleNotification(event.id)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 border transition-colors ${
                            notifiedEvents.has(event.id) 
                            ? 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' 
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {notifiedEvents.has(event.id) ? (
                            <><BellRing className="w-4 h-4" /> Reminders On</>
                          ) : (
                            <><Bell className="w-4 h-4" /> Notify Me</>
                          )}
                        </button>
                        <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
                          <Check className="w-4 h-4" /> Ticket Secured
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id, event.price)}
                        disabled={registering === event.id}
                        className="w-full sm:w-auto bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95"
                      >
                        {registering === event.id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <>
                            <Ticket className="w-4 h-4" /> Get Ticket
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">{format(currentDate, 'MMMM yyyy')}</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentDate(prev => subMonths(prev, 1))}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <button 
                onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-slate-50 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                {day}
              </div>
            ))}
            
            {daysInMonth.map((day, i) => {
              const dayEvents = displayedEvents.filter(e => isSameDay(new Date(e.date), day));
              const isCurrentMonth = isSameMonth(day, currentDate);
              
              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] bg-white p-2 ${!isCurrentMonth ? 'opacity-40' : ''} ${isToday(day) ? 'bg-amber-50/30' : ''}`}
                >
                  <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full mb-2 ${isToday(day) ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1.5">
                    {dayEvents.map(event => (
                      <div key={event.id} className="text-[10px] leading-tight p-2 rounded block bg-[#1b3281] text-white font-medium shadow-sm transition-transform hover:scale-[1.02] cursor-pointer">
                        <div className="font-bold truncate mb-0.5">{event.title}</div>
                        <div className="text-white/70 italic text-[9px]">{format(new Date(event.date), 'h:mm a')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        );
      })()}
    </div>
  );
}
