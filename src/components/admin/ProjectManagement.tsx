import { Plus, Search, Filter, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectManagement() {
  const projects = [
    { title: 'Main Hall Renovation', status: 'In Progress', client: 'Web Team', date: 'Oct 2026' },
    { title: 'Annual Scholarship Fund', status: 'Published', client: 'Education Committe', date: 'Sep 2026' },
    { title: 'Sports Meet Archive', status: 'Draft', client: 'Sports Club', date: 'Dec 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-500">Manage all website projects and galleries.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Project Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Completion Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-sm text-slate-900">{p.title}</td>
                <td className="px-6 py-4">
                   <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${
                      p.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : p.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {p.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.client}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
