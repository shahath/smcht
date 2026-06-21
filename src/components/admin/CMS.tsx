import { Globe, Layers, Type, Image as ImageIcon, LayoutTemplate } from 'lucide-react';

export default function CMS() {
  const pages = [
    { name: 'Home Page', status: 'Published', lastEdited: '2 hours ago' },
    { name: 'About Us', status: 'Published', lastEdited: '1 day ago' },
    { name: 'Services', status: 'Draft', lastEdited: '3 days ago' },
    { name: 'Contact', status: 'Published', lastEdited: '1 week ago' },
    { name: 'Testimonials', status: 'Published', lastEdited: '1 month ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <LayoutTemplate className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Page Builder</h3>
          <p className="text-sm text-slate-500">Edit homepage layouts, hero banners, and structural components.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Type className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Typography & Content</h3>
          <p className="text-sm text-slate-500">Manage all text copy, descriptions, and static content across the site.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Navigation & Menus</h3>
          <p className="text-sm text-slate-500">Configure header links, footer structures, and social pathways.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">Website Pages</h3>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Add New Page</button>
        </div>
        <div className="divide-y divide-slate-100">
          {pages.map((p, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="font-bold text-sm text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">Last edited {p.lastEdited}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${p.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {p.status}
                </span>
                <button className="text-sm font-medium text-slate-400 hover:text-blue-600">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
