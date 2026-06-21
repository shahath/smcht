import { Upload, FolderPlus, ImageIcon, Search, Filter, MoreVertical, File as FileIcon } from 'lucide-react';

export default function MediaLibrary() {
  const media = [
    { name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', date: 'Oct 12, 2026' },
    { name: 'agm-2025.pdf', type: 'document', size: '5.1 MB', date: 'Sep 28, 2026' },
    { name: 'logo-transparent.png', type: 'image', size: '156 KB', date: 'Sep 15, 2026' },
    { name: 'campus-tour.mp4', type: 'video', size: '45.2 MB', date: 'Aug 04, 2026' },
    { name: 'principal-portrait.jpg', type: 'image', size: '1.2 MB', date: 'Jul 22, 2026' },
    { name: 'sponsor-logos.zip', type: 'archive', size: '8.8 MB', date: 'Jun 11, 2026' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'document': return <FileIcon className="w-8 h-8 text-rose-500" />;
      case 'video': return <div className="w-8 h-8 rounded bg-purple-500 uppercase flex items-center justify-center text-white text-[10px] font-bold">MP4</div>;
      default: return <FolderPlus className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 w-full sm:w-auto transition-colors">
            <Upload className="w-4 h-4" /> Upload Files
          </button>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors hidden sm:flex">
            <FolderPlus className="w-4 h-4" /> New Folder
          </button>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search media..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((file, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group relative">
            <button className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 bg-slate-50 rounded-xl mb-3 flex items-center justify-center">
              {getIcon(file.type)}
            </div>
            <p className="text-xs font-bold text-slate-900 truncate w-full">{file.name}</p>
            <p className="text-[10px] text-slate-500 mt-1">{file.size}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
