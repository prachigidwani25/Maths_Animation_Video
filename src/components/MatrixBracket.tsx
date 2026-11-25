import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';

interface MatrixBracketProps {
  side: 'left' | 'right';
  height: number;
  width?: number;
  thickness?: number;
  color?: string;
  delay?: number;
}

export const MatrixBracket: React.FC<MatrixBracketProps> = ({
  side,
  height,
  width = 24,
  thickness = 3.5,
  color = COLORS.midnightInk,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 110,
    },
  });

  const capWidth = width;

  return (
    <div
      style={{
        position: 'relative',
        width: capWidth,
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: side === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      <svg
        width={capWidth}
        height={height}
        style={{ overflow: 'visible' }}
      >
        {/* Architectural Square Bracket Path */}
        {side === 'left' ? (
          <path
            d={`M ${capWidth} 0 L 0 0 L 0 ${height} L ${capWidth} ${height}`}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="square"
            strokeDasharray={height + capWidth * 2}
            strokeDashoffset={(height + capWidth * 2) * (1 - progress)}
          />
        ) : (
          <path
            d={`M 0 0 L ${capWidth} 0 L ${capWidth} ${height} L 0 ${height}`}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="square"
            strokeDasharray={height + capWidth * 2}
            strokeDashoffset={(height + capWidth * 2) * (1 - progress)}
          />
        )}
      </svg>
    </div>
  );
};
