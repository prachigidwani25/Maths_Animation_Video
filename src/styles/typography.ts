import { CSSProperties } from 'react';

export const FONTS = {
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, Monaco, monospace",
};

export const TYPOGRAPHY: Record<string, CSSProperties> = {
  hero: {
    fontFamily: FONTS.sans,
    fontSize: 104,
    fontWeight: 900,
    letterSpacing: '-0.04em',
    lineHeight: 1.05,
    textTransform: 'uppercase',
  },
  titleScene: {
    fontFamily: FONTS.sans,
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
  },
  titleSection: {
    fontFamily: FONTS.sans,
    fontSize: 34,
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  sectionNumber: {
    fontFamily: FONTS.mono,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  equation: {
    fontFamily: FONTS.sans,
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    fontVariantNumeric: 'tabular-nums',
  },
  matrixCell: {
    fontFamily: FONTS.sans,
    fontSize: 38,
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'center',
  },
  operationLabel: {
    fontFamily: FONTS.mono,
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: '0.04em',
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.5,
  },
  dialogue: {
    fontFamily: FONTS.sans,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.45,
  },
  dialogueSpeaker: {
    fontFamily: FONTS.mono,
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  meta: {
    fontFamily: FONTS.mono,
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  annotation: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.4,
  },
};
