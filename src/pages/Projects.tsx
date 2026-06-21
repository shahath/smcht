import { motion } from 'motion/react';
import { Target, Lightbulb, Pickaxe, CheckCircle2, Camera } from 'lucide-react';
import { useState } from 'react';

type Project = {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  allocatedBatch: string;
  budget: string;
};

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Classroom Initiative',
    description: 'Providing interactive smart boards and digital learning tools to all senior classrooms to enhance modern education.',
    status: 'in-progress',
    allocatedBatch: 'Batch of 2005',
    budget: 'Rs. 3,500,000'
  },
  {
    id: '2',
    title: 'School Ground Upgrades',
    description: 'Renovating the school cricket pitch and installing a secure new perimeter fence around the main grounds.',
    status: 'planning',
    allocatedBatch: 'Batch of 1998',
    budget: 'Rs. 2,800,000'
  },
  {
    id: '3',
    title: 'Library Renovation & E-Learning Hub',
    description: 'Modernizing the school library and creating a digital hub equipped with e-learning resources and high-speed Wi-Fi.',
    status: 'completed',
    allocatedBatch: 'Batch of 2012',
    budget: 'Rs. 1,500,000'
  }
];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", alt: "Annual Gathering" },
  { id: 2, src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80", alt: "Committee Meeting" },
  { id: 3, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80", alt: "Sports Encounter" },
  { id: 4, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80", alt: "Awards Ceremony" },
  { id: 5, src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80", alt: "Networking Dinner" },
  { id: 6, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80", alt: "Project Inauguration" },
];

export default function Projects() {
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const StatusIcon = ({ status }: { status: Project['status'] }) => {
    switch (status) {
      case 'planning': return <Lightbulb className="w-5 h-5 text-amber-500" />;
      case 'in-progress': return <Pickaxe className="w-5 h-5 text-blue-500" />;
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-6"
          >
            <Target className="w-8 h-8 text-amber-400" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
            Master Plan & Projects
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover what we are going to do to uplift St. Mary's College. Explore upcoming initiatives, proposed developments, and batch allocations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center">
            <h3 className="text-4xl font-black text-slate-900 mb-2">12+</h3>
            <p className="text-slate-500 font-medium uppercase text-sm tracking-widest">Active Initiatives</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center">
            <h3 className="text-4xl font-black text-slate-900 mb-2">25</h3>
            <p className="text-slate-500 font-medium uppercase text-sm tracking-widest">Batches Involved</p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm text-center">
            <h3 className="text-4xl font-black text-slate-900 mb-2">Rs. 15M+</h3>
            <p className="text-slate-500 font-medium uppercase text-sm tracking-widest">Total Investment</p>
          </div>
        </div>

        <div className="mb-12 flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Project Allocation & Tracking</h2>
            <p className="text-slate-500 mt-1">Track the progress of batch-sponsored projects.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 font-display pr-4">{project.title}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusBadge(project.status)}`}>
                    <StatusIcon status={project.status} />
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-6 text-sm leading-relaxed min-h-[4rem]">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Allocated Batch</p>
                    <p className="text-sm font-semibold text-slate-900">{project.allocatedBatch}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Estimated Budget</p>
                    <p className="text-sm font-semibold pl-2 border-l-2 border-amber-400 text-slate-900">{project.budget}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-12 flex items-center gap-3 border-b border-slate-200 pb-6">
          <Camera className="w-8 h-8 text-[#1b3281]" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Event & Infrastructure Gallery</h2>
            <p className="text-slate-500 mt-1">Glimpses of past events, encounters, and project milestones.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-24">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                referrerPolicy="no-referrer"
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 duration-300">
                  View Full
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full mx-auto"
            >
              <img src={selectedImage} referrerPolicy="no-referrer" alt="Fullscreen event view" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
              <p className="text-white text-center mt-4 text-sm font-medium tracking-wide">Click anywhere to close</p>
            </motion.div>
          </div>
        )}

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-4 border-slate-800">
           <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">Propose a New Project</h2>
             <p className="text-slate-400 max-w-2xl mx-auto mb-8">
               Is your batch interested in sponsoring a new initiative? Our project committee reviews proposals quarterly to allocate funds and coordinate development.
             </p>
             <button className="bg-amber-500 text-slate-900 px-8 py-3 rounded-xl font-bold tracking-wide hover:bg-amber-400 transition-colors shadow-lg active:scale-95">
               Submit a Proposal
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
