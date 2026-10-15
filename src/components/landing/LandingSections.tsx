import React from 'react';
import { Volume2, Video, Brain, BookOpen, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

export const LandingFeatures: React.FC<LandingSectionProps> = ({ lang, isDark }) => {
  const features = [
    {
      Icon: Volume2,
      title: t(lang, 'feat1Title'),
      description: t(lang, 'feat1Desc'),
    },
    {
      Icon: Video,
      title: t(lang, 'feat2Title'),
      description: t(lang, 'feat2Desc'),
    },
    {
      Icon: Brain,
      title: t(lang, 'feat3Title'),
      description: t(lang, 'feat3Desc'),
    },
    {
      Icon: BookOpen,
      title: t(lang, 'feat4Title'),
      description: t(lang, 'feat4Desc'),
    },
    {
      Icon: TrendingUp,
      title: t(lang, 'feat5Title'),
      description: t(lang, 'feat5Desc'),
    },
    {
      Icon: Globe,
      title: t(lang, 'feat6Title'),
      description: t(lang, 'feat6Desc'),
    },
  ];

  return (
    <section
      id="features"
      style={{ background: isDark ? '#000000' : '#ffffff' }}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Section Header — 40–56px SF Pro Display weight 600 */}
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
            {t(lang, 'featTitle1')} {t(lang, 'featTitle2')}
          </h2>
          <p
            className="text-base sm:text-[21px] leading-[1.38] tracking-[0.007em] max-w-2xl mx-auto font-normal"
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
          >
            {t(lang, 'featSubtitle')}
          </p>
        </motion.div>

        {/* Feature Cards — 28px border-radius, background #f5f5f7, zero shadow, no border */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="apple-card-28 p-8 sm:p-10 flex flex-col justify-between"
              style={{
                background: isDark ? '#161617' : '#f5f5f7',
                boxShadow: 'none',
              }}
            >
              <div>
                <div className="mb-6">
                  <feature.Icon
                    size={32}
                    strokeWidth={1.5}
                    style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                  />
                </div>

                <h3
                  className="font-display font-semibold text-xl sm:text-[24px] tracking-tight mb-3 leading-snug"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-base sm:text-[17px] leading-[1.47] tracking-[-0.022em] font-normal text-left"
                  style={{ color: isDark ? '#a1a1a6' : '#707070' }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingHowItWorks: React.FC<LandingSectionProps> = ({ lang, isDark }) => {
  const steps = [
    { number: '01', title: t(lang, 'step1Title'), description: t(lang, 'step1Desc') },
    { number: '02', title: t(lang, 'step2Title'), description: t(lang, 'step2Desc') },
    { number: '03', title: t(lang, 'step3Title'), description: t(lang, 'step3Desc') },
    { number: '04', title: t(lang, 'step4Title'), description: t(lang, 'step4Desc') },
  ];

  return (
    <section
      id="how-it-works"
      style={{ background: isDark ? '#161617' : '#f5f5f7' }}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
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
            {t(lang, 'howTitle')}
          </h2>
          <p
            className="text-base sm:text-[21px] leading-[1.38] tracking-[0.007em] max-w-2xl mx-auto font-normal"
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
          >
            {t(lang, 'howSubtitle')}
          </p>
        </motion.div>

        {/* Step Cards — 28px radius, white surface, zero shadow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.4 }}
              className="apple-card-28 p-8 sm:p-9 text-left flex flex-col justify-between"
              style={{
                background: isDark ? '#1d1d1f' : '#ffffff',
                boxShadow: 'none',
              }}
            >
              <div>
                <span
                  className="block font-display font-semibold text-3xl sm:text-4xl mb-6 numr-data"
                  style={{ color: isDark ? '#86868b' : '#707070' }}
                >
                  {step.number}
                </span>

                <h3
                  className="font-display font-semibold text-lg sm:text-[21px] mb-2 tracking-tight leading-snug"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-sm sm:text-[17px] leading-[1.47] tracking-[-0.022em] font-normal"
                  style={{ color: isDark ? '#a1a1a6' : '#707070' }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

