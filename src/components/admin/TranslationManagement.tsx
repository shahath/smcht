import { useState } from 'react';
import { Globe, Languages, Settings2, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../LanguageProvider';

export default function TranslationManagement() {
  const [enabledLangs, setEnabledLangs] = useState<Record<string, boolean>>(
    SUPPORTED_LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang.code]: true }), {})
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="bg-gradient-to-br from-[#1b3281] to-[#0a1540] rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/20">
            <Globe className="w-8 h-8 text-[#f4d13b]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif mb-1">Advanced Enterprise Translation System</h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <p className="text-white/80 text-sm">Google Cloud Translation Engine Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 px-6 py-4 rounded-xl border border-white/20 backdrop-blur-sm self-stretch flex flex-col justify-center">
          <p className="text-xs text-white/60 uppercase tracking-widest font-bold mb-1">Architecture</p>
          <p className="text-sm font-medium">Zero-latency Client-side Injection</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <Languages className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Supported Languages</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage active languages across the entire platform.</p>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {SUPPORTED_LANGUAGES.map(lang => (
                <div key={lang.code} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 text-center font-bold text-slate-400 uppercase text-xs tracking-wider">
                      {lang.code.split('-')[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{lang.name}</p>
                      <p className="text-xs text-slate-500">{lang.native}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">RTL: {lang.dir.toUpperCase()}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={enabledLangs[lang.code]} 
                        onChange={(e) => setEnabledLangs({...enabledLangs, [lang.code]: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings2 className="w-5 h-5 text-slate-700" />
              <h3 className="font-bold text-slate-900">System Configuration</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <p className="font-bold text-emerald-900 text-sm">Dynamic Translation</p>
                </div>
                <p className="text-xs text-emerald-700">Client-side rendering wrapper successfully bypassing database overhead.</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <p className="font-bold text-emerald-900 text-sm">Font Mapping Automation</p>
                </div>
                <p className="text-xs text-emerald-700">Google Noto Fonts are automatically downloaded based on the user's selected language.</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <p className="font-bold text-emerald-900 text-sm">Automatic RTL Support</p>
                </div>
                <p className="text-xs text-emerald-700">Arabic & RTL languages instantly remap the document direction without layout breaks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
