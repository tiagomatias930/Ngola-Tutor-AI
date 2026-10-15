import React from 'react';
import { Menu, X, Sun, Moon, ArrowRight, Globe, ChevronRight } from 'lucide-react';
import { t, type Lang } from '../../i18n';
import { ThemeColors, Theme } from './types';

interface LandingNavbarProps {
  lang: Lang;
  theme: Theme;
  c: ThemeColors;
  isDark: boolean;
  activeNav: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  scrollToSection: (id: string) => void;
  onStartLearning: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  lang, theme, c, isDark, activeNav, mobileMenuOpen,
  setMobileMenuOpen, setLang, setTheme, scrollToSection, onStartLearning
}) => {
  const navItems = [
    { id: 'home', label: t(lang, 'navHome') },
    { id: 'features', label: t(lang, 'navFeatures') },
    { id: 'case-studies', label: t(lang, 'navCaseStudies') },
    { id: 'about', label: t(lang, 'navAbout') },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">     

      {/* Global Navigation Bar — Exact 44px Apple sticky bar */}
      <nav
        style={{
          height: '44px',
          background: isDark ? 'rgba(0, 0, 0, 0.82)' : 'rgba(255, 255, 255, 0.82)',
          borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : '#d6d6d6'}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        className="w-full flex items-center transition-colors duration-200"
      >
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">

          {/* Logo & Brand */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img src="/logoGT.png" alt="logo" className="w-full h-full object-contain" />
            </div>
            <span
              className="font-display font-semibold text-sm tracking-tight"
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            >
              Ngola Tutor
            </span>
          </div>

          {/* Desktop Links (12px SF Pro Text weight 400, color #1d1d1f or muted) */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  color: activeNav === item.id
                    ? (isDark ? '#ffffff' : '#1d1d1f')
                    : (isDark ? '#a1a1a6' : '#707070')
                }}
                className="text-xs font-normal tracking-tight hover:text-[#0071e3] transition-colors py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Utilities */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
              style={{
                color: isDark ? '#f5f5f7' : '#1d1d1f',
              }}
              className="text-xs font-normal px-2.5 py-1 rounded-[999px] hover:bg-[#e8e8ed] dark:hover:bg-[#2d2d2f] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Mudar idioma"
            >
              <Globe size={13} className="text-[#707070]" />
              <span>{lang === 'en' ? 'EN' : 'PT'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
              className="p-1.5 rounded-[999px] hover:bg-[#e8e8ed] dark:hover:bg-[#2d2d2f] transition-colors cursor-pointer"
              title={isDark ? "Modo Claro" : "Modo Escuro"}
            >
              {isDark ? <Sun size={14} className="text-[#f5f5f7]" /> : <Moon size={14} className="text-[#1d1d1f]" />}
            </button>

            {/* Filled Pill Button (Primary CTA) — 980px radius, #0071e3, white text */}
            <button
              onClick={onStartLearning}
              className="apple-pill-btn-sm cursor-pointer"
            >
              <span>{t(lang, 'navGetStarted')}</span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
              className="px-2 py-1 text-xs font-normal"
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1.5"
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5"
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: isDark ? '#000000' : '#ffffff',
              borderBottom: `1px solid ${isDark ? '#2d2d2f' : '#d6d6d6'}`
            }}
            className="md:hidden absolute top-[44px] left-0 right-0 py-6 px-6 space-y-4 shadow-lg animate-in fade-in"
          >
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{ color: activeNav === item.id ? '#0071e3' : (isDark ? '#f5f5f7' : '#1d1d1f') }}
                className="block w-full text-left text-base font-normal py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={onStartLearning}
                className="apple-pill-btn w-full justify-center"
              >
                <span>{t(lang, 'navGetStarted')}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

