import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../styles/colors';
import { GRID } from '../styles/grid';

interface BackgroundGridProps {
  showDottedGrid?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  showDottedGrid = true,
}) => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: GRID.width,
        height: GRID.height,
        backgroundColor: COLORS.warmPaper,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 12 Modular Grid Columns (Warm Editorial Hairlines) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: GRID.marginX,
          right: GRID.marginX,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          opacity: gridOpacity,
        }}
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 1,
              height: '100%',
              backgroundColor: COLORS.gridLine,
            }}
          />
        ))}
      </div>

      {/* Horizontal Modular Divisions */}
      <div
        style={{
          position: 'absolute',
          top: GRID.marginY,
          left: 0,
          right: 0,
          bottom: GRID.marginY,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: gridOpacity,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.gridLine,
            }}
          />
        ))}
      </div>

      {/* Swiss Architectural Registration Marks / Crosshairs */}
      {showDottedGrid && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.7,
          }}
        >
          {/* Top-left registration mark */}
          <g transform={`translate(${GRID.marginX}, ${GRID.marginY})`}>
            <line x1="-10" y1="0" x2="10" y2="0" stroke={COLORS.crosshair} strokeWidth="1.2" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke={COLORS.crosshair} strokeWidth="1.2" />
          </g>
          {/* Top-right registration mark */}
          <g transform={`translate(${GRID.width - GRID.marginX}, ${GRID.marginY})`}>
            <line x1="-10" y1="0" x2="10" y2="0" stroke={COLORS.crosshair} strokeWidth="1.2" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke={COLORS.crosshair} strokeWidth="1.2" />
          </g>
          {/* Bottom-left mark */}
          <g transform={`translate(${GRID.marginX}, ${GRID.height - GRID.marginY})`}>
            <line x1="-10" y1="0" x2="10" y2="0" stroke={COLORS.crosshair} strokeWidth="1.2" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke={COLORS.crosshair} strokeWidth="1.2" />
          </g>
          {/* Bottom-right mark */}
          <g transform={`translate(${GRID.width - GRID.marginX}, ${GRID.height - GRID.marginY})`}>
            <line x1="-10" y1="0" x2="10" y2="0" stroke={COLORS.crosshair} strokeWidth="1.2" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke={COLORS.crosshair} strokeWidth="1.2" />
          </g>
        </svg>
      )}
    </div>
  );
};
