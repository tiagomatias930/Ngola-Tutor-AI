import React, { useState, useEffect } from 'react';
import { type Lang } from './i18n';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { LandingHero } from './components/landing/LandingHero';
import { LandingFeatures, LandingHowItWorks } from './components/landing/LandingSections';
import { LandingCaseStudies, LandingAbout, LandingCTA } from './components/landing/LandingFooterSections';
import { LandingTrust, LandingFAQ } from './components/landing/LandingTrustFAQ';
import { useTheme } from './contexts/ThemeContext';
import { ShieldCheck } from 'lucide-react';
import { TermsAndPrivacyModal } from './components/legal/TermsAndPrivacyModal';
import './components/landing/landing.css';
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
    <div className="sh-landing w-full min-h-screen" data-theme={isDark ? 'dark' : 'light'}>
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

      <footer className="sh-footer">
        <div className="sh-wrap py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logoGT.png" alt="" className="w-6 h-6 object-contain" />
                <span className="font-semibold text-[17px]">Ngola Tutor AI</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.7)' }}>
                {lang === 'pt' ? 'Educação e inclusão digital com tutoria socrática por IA.' : 'Education and digital inclusion with Socratic AI tutoring.'}
              </p>
            </div>
            <div>
              <h4>{lang === 'pt' ? 'Produto' : 'Product'}</h4>
              <ul className="space-y-3 p-0 list-none">
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('home')}>{lang === 'pt' ? 'Início' : 'Home'}</button></li>
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('features')}>{lang === 'pt' ? 'Recursos' : 'Features'}</button></li>
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('how-it-works')}>{lang === 'pt' ? 'Como funciona' : 'How it works'}</button></li>
              </ul>
            </div>
            <div>
              <h4>{lang === 'pt' ? 'Comunidade' : 'Community'}</h4>
              <ul className="space-y-3 p-0 list-none">
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('case-studies')}>{lang === 'pt' ? 'Histórias' : 'Stories'}</button></li>
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('about')}>{lang === 'pt' ? 'Sobre' : 'About'}</button></li>
                <li><button type="button" className="sh-ghost" onClick={() => scrollToSection('faq')}>FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul className="space-y-3 p-0 list-none">
                <li>
                  <button type="button" className="sh-ghost inline-flex items-center gap-1.5" onClick={() => setShowTermsModal(true)}>
                    <ShieldCheck size={14} /> {lang === 'pt' ? 'Termos e Privacidade' : 'Terms & Privacy'}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 text-xs leading-relaxed space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.6)' }}>
            <p>1. O Ngola Tutor utiliza modelos de inteligência artificial multimodal para fornecer tutoria socrática adaptativa. As respostas são geradas com salvaguardas pedagógicas e éticas estritas.</p>
            <p>2. As funcionalidades de visão computacional, audiodescrição e intérprete de Libras foram concebidas com foco em inclusão e acessibilidade universal (WCAG 2.1 AA).</p>
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

