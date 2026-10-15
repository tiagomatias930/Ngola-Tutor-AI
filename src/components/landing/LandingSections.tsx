import React, { useState } from 'react';
import { Volume2, Video, Brain, BookOpen, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
} as const;

export const LandingFeatures: React.FC<LandingSectionProps> = ({ lang }) => {
  const features = [
    { Icon: Volume2, title: t(lang, 'feat1Title'), description: t(lang, 'feat1Desc') },
    { Icon: Video, title: t(lang, 'feat2Title'), description: t(lang, 'feat2Desc') },
    { Icon: Brain, title: t(lang, 'feat3Title'), description: t(lang, 'feat3Desc') },
    { Icon: BookOpen, title: t(lang, 'feat4Title'), description: t(lang, 'feat4Desc') },
    { Icon: TrendingUp, title: t(lang, 'feat5Title'), description: t(lang, 'feat5Desc') },
    { Icon: Globe, title: t(lang, 'feat6Title'), description: t(lang, 'feat6Desc') },
  ];
  const [active, setActive] = useState(0);
  const groups = [
    { label: lang === 'pt' ? 'Tudo' : 'All', indices: features.map((_, i) => i) },
    { label: lang === 'pt' ? 'Conversar' : 'Talk', indices: [0, 1] },
    { label: lang === 'pt' ? 'Aprender' : 'Learn', indices: [2, 3] },
    { label: lang === 'pt' ? 'Evoluir' : 'Grow', indices: [4, 5] },
  ];

  return (
    <section id="features" className="sh-section">
      <div className="sh-wrap">
        <motion.div {...reveal} className="max-w-[720px] mb-10">
          <h2 className="sh-h2 mb-4">{t(lang, 'featTitle1')} {t(lang, 'featTitle2')}</h2>
          <p className="sh-lead">{t(lang, 'featSubtitle')}</p>
        </motion.div>

        <div role="tablist" aria-label="Recursos" className="sh-tabs mb-8">
          {groups.map((group, i) => (
            <button key={group.label} role="tab" aria-selected={active === i} className="sh-tab" onClick={() => setActive(i)}>
              {group.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups[active].indices.map((index, order) => {
            const { Icon, title, description } = features[index];
            return (
              <motion.article
                key={`${active}-${index}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: order * 0.04 }}
                className="sh-card flex flex-col gap-3"
              >
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                <h3 className="sh-h3">{title}</h3>
                <p className="sh-body flex-1">{description}</p>
                <a className="sh-link" href="#how-it-works">{lang === 'pt' ? 'Saber mais' : 'Learn more'}</a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const LandingHowItWorks: React.FC<LandingSectionProps> = ({ lang }) => {
  const steps = [1, 2, 3, 4].map(n => ({
    number: `0${n}`,
    title: t(lang, `step${n}Title` as never),
    description: t(lang, `step${n}Desc` as never),
  }));

  return (
    <section id="how-it-works" className="sh-section" style={{ paddingTop: 0 }}>
      <div className="sh-wrap">
        <motion.div {...reveal} className="max-w-[720px] mb-10">
          <h2 className="sh-h2 mb-4">{t(lang, 'howTitle')}</h2>
          <p className="sh-lead">{t(lang, 'howSubtitle')}</p>
        </motion.div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
          {steps.map((step, idx) => (
            <motion.li key={step.number} {...reveal} transition={{ delay: idx * 0.06, duration: 0.45 }} className="sh-card">
              <span className="block text-sm font-semibold mb-8" style={{ color: 'var(--sh-violet)', fontVariantNumeric: 'tabular-nums' }}>
                {step.number}
              </span>
              <h3 className="sh-h3 mb-2">{step.title}</h3>
              <p className="sh-body">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
