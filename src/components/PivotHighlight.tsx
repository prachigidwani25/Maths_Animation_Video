import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/typography';

interface PivotHighlightProps {
  label?: string;
  active?: boolean;
  delay?: number;
  width?: number;
  height?: number;
}

export const PivotHighlight: React.FC<PivotHighlightProps> = ({
  label = 'PIVOT',
  active = true,
  delay = 0,
  width = 80,
  height = 70,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!active) return null;

  const anim = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      mass: 0.7,
      stiffness: 140,
    },
  });

  const scale = interpolate(anim, [0, 1], [0.6, 1]);
  const opacity = interpolate(anim, [0, 0.4, 1], [0, 1, 1]);

  // Subtle breathing pulse after entrance
  const pulse = Math.sin((frame - delay) / 8) * 0.025;

  return (
    <div
      style={{
        position: 'absolute',
        top: -6,
        left: -8,
        width: width + 16,
        height: height + 12,
        transform: `scale(${scale + (frame > delay + 15 ? pulse : 0)})`,
        opacity,
        border: `2.5px solid ${COLORS.mutedSaffron}`,
        borderRadius: 8,
        backgroundColor: 'rgba(228, 185, 95, 0.18)',
        boxShadow: `0 4px 16px rgba(228, 185, 95, 0.3)`,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '2px 4px',
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          fontWeight: 800,
          color: COLORS.midnightInk,
          backgroundColor: COLORS.mutedSaffron,
          padding: '1px 5px',
          borderRadius: 3,
          letterSpacing: '0.08em',
          transform: 'translateY(-13px)',
          boxShadow: '0 2px 6px rgba(32, 42, 53, 0.15)',
        }}
      >
        {label}
      </span>
    </div>
  );
};
