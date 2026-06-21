import { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from './LanguageProvider';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative notranslate" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700 bg-white border border-slate-200 shadow-sm"
        aria-label="Change Language"
      >
        <Globe className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-bold min-w-[30px] hidden sm:block">{currentLangConfig.native}</span>
        <span className="text-sm font-bold sm:hidden uppercase">{currentLangConfig.code.split('-')[0]}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 custom-scrollbar">
          <div className="px-3 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Language</span>
          </div>
          <div className="flex flex-col">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${
                  currentLanguage === lang.code ? 'bg-blue-50/50 text-blue-700' : 'text-slate-700'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-medium ${currentLanguage === lang.code ? 'font-bold' : ''}`}>
                    {lang.native}
                  </span>
                  <span className="text-xs text-slate-500">{lang.name}</span>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
