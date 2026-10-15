import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ShieldCheck, Accessibility, Brain, Eye } from 'lucide-react';
import { t } from '../../i18n';
import { LandingSectionProps } from './types';

export const LandingTrust: React.FC<LandingSectionProps> = () => {
  const highlights = [
    { icon: Brain, label: 'Google Gemini', tag: 'IA Multimodal Socrática' },
    { icon: Accessibility, label: 'Intérprete de Libras', tag: 'Acessibilidade Surdos' },
    { icon: Eye, label: 'Audiodescrição em Tempo Real', tag: 'Acessibilidade Cegos' },
    { icon: ShieldCheck, label: 'Guardrails Éticos', tag: 'Conformidade & Segurança' },
  ];

  return (
    <section className="sh-wrap" style={{ paddingBlock: 48 }}>
      <div className="sh-trust">
        {highlights.map(item => (
          <div key={item.label}>
            <item.icon size={20} strokeWidth={1.6} className="mb-4" aria-hidden="true" />
            <p className="font-semibold text-[15px] leading-snug mb-1">{item.label}</p>
            <span className="text-sm" style={{ color: 'var(--sh-muted)' }}>{item.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const LandingFAQ: React.FC<LandingSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [1, 2, 3, 4].map(n => ({ q: t(lang, `faq${n}Q` as never), a: t(lang, `faq${n}A` as never) }));

  return (
    <section id="faq" className="sh-section" style={{ paddingTop: 0 }}>
      <div className="sh-wrap grid lg:grid-cols-[1fr_1.6fr] gap-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="sh-h2 mb-4">{t(lang, 'faqTitle')}</h2>
          <p className="sh-lead">{t(lang, 'faqSubtitle')}</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="sh-card" style={{ padding: 0 }}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                className="sh-ghost w-full flex justify-between items-center text-left gap-4 p-5"
                style={{ textDecoration: 'none' }}
              >
                <span className="sh-h3">{faq.q}</span>
                <span className="shrink-0" aria-hidden="true">{openIndex === i ? <Minus size={18} /> : <Plus size={18} />}</span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="sh-body px-5 pb-5 m-0">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
