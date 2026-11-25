import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS, TYPOGRAPHY } from '../styles/typography';

interface EquationCardProps {
  eqNumber: number;
  equationText: string;
  delay?: number;
  active?: boolean;
  theme?: 'blue' | 'light';
  subText?: string;
  width?: number;
}

export const EquationCard: React.FC<EquationCardProps> = ({
  eqNumber,
  equationText,
  delay = 0,
  active = false,
  subText,
  width = 560,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const translateX = interpolate(enter, [0, 1], [-30, 0]);
  const opacity = interpolate(enter, [0, 0.4, 1], [0, 1, 1]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width,
        padding: '18px 28px',
        backgroundColor: active
          ? COLORS.sageMist
          : COLORS.pureWhite,
        border: active
          ? `2px solid ${COLORS.terracotta}`
          : `1.5px solid ${COLORS.hairlineStrong}`,
        borderRadius: 8,
        transform: `translateX(${translateX}px)`,
        opacity,
        boxShadow: active
          ? '0 8px 24px rgba(228, 119, 94, 0.16)'
          : '0 3px 12px rgba(32, 42, 53, 0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            fontWeight: 800,
            color: active ? COLORS.terracotta : COLORS.deepTeal,
            backgroundColor: active ? 'rgba(228, 119, 94, 0.14)' : 'rgba(57, 124, 120, 0.1)',
            padding: '4px 10px',
            borderRadius: 4,
            letterSpacing: '0.06em',
          }}
        >
          EQ 0{eqNumber}
        </span>
        <span
          style={{
            ...TYPOGRAPHY.equation,
            color: COLORS.midnightInk,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          {equationText}
        </span>
      </div>

      {subText && (
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            fontWeight: 700,
            color: active ? COLORS.terracotta : COLORS.textSecondary,
            letterSpacing: '0.06em',
          }}
        >
          {subText}
        </span>
      )}
    </div>
  );
};
