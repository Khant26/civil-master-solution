import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' }
  ];

  const currentLangData = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        <span className="text-lg">{currentLangData?.flag}</span>
        <span className="text-white font-medium">{currentLangData?.name}</span>
        <svg
          className={`w-4 h-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-600 min-w-[120px] z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-700 transition-colors first:rounded-t-md last:rounded-b-md ${
                currentLanguage === language.code ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-white">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;