import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon, Globe, ArrowUpRight } from 'lucide-react';
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
  lang, isDark, activeNav, mobileMenuOpen,
  setMobileMenuOpen, setLang, setTheme, scrollToSection, onStartLearning,
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t(lang, 'navHome') },
    { id: 'features', label: t(lang, 'navFeatures') },
    { id: 'case-studies', label: t(lang, 'navCaseStudies') },
    { id: 'about', label: t(lang, 'navAbout') },
    { id: 'faq', label: 'FAQ' },
  ];
  // Over the photographic hero the header text must be light.
  const onPhoto = !scrolled && !mobileMenuOpen;
  const ink = onPhoto ? '#ffffff' : 'var(--sh-text)';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="sh-banner">
        <div className="sh-wrap flex items-center justify-center gap-3 py-2.5 text-center">
          <span>
            {lang === 'pt'
              ? '100% gratuito · acessível por voz, visão e língua gestual'
              : '100% free · accessible with voice, vision and sign language'}
          </span>
          <button type="button" className="sh-ghost hidden sm:inline-flex items-center gap-1 underline" onClick={onStartLearning}>
            {lang === 'pt' ? 'Experimentar' : 'Try it'} <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      <nav className="sh-header" data-scrolled={scrolled || mobileMenuOpen} aria-label="Principal">
        <div className="sh-wrap flex items-center justify-between h-16">
          <button type="button" onClick={() => scrollToSection('home')} className="sh-ghost flex items-center gap-2" style={{ color: ink }}>
            <img src="/logoGT.png" alt="" className="w-6 h-6 object-contain" />
            <span className="text-[17px] font-semibold tracking-tight">Ngola Tutor</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="sh-ghost text-base"
                style={{ color: ink, opacity: activeNav === item.id ? 1 : 0.8 }}
                aria-current={activeNav === item.id ? 'true' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3" style={{ color: ink }}>
            <button type="button" className="sh-ghost flex items-center gap-1.5 text-sm" onClick={() => setLang(lang === 'en' ? 'pt' : 'en')} title="Mudar idioma">
              <Globe size={16} /> {lang === 'en' ? 'EN' : 'PT'}
            </button>
            <button type="button" className="sh-ghost p-1" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label={isDark ? 'Modo claro' : 'Modo escuro'}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button type="button" className="sh-btn sh-btn-lilac" onClick={onStartLearning}>
              {t(lang, 'navGetStarted')}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2" style={{ color: ink }}>
            <button type="button" className="sh-ghost text-sm px-1" onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>{lang.toUpperCase()}</button>
            <button type="button" className="sh-ghost p-1" onClick={() => setTheme(isDark ? 'light' : 'dark')} aria-label="Tema">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button type="button" className="sh-ghost p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden" style={{ background: 'var(--sh-canvas)', borderBottom: '1px solid var(--sh-border)' }}>
            <div className="sh-wrap py-5 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="sh-ghost block w-full text-left text-lg py-2.5"
                  style={{ color: 'var(--sh-text)' }}
                >
                  {item.label}
                </button>
              ))}
              <button type="button" className="sh-btn w-full mt-3" onClick={onStartLearning}>{t(lang, 'navGetStarted')}</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
