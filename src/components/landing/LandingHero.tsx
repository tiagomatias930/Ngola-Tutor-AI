import React, { useState } from 'react';
import { ChevronRight, Brain, Mic, BookOpen, Volume2, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { t } from '../../i18n';
import { LandingSectionProps, APPLE_PALETTE } from './types';

interface LandingHeroProps extends LandingSectionProps {
  onStartLearning: () => void;
  scrollToSection: (id: string) => void;
}

interface ProductFinish {
  id: string;
  name: string;
  hex: string;
  gradient?: string;
  accentText: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  lang, c, isDark, onStartLearning, scrollToSection
}) => {
  const finishes: ProductFinish[] = [
    { id: 'sky', name: 'Sky', hex: APPLE_PALETTE.sky, accentText: '#1d1d1f' },
    { id: 'citrus', name: 'Citrus', hex: APPLE_PALETTE.citrus, accentText: '#1d1d1f' },
    { id: 'starlight', name: 'Starlight', hex: APPLE_PALETTE.starlight, accentText: '#1d1d1f' },
    { id: 'silver', name: 'Silver', hex: APPLE_PALETTE.silver, accentText: '#1d1d1f' },
    { id: 'blush', name: 'Blush', hex: APPLE_PALETTE.blush, accentText: '#1d1d1f' },
    { id: 'indigo', name: 'Indigo', hex: APPLE_PALETTE.indigo, accentText: '#ffffff' },
    { id: 'midnight', name: 'Midnight', hex: APPLE_PALETTE.midnight, accentText: '#ffffff' },
  ];

  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(finishes[0]);

  return (
    <section
      id="home"
      style={{ background: isDark ? '#000000' : '#ffffff' }}
      className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* 1. "Nuevo" Badge — Inline text only, no background, #b64400 at 14px weight 500 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          
        </motion.div>

        {/* 2. Product Name — 17px SF Pro Text centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-3"
        >
          <span
            style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            className="text-[17px] font-normal tracking-[-0.022em]"
          >
            Ngola Tutor AI
          </span>
        </motion.div>

        {/* 3. Hero Headline — 80–96px SF Pro Display weight 700 with letter-spacing -1.44px */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-5 max-w-4xl mx-auto"
        >
          <h1
            style={{ color: isDark ? '#f5f5f7' : '#1d1d1f' }}
            className="font-display font-semibold sm:font-bold text-5xl sm:text-7xl lg:text-[92px] leading-[1.04] tracking-[-1.44px]"
          >
            {lang === 'pt' ? 'A mente que guia a sua.' : 'The mind that guides yours.'}
          </h1>
        </motion.div>

        {/* 4. Subtitle / Supporting paragraph at 21px SF Pro Text */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <p
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
            className="text-lg sm:text-[21px] leading-[1.38] tracking-[0.007em] font-normal"
          >
            {t(lang, 'heroDesc')}
          </p>
        </motion.div>

        {/* 5. CTAs — Single chromatic blue pill button & subtle link with arrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-4"
        >
          {/* Filled Pill Button — 980px radius, #0071e3, 17px SF Pro Text */}
          <button
            onClick={onStartLearning}
            className="apple-pill-btn"
          >
            <span>{t(lang, 'heroBtn1')}</span>
          </button>

          {/* Text Link with Arrow — 17px SF Pro Text in #0066cc */}
          <button
            onClick={() => scrollToSection('features')}
            className="apple-link"
          >
            <span>{t(lang, 'heroBtn2')}</span>
            <ChevronRight size={17} />
          </button>
        </motion.div>

        {/* Free educational mention / fine print line (14px) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ color: isDark ? '#86868b' : '#707070' }}
          className="text-xs sm:text-[14px] tracking-[-0.224px] mb-12"
        >
          {lang === 'pt' ? '100% Gratuito. Acessível por voz, visão e língua gestual.' : '100% Free. Accessible with voice, vision and sign language.'}
        </motion.p>

        {/* 6. Product Finish Swatch Selector (Sky, Citrus, Starlight, Silver, Blush, Indigo, Midnight) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span
            style={{ color: isDark ? '#a1a1a6' : '#707070' }}
            className="text-xs tracking-tight mr-2"
          >
            {lang === 'pt' ? 'Acabamento:' : 'Finish:'} <strong className="font-medium text-inherit">{selectedFinish.name}</strong>
          </span>
          {finishes.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFinish(f)}
              style={{
                backgroundColor: f.hex,
                outlineColor: selectedFinish.id === f.id ? (isDark ? '#2997ff' : '#0071e3') : 'transparent'
              }}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform duration-200 outline-2 outline-offset-2 cursor-pointer ${
                selectedFinish.id === f.id ? 'scale-115' : 'hover:scale-110 opacity-90'
              }`}
              title={f.name}
            />
          ))}
        </motion.div>

        {/* 7. Product Presentation Showcase — 28px border-radius, ZERO shadow, borderless */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-[1020px] mx-auto rounded-[28px] overflow-hidden transition-colors duration-500"
          style={{
            backgroundColor: isDark ? '#161617' : selectedFinish.hex,
            boxShadow: 'none',
          }}
        >
          <div className="pt-12 px-6 sm:px-12 pb-0 flex flex-col items-center">
            {/* Top Minimal Info Banner */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-normal">
              <span
                style={{ color: isDark ? '#f5f5f7' : selectedFinish.accentText }}
                className="inline-flex items-center gap-1.5 opacity-90"
              >
                <Mic size={14} /> {lang === 'pt' ? 'Voz Bidirecional' : 'Live Voice'}
              </span>
              <span
                style={{ color: isDark ? '#f5f5f7' : selectedFinish.accentText }}
                className="inline-flex items-center gap-1.5 opacity-90"
              >
                <Video size={14} /> {lang === 'pt' ? 'Visão Computacional' : 'Camera Vision'}
              </span>
              <span
                style={{ color: isDark ? '#f5f5f7' : selectedFinish.accentText }}
                className="inline-flex items-center gap-1.5 opacity-90"
              >
                <BookOpen size={14} /> {lang === 'pt' ? 'Quadro Interativo' : 'Whiteboard'}
              </span>
            </div>

            {/* Hardware / Screen Display Container with 28px top radii */}
            <div
              className="w-full max-w-[880px] rounded-t-[24px] overflow-hidden border-t border-x border-black/10 dark:border-white/10"
              style={{
                backgroundColor: isDark ? '#000000' : '#ffffff',
                boxShadow: 'none',
              }}
            >
              <img
                src="/Main.webp"
                alt="Ngola Tutor Interface"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

