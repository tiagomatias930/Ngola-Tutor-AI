import React from 'react';
import { CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

export const LandingCaseStudies: React.FC<LandingSectionProps> = ({ lang, isDark }) => {
  const stories = [
    {
      name: 'Tiago Matias',
      subject: 'Desenvolvimento Full Stack',
      improvement: '+85%',
      quote: lang === 'pt' ? 'O Ngola Tutor revolucionou a forma como compreendo algoritmos e arquitetura de software.' : 'Ngola Tutor revolutionized how I understand algorithms and software architecture.',
      avatar: 'https://avatars.githubusercontent.com/u/35434705'
    },
    {
      name: 'Tatiana',
      subject: 'Desenvolvimento Web',
      improvement: '+70%',
      quote: lang === 'pt' ? 'A paciência do tutor e o quadro interativo tornam conceitos difíceis super claros e visuais.' : 'The tutor’s patience and the interactive whiteboard make difficult concepts super clear and visual.',
      avatar: 'https://avatars.githubusercontent.com/u/78913806'
    },
    {
      name: 'Manuel',
      subject: 'Engenharia de Software',
      improvement: '+75%',
      quote: lang === 'pt' ? 'Com o suporte socrático aprendi a deduzir a resposta sozinho sem ficar dependente de soluções prontas.' : 'With the Socratic support I learned to deduce answers by myself without relying on ready-made solutions.',
      avatar: 'https://avatars.githubusercontent.com/u/45087017'
    },
    {
      name: 'Iacene',
      subject: 'Ciência da Computação',
      improvement: '+80%',
      quote: lang === 'pt' ? 'Os recursos de acessibilidade e o diálogo por voz colocam a plataforma em outro patamar de inclusão.' : 'The accessibility features and voice dialogue place the platform on another level of inclusion.',
      avatar: 'https://avatars.githubusercontent.com/u/52156325'
    },
  ];

  return (
    <section
      id="case-studies"
      style={{ background: isDark ? '#000000' : '#ffffff' }}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2
            className="font-display font-semibold text-3xl sm:text-4xl lg:text-[56px] leading-[1.07] tracking-[-0.28px] mb-4"
            style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
          >
            {t(lang, 'caseTitle')}
          </h2>
          <p
            className="text-base sm:text-[21px] leading-[1.38] tracking-[0.007em] max-w-2xl mx-auto font-normal"
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
          >
            {t(lang, 'caseSubtitle')}
          </p>
        </motion.div>

        {/* Stories Cards — 28px radius, #f5f5f7 canvas contrast, zero shadow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="apple-card-28 p-8 flex flex-col justify-between"
              style={{
                background: isDark ? '#161617' : '#f5f5f7',
                boxShadow: 'none',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <img
                    src={`${story.avatar}?s=96`}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full numr-data"
                    style={{
                      background: isDark ? '#2d2d2f' : '#e8e8ed',
                      color: isDark ? '#f5f5f7' : '#1d1d1f'
                    }}
                  >
                    {story.improvement}
                  </span>
                </div>

                <h3
                  className="font-display font-semibold text-lg tracking-tight mb-1"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  {story.name}
                </h3>
                <p
                  className="text-xs font-normal mb-5"
                  style={{ color: isDark ? '#86868b' : '#707070' }}
                >
                  {story.subject}
                </p>

                <p
                  className="text-sm sm:text-[17px] leading-[1.47] tracking-[-0.022em] font-normal text-left"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  "{story.quote}"
                </p>
              </div>

              <div className="flex items-center gap-1 mt-6 text-[#1d1d1f] dark:text-[#f5f5f7]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingAbout: React.FC<LandingSectionProps> = ({ lang, isDark }) => {
  return (
    <section
      id="about"
      style={{ background: isDark ? '#161617' : '#f5f5f7' }}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Text Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <h2
              className="font-display font-semibold text-3xl sm:text-4xl lg:text-[56px] leading-[1.07] tracking-[-0.28px]"
              style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            >
              {t(lang, 'aboutTitle')}
            </h2>

            <div
              className="space-y-4 text-base sm:text-[17px] leading-[1.47] tracking-[-0.022em] font-normal"
              style={{ color: isDark ? '#a1a1a6' : '#707070' }}
            >
              <p>{t(lang, 'aboutP1')}</p>
              <p>{t(lang, 'aboutP2')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[t(lang, 'aboutItem1'), t(lang, 'aboutItem2'), t(lang, 'aboutItem3'), t(lang, 'aboutItem4')].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="apple-card-28 p-5 flex items-start gap-3.5"
                  style={{
                    background: isDark ? '#1d1d1f' : '#ffffff',
                    boxShadow: 'none',
                  }}
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.5}
                    className="shrink-0 mt-0.5"
                    style={{ color: isDark ? '#2997ff' : '#0071e3' }}
                  />
                  <span
                    className="text-sm sm:text-[15px] font-normal leading-snug"
                    style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Right Column — 28px border-radius image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[28px] overflow-hidden">
              <img
                src="/aluno.jpg"
                alt="Educação inclusiva"
                className="w-full h-full object-cover rounded-[28px] block"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const LandingCTA: React.FC<LandingSectionProps & { onStartLearning: () => void }> = ({
  lang, isDark, onStartLearning
}) => {
  return (
    <section
      style={{ background: isDark ? '#000000' : '#ffffff' }}
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[800px] mx-auto space-y-6"
      >
        <h2
          className="font-display font-semibold sm:font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-[-1.2px]"
          style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
        >
          {t(lang, 'ctaTitle')}
        </h2>

        <p
          className="text-lg sm:text-[21px] leading-[1.38] tracking-[0.007em] font-normal max-w-2xl mx-auto"
          style={{ color: isDark ? '#a1a1a6' : '#707070' }}
        >
          {t(lang, 'ctaDesc')}
        </p>

        {/* Primary CTA button — 980px radius pill button, #0071e3 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartLearning}
            className="apple-pill-btn"
          >
            <span>{t(lang, 'ctaBtn')}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

