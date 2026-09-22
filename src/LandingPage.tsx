import React, { useState, useEffect } from 'react';
import { type Lang } from './i18n';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { LandingFeatures, LandingHowItWorks } from './components/landing/LandingSections';
import { LandingCaseStudies, LandingAbout, LandingCTA } from './components/landing/LandingFooterSections';
import { LandingTrust, LandingFAQ } from './components/landing/LandingTrustFAQ';
import { useTheme } from './contexts/ThemeContext';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { TermsAndPrivacyModal } from './components/legal/TermsAndPrivacyModal';
import { getConsentPreferences, startTelemetryHeartbeat } from './utils/telemetryClient';

interface LandingPageProps {
  onStartLearning: () => void;
}

export function LandingPage({ onStartLearning }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const { theme, c, isDark, toggleTheme } = useTheme();
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lp_lang') as Lang) || 'en');

  const [showTermsModal, setShowTermsModal] = useState(() => !getConsentPreferences().acceptedTerms);

  useEffect(() => { localStorage.setItem('lp_lang', lang); }, [lang]);

  useEffect(() => {
    const cleanup = startTelemetryHeartbeat();
    return () => cleanup();
  }, []);

  const setTheme = () => toggleTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveNav(id);
    setMobileMenuOpen(false);
  };

  const commonProps = { lang, theme, c, isDark };

  return (
    <div style={{ background: c.bg, color: c.text, transition: 'background 0.3s, color 0.3s' }} className="w-full min-h-screen">
      <LandingNavbar
        {...commonProps}
        activeNav={activeNav}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setLang={setLang}
        setTheme={setTheme}
        scrollToSection={scrollToSection}
        onStartLearning={onStartLearning}
      />

      <main>
        <LandingHero
          {...commonProps}
          onStartLearning={onStartLearning}
          scrollToSection={scrollToSection}
        />

        <LandingTrust {...commonProps} />

        <LandingFeatures {...commonProps} />

        <LandingHowItWorks {...commonProps} />

        <LandingCaseStudies {...commonProps} />

        <LandingAbout {...commonProps} />

        <LandingFAQ {...commonProps} />

        <LandingCTA
          {...commonProps}
          onStartLearning={onStartLearning}
        />
      </main>

      {/* Apple Footer Legal Block (from SKILL.md) */}
      <footer
        className="py-12 px-4 sm:px-6 lg:px-8 border-t"
        style={{
          background: isDark ? '#161617' : '#f5f5f7',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#d6d6d6'
        }}
      >
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Fine print notes */}
          <div
            className="text-xs leading-[1.33] space-y-2 border-b pb-6"
            style={{
              color: isDark ? '#86868b' : '#707070',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e8e8ed'
            }}
          >
            <p>
              1. O Ngola Tutor utiliza modelos de inteligência artificial multimodal para fornecer tutoria socrática adaptativa. As respostas são geradas com salvaguardas pedagógicas e éticas estritas.
            </p>
            <p>
              2. As funcionalidades de visão computacional, audiodescrição e avatar em língua gestual foram concebidas com foco em inclusão e acessibilidade universal (WCAG 2.1 AA).
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm" style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}>
                Ngola Tutor AI
              </span>
              <span style={{ color: isDark ? '#86868b' : '#707070' }}>— Educação e Inclusão Digital</span>
            </div>

            <div className="flex flex-wrap items-center gap-6" style={{ color: isDark ? '#86868b' : '#707070' }}>
              <button
                onClick={() => setShowTermsModal(true)}
                className="text-[#0066cc] dark:text-[#2997ff] hover:underline font-normal flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck size={13} />
                <span>Termos e Privacidade</span>
              </button>
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="hover:underline cursor-pointer"
              >
                Início
              </a>
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                className="hover:underline cursor-pointer"
              >
                Recursos
              </a>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                className="hover:underline cursor-pointer"
              >
                FAQ
              </a>
            </div>
          </div>

          <div
            className="text-[12px] leading-[1.33] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2"
            style={{ color: isDark ? '#86868b' : '#707070' }}
          >
          </div>
        </div>
      </footer>

      {/* Terms, Telemetry Notice & Cache Permission Modal */}
      <TermsAndPrivacyModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
}

