import React from 'react';
import { ArrowRight, Mic, Hand, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

interface LandingHeroProps extends LandingSectionProps {
  onStartLearning: () => void;
  scrollToSection: (id: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ lang, onStartLearning, scrollToSection }) => {
  const pt = lang === 'pt';
  return (
    <section id="home" className="sh-hero" style={{ paddingTop: 104 }}>
      <img src="/landing/hero.jpg" alt="" className="sh-hero-img" fetchPriority="high" />

      {/* Floating product cards composited over the photograph */}
      <motion.div
        className="sh-glass sh-float" style={{ left: '4%', top: '34%' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-2 text-sm font-semibold"><Mic size={16} /> {pt ? 'Voz ao vivo' : 'Live voice'}</div>
        <p className="text-sm leading-snug" style={{ color: '#4a4846' }}>
          {pt ? '“O que já sabes sobre fotossíntese?”' : '“What do you already know about photosynthesis?”'}
        </p>
      </motion.div>
      <motion.div
        className="sh-glass sh-float" style={{ right: '4%', top: '28%' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-2 text-sm font-semibold"><Hand size={16} /> {pt ? 'Intérprete de Libras' : 'Sign interpreter'}</div>
        <p className="text-sm leading-snug" style={{ color: '#4a4846' }}>
          {pt ? 'Respostas soletradas em tempo real para estudantes surdos.' : 'Answers fingerspelled in real time for deaf students.'}
        </p>
      </motion.div>
      <motion.div
        className="sh-glass sh-float" style={{ right: '9%', bottom: '12%' }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 text-sm font-semibold"><BookOpen size={16} /> {pt ? 'Quadro interativo' : 'Interactive whiteboard'}</div>
      </motion.div>

      <div className="sh-wrap text-center py-16">
        <motion.p className="sh-eyebrow mb-5" style={{ color: 'rgba(255,255,255,.85)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Ngola Tutor AI
        </motion.p>
        <motion.h1 className="sh-display max-w-[860px] mx-auto"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {pt ? 'A mente que guia a sua.' : 'The mind that guides yours.'}
        </motion.h1>
        <motion.p className="max-w-[600px] mx-auto mt-6 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,.88)' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {t(lang, 'heroDesc')}
        </motion.p>
        <motion.div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <button type="button" className="sh-btn" style={{ background: '#421d24', color: '#fff' }} onClick={onStartLearning}>
            {t(lang, 'heroBtn1')} <ArrowRight size={18} />
          </button>
          <button type="button" className="sh-ghost underline underline-offset-4" style={{ color: '#fff' }} onClick={() => scrollToSection('features')}>
            {t(lang, 'heroBtn2')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
