import { Users, FolderGit2, Image as ImageIcon, LineChart, FileText, Settings, ShieldAlert, Activity, Search } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">1,248</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 flex items-center justify-center rounded-xl">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Projects</p>
            <p className="text-2xl font-bold text-slate-900">24</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Media Files</p>
            <p className="text-2xl font-bold text-slate-900">8.4k</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 flex items-center justify-center rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">System Health</p>
            <p className="text-2xl font-bold text-slate-900">99.9%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity Feed</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                <div>
                  <p className="text-sm text-slate-900 font-medium">New user registered: John Doe</p>
                  <p className="text-xs text-slate-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm font-medium text-slate-700 hover:text-blue-700">Add New User</button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-amber-500 hover:bg-amber-50 transition-colors text-sm font-medium text-slate-700 hover:text-amber-700">Create Project</button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-sm font-medium text-slate-700 hover:text-emerald-700">Upload Media</button>
          </div>
        </div>
      </div>
    </div>
  );
}
