import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ShieldCheck, Accessibility, Brain, Eye } from 'lucide-react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

export const LandingTrust: React.FC<LandingSectionProps> = ({ isDark }) => {
  const highlights = [
    { icon: Brain, label: 'Google Gemini', tag: 'IA Multimodal Socrática' },
    { icon: Accessibility, label: 'Avatar em Língua Gestual', tag: 'Acessibilidade Surdos' },
    { icon: Eye, label: 'Audiodescrição em Tempo Real', tag: 'Acessibilidade Cegos' },
    { icon: ShieldCheck, label: 'Guardrails Éticos', tag: 'Conformidade & Segurança' }
  ];

  return (
    <section
      style={{ background: isDark ? '#161617' : '#f5f5f7' }}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="apple-card-28 p-6 flex flex-col justify-between transition-transform duration-200"
              style={{
                background: isDark ? '#1d1d1f' : '#ffffff',
                boxShadow: 'none',
              }}
            >
              <div className="mb-4">
                <item.icon
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                />
              </div>
              <div>
                <p
                  className="font-display font-semibold text-sm sm:text-base tracking-tight leading-snug mb-1"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  {item.label}
                </p>
                <span
                  className="text-xs font-normal"
                  style={{ color: isDark ? '#a1a1a6' : '#707070' }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const LandingFAQ: React.FC<LandingSectionProps> = ({ lang, isDark }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t(lang, 'faq1Q'), a: t(lang, 'faq1A') },
    { q: t(lang, 'faq2Q'), a: t(lang, 'faq2A') },
    { q: t(lang, 'faq3Q'), a: t(lang, 'faq3A') },
    { q: t(lang, 'faq4Q'), a: t(lang, 'faq4A') },
  ];

  return (
    <section
      id="faq"
      style={{ background: isDark ? '#000000' : '#ffffff' }}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-[840px] mx-auto">

        {/* Section Header — 40–56px SF Pro Display weight 600 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="font-display font-semibold text-3xl sm:text-4xl lg:text-[48px] leading-[1.14] tracking-[0.007em] mb-4"
            style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
          >
            {t(lang, 'faqTitle')}
          </h2>
          <p
            className="text-base sm:text-[17px] leading-[1.47] tracking-[-0.022em] max-w-xl mx-auto font-normal"
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
          >
            {t(lang, 'faqSubtitle')}
          </p>
        </motion.div>

        {/* FAQ Accordion Items — 28px radius, borderless, zero shadow */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="apple-card-28 overflow-hidden transition-colors duration-200"
              style={{
                background: isDark ? '#161617' : '#f5f5f7',
                boxShadow: 'none',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 sm:p-7 flex justify-between items-center text-left gap-4 cursor-pointer"
              >
                <span
                  className="font-display font-semibold text-base sm:text-[19px] tracking-tight leading-snug"
                  style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
                >
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: isDark ? '#2d2d2f' : '#e8e8ed',
                    color: isDark ? '#f5f5f7' : '#1d1d1f'
                  }}
                >
                  {openIndex === i ? (
                    <Minus size={15} strokeWidth={2} />
                  ) : (
                    <Plus size={15} strokeWidth={2} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <div
                      className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm sm:text-[17px] leading-[1.47] tracking-[-0.022em] font-normal"
                      style={{ color: isDark ? '#a1a1a6' : '#707070' }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

