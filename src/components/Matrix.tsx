import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS, TYPOGRAPHY } from '../styles/typography';
import { MatrixBracket } from './MatrixBracket';
import { PivotHighlight } from './PivotHighlight';

export interface MatrixData {
  rows: number[][]; // 3x4 array: [[a11, a12, a13, b1], [a21, a22, a23, b2], [a31, a32, a33, b3]]
  activeRow?: number | null; // 0, 1, 2 or null
  activePivot?: [number, number] | null; // [row, col] e.g. [0, 0]
  highlightZeros?: boolean;
  highlightDiagonal?: boolean;
}

interface MatrixProps {
  data: MatrixData;
  theme?: 'blue' | 'light';
  delay?: number;
  width?: number;
  height?: number;
  showColumnLabels?: boolean;
  scale?: number;
}

export const Matrix: React.FC<MatrixProps> = ({
  data,
  delay = 0,
  height = 270,
  showColumnLabels = true,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 120 },
  });

  const matrixOpacity = interpolate(entrance, [0, 0.3, 1], [0, 1, 1]);
  const matrixScale = interpolate(entrance, [0, 1], [0.94, 1]) * scale;

  const colWidths = [98, 98, 98, 115];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: matrixOpacity,
        transform: `scale(${matrixScale})`,
        transformOrigin: 'center center',
      }}
    >
      {/* Column Labels */}
      {showColumnLabels && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
            paddingLeft: 34,
            paddingRight: 34,
            gap: 12,
          }}
        >
          {['x', 'y', 'z', 'const'].map((col, idx) => (
            <div
              key={idx}
              style={{
                width: colWidths[idx],
                textAlign: 'center',
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: 800,
                color: idx === 3 ? COLORS.terracotta : COLORS.deepTeal,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {col}
            </div>
          ))}
        </div>
      )}

      {/* Augmented Matrix Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          backgroundColor: COLORS.pureWhite,
          padding: '20px 24px',
          borderRadius: 10,
          border: `1.5px solid ${COLORS.hairlineStrong}`,
          boxShadow: '0 10px 36px rgba(32, 42, 53, 0.08)',
        }}
      >
        {/* Left Square Bracket */}
        <MatrixBracket side="left" height={height} width={26} color={COLORS.midnightInk} delay={delay} />

        {/* Matrix Grid (3 rows x 4 columns) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            padding: '8px 10px',
          }}
        >
          {data.rows.map((row, rIdx) => {
            const isRowActive = data.activeRow === rIdx;
            return (
              <div
                key={rIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '5px 8px',
                  borderRadius: 6,
                  backgroundColor: isRowActive ? 'rgba(228, 119, 94, 0.12)' : 'transparent',
                  border: isRowActive ? `1.5px solid ${COLORS.terracotta}` : '1.5px solid transparent',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {/* 3 Coefficient Columns */}
                {row.slice(0, 3).map((val, cIdx) => {
                  const isPivot = data.activePivot && data.activePivot[0] === rIdx && data.activePivot[1] === cIdx;
                  const isZero = val === 0 && rIdx > cIdx; // Below-diagonal zero

                  return (
                    <div
                      key={cIdx}
                      style={{
                        position: 'relative',
                        width: colWidths[cIdx],
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Pivot Badge */}
                      {isPivot && <PivotHighlight label="PIVOT" active={true} delay={delay} width={colWidths[cIdx] - 10} />}

                      {/* Number Display */}
                      <span
                        style={{
                          ...TYPOGRAPHY.matrixCell,
                          color: isPivot
                            ? COLORS.midnightInk
                            : isZero && data.highlightZeros
                            ? COLORS.deepTeal
                            : COLORS.midnightInk,
                          fontSize: 38,
                          fontWeight: 800,
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  );
                })}

                {/* Vertical Divider Hairline for Augmented Constants */}
                <div
                  style={{
                    width: 2,
                    height: 50,
                    backgroundColor: COLORS.hairlineStrong,
                    margin: '0 6px',
                  }}
                />

                {/* Constant Column */}
                <div
                  style={{
                    position: 'relative',
                    width: colWidths[3],
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      ...TYPOGRAPHY.matrixCell,
                      color: isRowActive ? COLORS.terracotta : COLORS.midnightInk,
                      fontSize: 38,
                      fontWeight: 800,
                    }}
                  >
                    {row[3]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Square Bracket */}
        <MatrixBracket side="right" height={height} width={26} color={COLORS.midnightInk} delay={delay} />
      </div>
    </div>
  );
};
