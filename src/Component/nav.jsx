import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Nav = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path ||
    (path === '/home' && location.pathname === '/');

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="CMS Logo"
            className="h-10 sm:h-12 md:h-14"
          />
        </Link>
      </div>

      {/* sm: MENU dropdown */}
      <div className="sm:flex md:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="uppercase text-xs sm:text-sm font-medium">Menu</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded shadow-lg py-2 z-50">
            <Link
              to="/home"
              className={`block px-4 py-2 text-xs sm:text-sm uppercase tracking-wide ${
                isActive('/home')
                  ? 'text-cyan-400'
                  : 'text-white hover:bg-gray-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/product"
              className={`block px-4 py-2 text-xs sm:text-sm uppercase tracking-wide ${
                isActive('/product')
                  ? 'text-cyan-400'
                  : 'text-white hover:bg-gray-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.product')}
            </Link>
            <Link
              to="/projects-reference"
              className={`block px-4 py-2 text-xs sm:text-sm uppercase tracking-wide ${
                isActive('/projects-reference')
                  ? 'text-cyan-400'
                  : 'text-white hover:bg-gray-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.projectsReference')}
            </Link>
            <Link
              to="/news-article"
              className={`block px-4 py-2 text-xs sm:text-sm uppercase tracking-wide ${
                isActive('/news-article')
                  ? 'text-cyan-400'
                  : 'text-white hover:bg-gray-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.newsAndArticles')}
            </Link>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>

      {/* md+: Original horizontal nav */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/home"
          className={`text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-medium transition-colors uppercase tracking-wide ${
            isActive('/home')
              ? 'text-cyan-400'
              : 'text-white hover:text-cyan-400'
          }`}
        >
          {t('nav.home').toUpperCase()}
        </Link>
        <Link
          to="/product"
          className={`text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-medium transition-colors uppercase tracking-wide ${
            isActive('/product')
              ? 'text-cyan-400'
              : 'text-white hover:text-cyan-400'
          }`}
        >
          {t('nav.product').toUpperCase()}
        </Link>
        <Link
          to="/projects-reference"
          className={`text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-medium transition-colors uppercase tracking-wide ${
            isActive('/projects-reference')
              ? 'text-cyan-400'
              : 'text-white hover:text-cyan-400'
          }`}
        >
          {t('nav.projectsReference').toUpperCase()}
        </Link>
        <Link
          to="/news-article"
          className={`text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl font-medium transition-colors uppercase tracking-wide ${
            isActive('/news-article')
              ? 'text-cyan-400'
              : 'text-white hover:text-cyan-400'
          }`}
        >
          {t('nav.newsAndArticles').toUpperCase()}
        </Link>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Nav;