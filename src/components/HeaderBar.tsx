import React from 'react';
import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';
import { GRID } from '../styles/grid';

interface HeaderBarProps {
  sceneNumber: string;
  sceneTitle: string;
  topic?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  sceneNumber,
  sceneTitle,
  topic = 'M3 // LINEAR ALGEBRA',
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 32,
        left: GRID.marginX,
        right: GRID.marginX,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1.5px solid ${COLORS.hairline}`,
        paddingBottom: 12,
        zIndex: 50,
      }}
    >
      {/* Left: Project & Course Identifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            backgroundColor: COLORS.deepTeal,
            color: COLORS.warmPaper,
            padding: '5px 12px',
            fontFamily: TYPOGRAPHY.meta.fontFamily,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.12em',
            borderRadius: 4,
          }}
        >
          PROJECT GAUSS
        </div>
        <span
          style={{
            ...TYPOGRAPHY.meta,
            color: COLORS.textSecondary,
            fontSize: 14,
            letterSpacing: '0.1em',
          }}
        >
          {topic}
        </span>
      </div>

      {/* Right: Scene Number & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span
          style={{
            ...TYPOGRAPHY.sectionNumber,
            color: COLORS.terracotta,
            fontSize: 17,
          }}
        >
          {sceneNumber}
        </span>
        <div
          style={{
            width: 1.5,
            height: 18,
            backgroundColor: COLORS.hairlineStrong,
          }}
        />
        <span
          style={{
            ...TYPOGRAPHY.meta,
            color: COLORS.midnightInk,
            fontSize: 14,
            letterSpacing: '0.08em',
          }}
        >
          {sceneTitle}
        </span>
      </div>
    </div>
  );
};
