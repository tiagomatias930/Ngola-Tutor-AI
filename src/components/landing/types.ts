import { type Lang } from '../../i18n';

export type Theme = 'light' | 'dark';

export const APPLE_PALETTE = {
  primaryInk: '#1d1d1f',
  primaryInkGradient: 'linear-gradient(184deg, #1d1d1f 20%, #0000f9 76%, #252525 95%)',
  midGray: '#707070',
  deepGray: '#474747',
  hairline: '#d6d6d6',
  canvas: '#f5f5f7',
  paper: '#ffffff',
  coolWash: '#e8e8ed',
  fadedSurface: '#fafafc',
  quietDot: '#777779',
  electricBlue: '#0071e3',
  linkBlue: '#0066cc',
  ember: '#b64400',
  // Product finishes
  sky: '#c8d8e0',
  citrus: '#dddc8c',
  starlight: '#f0e4d3',
  silver: '#e3e4e5',
  blush: '#e8d0d0',
  indigo: '#596680',
  midnight: '#2e3642',
  citrusGradient: 'linear-gradient(184deg, #1d1d1f 0%, #dfe74f 33%, #5a7e2 100%)',
};

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  bgCard: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  borderHover: string;
  accent: string;
  accentHover: string;
  navBg: string;
  heroBadgeBg: string;
  heroBadgeText: string;
  cardShadow: string;
  featureBg: string;
  featureIconBg: string;
  stepBorder: string;
  caseBg: string;
  caseCardBg: string;
  ctaOverlay: string;
}

export const lightTheme: ThemeColors = {
  bg: '#ffffff',
  bgAlt: '#f5f5f7',
  bgCard: '#ffffff',
  text: '#1d1d1f',
  textMuted: '#707070',
  textSubtle: '#474747',
  border: '#d6d6d6',
  borderHover: '#0071e3',
  accent: '#0071e3',
  accentHover: '#0077ed',
  navBg: 'rgba(255, 255, 255, 0.82)',
  heroBadgeBg: 'transparent',
  heroBadgeText: '#b64400',
  cardShadow: 'none',
  featureBg: '#f5f5f7',
  featureIconBg: '#e8e8ed',
  stepBorder: 'transparent',
  caseBg: '#ffffff',
  caseCardBg: '#f5f5f7',
  ctaOverlay: 'rgba(29, 29, 31, 0.45)',
};

export const darkTheme: ThemeColors = {
  bg: '#000000',
  bgAlt: '#161617',
  bgCard: '#1d1d1f',
  text: '#f5f5f7',
  textMuted: '#a1a1a6',
  textSubtle: '#86868b',
  border: 'rgba(255, 255, 255, 0.12)',
  borderHover: '#2997ff',
  accent: '#0071e3',
  accentHover: '#0077ed',
  navBg: 'rgba(0, 0, 0, 0.82)',
  heroBadgeBg: 'transparent',
  heroBadgeText: '#ff6934',
  cardShadow: 'none',
  featureBg: '#161617',
  featureIconBg: '#2d2d2f',
  stepBorder: 'transparent',
  caseBg: '#000000',
  caseCardBg: '#1d1d1f',
  ctaOverlay: 'rgba(0, 0, 0, 0.6)',
};

export interface LandingSectionProps {
  lang: Lang;
  theme: Theme;
  c: ThemeColors;
  isDark: boolean;
}

