import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/typography';

interface RowOperationTrayProps {
  operationText: string;
  subText?: string;
  sourceRow: number[];
  targetRow: number[];
  multiplier: number;
  resultRow: number[];
  delay?: number;
}

export const RowOperationTray: React.FC<RowOperationTrayProps> = ({
  operationText,
  subText,
  sourceRow,
  targetRow,
  multiplier,
  resultRow,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 120,
    },
  });

  const translateY = interpolate(enter, [0, 1], [30, 0]);
  const opacity = interpolate(enter, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        backgroundColor: COLORS.pureWhite,
        border: `2px solid ${COLORS.terracotta}`,
        borderRadius: 10,
        padding: '22px 32px',
        boxShadow: `0 10px 30px rgba(32, 42, 53, 0.08)`,
        transform: `translateY(${translateY}px)`,
        opacity,
        minWidth: 540,
      }}
    >
      {/* Operation Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: COLORS.terracotta,
              color: COLORS.warmPaper,
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 4,
              letterSpacing: '0.08em',
            }}
          >
            ACTIVE ROW OPERATION
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.midnightInk,
            }}
          >
            {operationText}
          </span>
        </div>
        {subText && (
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.textSecondary,
            }}
          >
            {subText}
          </span>
        )}
      </div>

      {/* Arithmetic Derivation Row by Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '10px 28px',
          alignItems: 'center',
          fontFamily: FONTS.mono,
          fontSize: 17,
          color: COLORS.midnightInk,
          marginTop: 6,
          paddingTop: 12,
          borderTop: `1.5px solid ${COLORS.hairline}`,
        }}
      >
        <span style={{ color: COLORS.textSecondary, fontWeight: 700 }}>Target:</span>
        <span style={{ fontWeight: 700, letterSpacing: '0.12em' }}>
          [{targetRow.slice(0, 3).join(', ')} | {targetRow[3]}]
        </span>

        <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>
          {multiplier > 0 ? `-${multiplier} × R_src:` : `+${Math.abs(multiplier)} × R_src:`}
        </span>
        <span style={{ color: COLORS.terracotta, fontWeight: 800, letterSpacing: '0.12em' }}>
          [{sourceRow.slice(0, 3).map((v) => v * multiplier).join(', ')} | {sourceRow[3] * multiplier}]
        </span>

        <span style={{ color: COLORS.deepTeal, fontWeight: 900 }}>New Row:</span>
        <span
          style={{
            color: COLORS.midnightInk,
            fontWeight: 900,
            fontSize: 19,
            letterSpacing: '0.12em',
            backgroundColor: COLORS.sageMist,
            padding: '4px 12px',
            borderRadius: 4,
            border: `1.5px solid ${COLORS.hairlineStrong}`,
            display: 'inline-block',
          }}
        >
          [{resultRow.slice(0, 3).join(', ')} | {resultRow[3]}]
        </span>
      </div>
    </div>
  );
};
