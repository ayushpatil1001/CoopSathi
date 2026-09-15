import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode } from '../types';
import { getTranslation, SUPPORTED_LANGUAGES } from '../data/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_language') as LanguageCode;
      if (saved && ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn'].includes(saved)) {
        return saved;
      }
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLangState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_language', lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const res = getTranslation(language, key);
    if (res === key && defaultText) {
      return defaultText;
    }
    return res;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
