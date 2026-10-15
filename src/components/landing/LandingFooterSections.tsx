import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
} as const;

export const LandingCaseStudies: React.FC<LandingSectionProps> = ({ lang }) => {
  const pt = lang === 'pt';
  const stories = [
    { name: 'Tiago Matias', subject: 'Desenvolvimento Full Stack', improvement: '+85%',
      quote: pt ? 'O Ngola Tutor revolucionou a forma como compreendo algoritmos e arquitetura de software.' : 'Ngola Tutor revolutionized how I understand algorithms and software architecture.',
      avatar: 'https://avatars.githubusercontent.com/u/35434705' },
    { name: 'Tatiana', subject: 'Desenvolvimento Web', improvement: '+70%',
      quote: pt ? 'A paciência do tutor e o quadro interativo tornam conceitos difíceis super claros e visuais.' : 'The tutor’s patience and the interactive whiteboard make difficult concepts super clear and visual.',
      avatar: 'https://avatars.githubusercontent.com/u/78913806' },
    { name: 'Manuel', subject: 'Engenharia de Software', improvement: '+75%',
      quote: pt ? 'Com o suporte socrático aprendi a deduzir a resposta sozinho sem ficar dependente de soluções prontas.' : 'With the Socratic support I learned to deduce answers by myself without relying on ready-made solutions.',
      avatar: 'https://avatars.githubusercontent.com/u/45087017' },
    { name: 'Iacene', subject: 'Ciência da Computação', improvement: '+80%',
      quote: pt ? 'Os recursos de acessibilidade e o diálogo por voz colocam a plataforma em outro patamar de inclusão.' : 'The accessibility features and voice dialogue place the platform on another level of inclusion.',
      avatar: 'https://avatars.githubusercontent.com/u/52156325' },
  ];

  return (
    <section id="case-studies" className="sh-section">
      <div className="sh-wrap">
        <motion.div {...reveal} className="max-w-[720px] mb-10">
          <h2 className="sh-h2 mb-4">{t(lang, 'caseTitle')}</h2>
          <p className="sh-lead">{t(lang, 'caseSubtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stories.map((story, idx) => (
            <motion.figure key={story.name} {...reveal} transition={{ delay: idx * 0.05, duration: 0.45 }} className="sh-card m-0 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <img src={`${story.avatar}?s=96`} alt={story.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--sh-lilac)', color: '#292827' }}>
                  {story.improvement}
                </span>
              </div>
              <blockquote className="m-0 mb-5 flex-1 text-base leading-snug" style={{ color: 'var(--sh-text)' }}>“{story.quote}”</blockquote>
              <figcaption>
                <div className="font-semibold">{story.name}</div>
                <div className="text-sm" style={{ color: 'var(--sh-muted)' }}>{story.subject}</div>
                <div className="flex gap-0.5 mt-3" aria-hidden="true">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-current" />)}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Dark feature band: photo collage with translucent shapes on the left, copy on the right. */
export const LandingAbout: React.FC<LandingSectionProps> = ({ lang }) => {
  const items = [t(lang, 'aboutItem1'), t(lang, 'aboutItem2'), t(lang, 'aboutItem3'), t(lang, 'aboutItem4')];
  return (
    <section id="about" className="sh-lagoon sh-section">
      <div className="sh-wrap grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...reveal} className="sh-collage" aria-hidden="true">
          <img src="/landing/thinking.jpg" alt="" loading="lazy" />
          <span className="sh-rect" style={{ background: '#d4c7ff', width: '46%', height: '38%', left: '6%', top: '8%' }} />
          <span className="sh-rect" style={{ background: '#60a5fa', width: '34%', height: '30%', right: '8%', top: '22%' }} />
          <span className="sh-rect" style={{ background: '#f472b6', width: '40%', height: '26%', left: '22%', bottom: '8%' }} />
          <span className="sh-script" style={{ left: '8%', bottom: '18%' }}>
            {lang === 'pt' ? 'pensa comigo…' : 'think with me…'}
          </span>
        </motion.div>

        <motion.div {...reveal}>
          <h2 className="sh-display mb-6" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>{t(lang, 'aboutTitle')}</h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,.82)' }}>
            <p>{t(lang, 'aboutP1')}</p>
            <p>{t(lang, 'aboutP2')}</p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-8 p-0 list-none">
            {items.map(item => (
              <li key={item} className="flex gap-2 text-[15px]" style={{ color: 'rgba(255,255,255,.92)' }}>
                <span aria-hidden="true">—</span>{item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

/** Atmospheric gradient banner with the closing call to action. */
export const LandingCTA: React.FC<LandingSectionProps & { onStartLearning: () => void }> = ({ lang, onStartLearning }) => (
  <section className="sh-section">
    <div className="sh-wrap">
      <motion.div {...reveal} className="sh-gradient px-8 py-14 sm:px-14 sm:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-[640px]">
          <h2 className="sh-h2 mb-4">{t(lang, 'ctaTitle')}</h2>
          <p className="text-lg leading-relaxed" style={{ color: '#4a4846' }}>{t(lang, 'ctaDesc')}</p>
        </div>
        <button type="button" className="sh-btn shrink-0" style={{ background: '#421d24', color: '#fff' }} onClick={onStartLearning}>
          {t(lang, 'ctaBtn')} <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  </section>
);
