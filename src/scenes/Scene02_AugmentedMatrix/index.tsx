import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { EquationCard } from '../../components/EquationCard';
import { Matrix } from '../../components/Matrix';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene02_AugmentedMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-215): Equations on the left, stripping variables (Chunk 08)
  // Phase 2 (215-515): Augmented matrix rows form with dividing line (Chunk 09)
  // Phase 3 (515-864): Complete Augmented Matrix & 1-to-1 isomorphism (Chunk 10)

  const matrixEntrance = spring({
    frame: frame - 210,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const matrixOpacity = interpolate(matrixEntrance, [0, 0.4, 1], [0, 1, 1]);
  const matrixX = interpolate(matrixEntrance, [0, 1], [1160, 1020]);

  // Active row highlight synchronization with spoken equations
  let activeRow: number | null = null;
  if (frame > 220 && frame < 310) activeRow = 0;
  else if (frame >= 310 && frame < 400) activeRow = 1;
  else if (frame >= 400 && frame < 515) activeRow = 2;

  // Character Kinematics & Performance Synchronized with Voiceover
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'celebrating' = 'explaining';
  let gaussExpression: 'focused' | 'curious' | 'proud' = 'curious';
  let gaussLookAt: 'right' | 'up-right' | 'down-right' = 'right';
  let isSpeaking = false;

  if (frame < 215) {
    gaussPose = 'explaining';
    gaussExpression = 'curious';
    gaussLookAt = 'right';
    isSpeaking = frame > 13 && frame < 200;
  } else if (frame >= 215 && frame < 515) {
    // Points directly at the transforming matrix rows
    gaussPose = 'pointing';
    gaussExpression = 'focused';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 220 && frame < 490;
  } else {
    // Proud presentation of the complete augmented matrix
    gaussPose = 'pointing';
    gaussExpression = 'proud';
    gaussLookAt = 'right';
    isSpeaking = frame > 525 && frame < 850;
  }

  const gaussDialogue =
    frame < 215
      ? 'To solve this systematically, we strip away the variable names and focus entirely on the numbers that govern them.'
      : frame < 515
      ? 'Each equation becomes a row. The coefficients of x, y, and z form our main grid, and the constants sit on the right side of a dividing line.'
      : 'This compact array is called an augmented matrix. Everything you need to know about the system is preserved here. Every row is an equation, and every column tracks a single variable.';

  const captionTopic =
    frame < 215
      ? 'VARIABLE STRIPPING // ISOLATE NUMBERS'
      : frame < 515
      ? 'ROW-EQUATION ISOMORPHISM'
      : 'THE AUGMENTED MATRIX [A | b]';

  return (
    <div
      style={{
        position: 'relative',
        width: GRID.width,
        height: GRID.height,
        backgroundColor: COLORS.warmPaper,
        overflow: 'hidden',
      }}
    >
      <LivingBackground theme="matrix" />
      <HeaderBar
        sceneNumber="SCENE 02"
        sceneTitle="UNDERSTANDING THE CONCEPT // THE AUGMENTED MATRIX"
      />

      {/* Left Column: Equations Display */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: GRID.marginX,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          zIndex: 20,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 800,
              color: COLORS.deepTeal,
              letterSpacing: '0.12em',
              marginBottom: 6,
            }}
          >
            STAGE 01 // EQUATION REPRESENTATION
          </div>
          <h2
            style={{
              ...TYPOGRAPHY.titleScene,
              color: COLORS.midnightInk,
              fontSize: 44,
              margin: 0,
            }}
          >
            From System to Grid
          </h2>
        </div>

        <EquationCard
          eqNumber={1}
          equationText="1x + 1y + 1z = 6"
          delay={20}
          active={activeRow === 0}
          subText="Row 1 -> [1, 1, 1 | 6]"
          width={490}
        />
        <EquationCard
          eqNumber={2}
          equationText="2x + 1y + 3z = 13"
          delay={60}
          active={activeRow === 1}
          subText="Row 2 -> [2, 1, 3 | 13]"
          width={490}
        />
        <EquationCard
          eqNumber={3}
          equationText="1x + 3y + 2z = 13"
          delay={100}
          active={activeRow === 2}
          subText="Row 3 -> [1, 3, 2 | 13]"
          width={490}
        />

        {/* Informational Callout Badge */}
        <div
          style={{
            marginTop: 8,
            backgroundColor: COLORS.pureWhite,
            border: `1.5px solid ${COLORS.hairlineStrong}`,
            borderLeft: `5px solid ${COLORS.terracotta}`,
            padding: '16px 22px',
            borderRadius: 8,
            maxWidth: 490,
            boxShadow: '0 6px 20px rgba(32, 42, 53, 0.06)',
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 900,
              color: COLORS.terracotta,
              marginBottom: 6,
              letterSpacing: '0.08em',
            }}
          >
            ONE-TO-ONE ISOMORPHISM
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              color: COLORS.midnightInk,
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            Every row represents an equation. Every column represents one coordinate variable.
          </div>
        </div>
      </div>

      {/* Kinetic Arrow Indicating Spatial Transformation */}
      {frame > 200 && (
        <div
          style={{
            position: 'absolute',
            top: 290,
            left: 630,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            zIndex: 25,
            opacity: interpolate(frame, [200, 240], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 900,
              color: COLORS.deepTeal,
              letterSpacing: '0.12em',
            }}
          >
            STRIP VARIABLES
          </span>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <line x1="5" y1="20" x2="105" y2="20" stroke={COLORS.deepTeal} strokeWidth="3.5" />
            <polygon points="100,11 118,20 100,29" fill={COLORS.deepTeal} />
          </svg>
        </div>
      )}

      {/* Right Column: The Augmented Matrix Form */}
      {frame > 240 && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: matrixX,
            opacity: matrixOpacity,
            zIndex: 30,
          }}
        >
          <div
            style={{
              marginBottom: 16,
              fontFamily: FONTS.mono,
              fontSize: 15,
              fontWeight: 900,
              color: COLORS.deepTeal,
              letterSpacing: '0.14em',
              textAlign: 'center',
            }}
          >
            AUGMENTED MATRIX [ A | b ]
          </div>

          <Matrix
            data={{
              rows: [
                [1, 1, 1, 6],
                [2, 1, 3, 13],
                [1, 3, 2, 13],
              ],
              activeRow,
            }}
            delay={260}
            showColumnLabels={true}
            scale={1.05}
          />

          <div
            style={{
              marginTop: 18,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 800,
              color: COLORS.textSecondary,
              letterSpacing: '0.06em',
            }}
          >
            <span>COEFFICIENT MATRIX (3×3)</span>
            <span>CONSTANTS (3×1)</span>
          </div>
        </div>
      )}

      {/* Animated Vector Rigged GAUSS Character */}
      <Gauss
        pose={gaussPose}
        expression={gaussExpression}
        lookAt={gaussLookAt}
        speaking={isSpeaking}
        x={560}
        y={490}
        scale={0.92}
        delay={30}
      />

      {/* Prominent Documentary-Grade GAUSS Dialogue Caption */}
      <DialogueCaption
        dialogueText={gaussDialogue}
        speaker="GAUSS // PRESENTER"
        topicTag={captionTopic}
        delay={30}
        width={780}
        style={{
          position: 'absolute',
          left: 820,
          bottom: 40,
        }}
        variant="teal"
      />
    </div>
  );
};
