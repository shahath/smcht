import { Save, Globe, Mail, Search, Link as LinkIcon, ShieldAlert } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" /> General Site Settings
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage global website configuration and branding.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Site Title</label>
              <input type="text" defaultValue="St. Mary's College OBA" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tagline / Description</label>
              <input type="text" defaultValue="Official Past Pupils Association" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Support Email</label>
              <input type="email" defaultValue="support@smcoba.org" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Contact Number</label>
              <input type="text" defaultValue="+94 77 123 4567" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-amber-500" /> SEO & Analytics
          </h3>
          <p className="text-sm text-slate-500 mt-1">Configure metadata and tracking scripts.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Google Analytics ID (GA4)</label>
            <input type="text" placeholder="G-XXXXXXXXXX" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Meta Keywords</label>
            <textarea rows={2} placeholder="alumni, school, convention..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">Discard Changes</button>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
