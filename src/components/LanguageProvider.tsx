import React, { createContext, useContext, useEffect, useState } from 'react';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr', font: 'Inter' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල', dir: 'ltr', font: '"Noto Sans Sinhala", sans-serif' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', dir: 'ltr', font: '"Noto Sans Tamil", sans-serif' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl', font: '"Noto Naskh Arabic", serif' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', dir: 'ltr', font: '"Noto Sans Devanagari", sans-serif' },
  { code: 'zh-CN', name: 'Simplified Chinese', native: '简体中文', dir: 'ltr', font: '"Noto Sans SC", sans-serif' },
  { code: 'zh-TW', name: 'Traditional Chinese', native: '繁體中文', dir: 'ltr', font: '"Noto Sans TC", sans-serif' },
  { code: 'ja', name: 'Japanese', native: '日本語', dir: 'ltr', font: '"Noto Sans JP", sans-serif' },
  { code: 'ko', name: 'Korean', native: '한국어', dir: 'ltr', font: '"Noto Sans KR", sans-serif' },
  { code: 'fr', name: 'French', native: 'Français', dir: 'ltr', font: 'Inter' },
  { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr', font: 'Inter' },
  { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr', font: 'Inter' },
  { code: 'it', name: 'Italian', native: 'Italiano', dir: 'ltr', font: 'Inter' },
  { code: 'pt', name: 'Portuguese', native: 'Português', dir: 'ltr', font: 'Inter' },
  { code: 'ru', name: 'Russian', native: 'Русский', dir: 'ltr', font: 'Inter' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', dir: 'ltr', font: 'Inter' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', dir: 'ltr', font: 'Inter' },
  { code: 'th', name: 'Thai', native: 'ไทย', dir: 'ltr', font: '"Noto Sans Thai", sans-serif' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', dir: 'ltr', font: 'Inter' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', dir: 'ltr', font: 'Inter' }
];

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (langCode: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load Google Translate Script
  useEffect(() => {
    // Check if script already exists
    if (!document.getElementById('google-translate-script')) {
      const gTranslateConfig = document.createElement('script');
      gTranslateConfig.innerHTML = `
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false,
            includedLanguages: '${SUPPORTED_LANGUAGES.map(l => l.code).join(',')}'
          }, 'google_translate_element');
        }
      `;
      document.body.appendChild(gTranslateConfig);

      const gTranslateScript = document.createElement('script');
      gTranslateScript.id = 'google-translate-script';
      gTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      gTranslateScript.async = true;
      document.body.appendChild(gTranslateScript);
    }
  }, []);

  // Poll for existing googtrans cookie or select element to sync state on load
  useEffect(() => {
    const checkCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
      if (match && match[1] && currentLanguage !== match[1]) {
        setCurrentLanguage(match[1]);
      }
    };
    checkCookie();
    // Re-check periodically in case Google auto-detects
    const interval = setInterval(checkCookie, 2000);
    return () => clearInterval(interval);
  }, [currentLanguage]);

  // Handle font and RTL updates
  useEffect(() => {
    const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    if (!langConfig) return;

    // Update document direction
    document.documentElement.dir = langConfig.dir;
    document.documentElement.lang = langConfig.code;

    // Update font family dynamically
    document.body.style.fontFamily = langConfig.font;

    // Load Noto fonts if needed
    if (langConfig.font.includes('Noto')) {
      const fontUrl = `https://fonts.googleapis.com/css2?family=${langConfig.font.replace(/"/g, '').replace(/ /g, '+')}:wght@400;500;700&display=swap`;
      const extantLink = document.getElementById('dynamic-font-link') as HTMLLinkElement;
      if (extantLink) {
        if (extantLink.href !== fontUrl) extantLink.href = fontUrl;
      } else {
        const link = document.createElement('link');
        link.id = 'dynamic-font-link';
        link.rel = 'stylesheet';
        link.href = fontUrl;
        document.head.appendChild(link);
      }
    }
  }, [currentLanguage]);

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback if widget hasn't loaded yet via cookie
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <div id="google_translate_element" className="hidden" style={{ display: 'none' }}></div>
      {children}
    </LanguageContext.Provider>
  );
}
