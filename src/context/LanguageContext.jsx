import React, { createContext, useContext, useState, useEffect } from 'react';

// Import translation files
import enTranslations from '../locales/en.json';
import thTranslations from '../locales/th.json';

const translations = {
  en: enTranslations,
  th: thTranslations
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to English if key not found in current language
        translation = translations['en'];
        for (const k of keys) {
          if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k];
          } else {
            return fallback || key;
          }
        }
        break;
      }
    }
    
    return typeof translation === 'string' ? translation : fallback || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;