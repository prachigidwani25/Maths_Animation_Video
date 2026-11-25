import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { Matrix } from '../../components/Matrix';
import { RowOperationTray } from '../../components/RowOperationTray';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene04_GaussianElimination: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dynamic Matrix Data depending on frame
  let rows: number[][] = [
    [1, 1, 1, 6],
    [2, 1, 3, 13],
    [1, 3, 2, 13],
  ];

  let activeRow: number | null = null;
  let activePivot: [number, number] | null = null;
  let highlightZeros = false;

  // Frame thresholds for mathematical states calibrated to narration chunks:
  // Chunk 29 (0-260): The Goal - Row Echelon Form
  // Chunk 30 (260-540): First Pivot Identified at (0,0)
  // Chunk 31 (540-1160): Op 1: R2 <- R2 - 2*R1
  // Chunk 32 (1160-1740): Op 2: R3 <- R3 - R1
  // Chunk 33 (1740-1940): Pivot 2 Identified at (1,1)
  // Chunk 34 (1940-2160): Op 3: R3 <- R3 + 2*R2
  // Chunk 35 (2160-2352): Row Echelon Form Accomplished!

  if (frame < 260) {
    // Goal Overview
    activePivot = null;
  } else if (frame >= 260 && frame < 540) {
    // Initial State: First Pivot identified
    activePivot = [0, 0];
  } else if (frame >= 540 && frame < 1160) {
    // Operation 1: R2 <- R2 - 2*R1
    activeRow = 1;
    activePivot = [0, 0];
    if (frame > 1040) {
      rows[1] = [0, -1, 1, 1];
    }
  } else if (frame >= 1160 && frame < 1740) {
    // Operation 2: R3 <- R3 - R1
    rows[1] = [0, -1, 1, 1];
    activeRow = 2;
    activePivot = [0, 0];
    if (frame > 1650) {
      rows[2] = [0, 2, 1, 7];
    }
  } else if (frame >= 1740 && frame < 1940) {
    // Pivot 2 active at (1,1)
    rows[1] = [0, -1, 1, 1];
    rows[2] = [0, 2, 1, 7];
    activeRow = null;
    activePivot = [1, 1];
  } else if (frame >= 1940 && frame < 2160) {
    // Operation 3: R3 <- R3 + 2*R2
    rows[1] = [0, -1, 1, 1];
    rows[2] = [0, 2, 1, 7];
    activeRow = 2;
    activePivot = [1, 1];
    if (frame > 2070) {
      rows[2] = [0, 0, 3, 9];
    }
  } else {
    // Row Echelon Form finalized
    rows = [
      [1, 1, 1, 6],
      [0, -1, 1, 1],
      [0, 0, 3, 9],
    ];
    activeRow = null;
    activePivot = null;
    highlightZeros = true;
  }

  // Camera choreography: subtle zoom during active operations, pull back at conclusion
  const camProgress = spring({
    frame: frame > 2160 ? frame - 2160 : 0,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });
  const cameraScale = frame > 2160 ? interpolate(camProgress, [0, 1], [1.05, 1]) : 1.05;

  // Gauss Character Kinematics & Performance Synchronized with Voiceover
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'thinking' | 'celebrating' = 'pointing';
  let gaussExpression: 'focused' | 'aha' | 'excited' | 'surprised' | 'proud' = 'focused';
  let gaussLookAt: 'right' | 'up-right' | 'down-right' = 'right';
  let isSpeaking = false;

  if (frame < 260) {
    gaussPose = 'explaining';
    gaussExpression = 'focused';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 16 && frame < 248;
  } else if (frame >= 260 && frame < 540) {
    gaussPose = 'pointing';
    gaussExpression = 'aha';
    gaussLookAt = 'right';
    isSpeaking = frame > 265 && frame < 525;
  } else if (frame >= 540 && frame < 1160) {
    gaussPose = 'pointing';
    gaussExpression = 'excited';
    gaussLookAt = 'right';
    isSpeaking = frame > 542 && frame < 1146;
  } else if (frame >= 1160 && frame < 1740) {
    gaussPose = 'explaining';
    gaussExpression = 'proud';
    gaussLookAt = 'down-right';
    isSpeaking = frame > 1167 && frame < 1733;
  } else if (frame >= 1740 && frame < 1940) {
    gaussPose = 'pointing';
    gaussExpression = 'focused';
    gaussLookAt = 'right';
    isSpeaking = frame > 1752 && frame < 1921;
  } else if (frame >= 1940 && frame < 2160) {
    gaussPose = 'pointing';
    gaussExpression = 'surprised';
    gaussLookAt = 'right';
    isSpeaking = frame > 1956 && frame < 2157;
  } else {
    gaussPose = 'celebrating';
    gaussExpression = 'proud';
    gaussLookAt = 'right';
    isSpeaking = frame > 2176 && frame < 2339;
  }

  const gaussDialogue =
    frame < 260
      ? 'Our goal is row echelon form — a clean, upper-triangular matrix where every entry below the diagonal becomes zero.'
      : frame < 540
      ? "Let's begin with our first pivot: the one in the top-left corner. We will use this leading entry to eliminate everything beneath it in column one."
      : frame < 1160
      ? 'To clear the two in row two, we subtract twice row one from row two. Two minus two is zero. One minus two gives negative one. Three minus two is one. And thirteen minus twelve leaves one. The first zero appears!'
      : frame < 1740
      ? 'Next, we eliminate the one in row three by subtracting row one from row three. One minus one is zero. Three minus one is two. Two minus one is one. And thirteen minus six leaves seven. Column one is now completely cleared!'
      : frame < 1940
      ? 'Now, we move down and right to our second pivot: negative one. We use it to eliminate the two directly beneath it in row three.'
      : frame < 2160
      ? 'We replace row three with row three plus two times row two. Two plus two times negative one cancels out to zero! One plus two gives three. And seven plus two gives nine.'
      : 'Look at the matrix now. A perfect staircase of zeros. This is row echelon form.';

  const captionTopic =
    frame < 260
      ? 'THE GOAL // ROW ECHELON FORM'
      : frame < 540
      ? 'FIRST PIVOT IDENTIFIED'
      : frame < 1160
      ? 'ELIMINATING ROW 2, COL 1'
      : frame < 1740
      ? 'ELIMINATING ROW 3, COL 1'
      : frame < 1940
      ? 'SECOND PIVOT IDENTIFIED'
      : frame < 2160
      ? 'ELIMINATING ROW 3, COL 2'
      : 'ROW ECHELON FORM ACCOMPLISHED';

  return (
    <div
      style={{
        position: 'relative',
        width: GRID.width,
        height: GRID.height,
        backgroundColor: COLORS.warmPaper,
        overflow: 'hidden',
        transform: `scale(${cameraScale})`,
        transformOrigin: '60% 45%',
      }}
    >
      <LivingBackground theme="elimination" />
      <HeaderBar
        sceneNumber="SCENE 04"
        sceneTitle="THE MAIN EVENT // SYSTEMATIC GAUSSIAN ELIMINATION"
      />

      {/* Main Title Callout */}
      <div
        style={{
          position: 'absolute',
          top: 95,
          left: GRID.marginX,
          zIndex: 20,
        }}
      >
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
          {frame < 2160 ? 'FORWARD ELIMINATION PHASE' : 'TRANSFORMATION ACCOMPLISHED'}
        </div>
        <h2
          style={{
            ...TYPOGRAPHY.titleScene,
            color: COLORS.midnightInk,
            margin: 0,
            fontSize: 46,
          }}
        >
          {frame < 2160 ? 'Eliminating Below Pivots' : 'Row Echelon Form Reached'}
        </h2>
      </div>

      {/* The Central Augmented Matrix */}
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: 540,
          zIndex: 30,
        }}
      >
        <Matrix
          data={{
            rows,
            activeRow,
            activePivot,
            highlightZeros,
          }}
          delay={0}
          showColumnLabels={true}
          scale={1.06}
        />
      </div>

      {/* Dynamic Operation Derivation Trays */}
      <div
        style={{
          position: 'absolute',
          top: 550,
          left: 540,
          zIndex: 35,
        }}
      >
        {frame >= 540 && frame < 1160 && (
          <RowOperationTray
            operationText="R2 ← R2 − 2R1"
            subText="Eliminating Column 1, Row 2"
            sourceRow={[1, 1, 1, 6]}
            targetRow={[2, 1, 3, 13]}
            multiplier={2}
            resultRow={[0, -1, 1, 1]}
            delay={550}
          />
        )}

        {frame >= 1160 && frame < 1740 && (
          <RowOperationTray
            operationText="R3 ← R3 − R1"
            subText="Eliminating Column 1, Row 3"
            sourceRow={[1, 1, 1, 6]}
            targetRow={[1, 3, 2, 13]}
            multiplier={1}
            resultRow={[0, 2, 1, 7]}
            delay={1170}
          />
        )}

        {frame >= 1940 && frame < 2160 && (
          <RowOperationTray
            operationText="R3 ← R3 + 2R2"
            subText="Eliminating Column 2, Row 3"
            sourceRow={[0, -1, 1, 1]}
            targetRow={[0, 2, 1, 7]}
            multiplier={-2}
            resultRow={[0, 0, 3, 9]}
            delay={1950}
          />
        )}

        {frame >= 2160 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              backgroundColor: COLORS.pureWhite,
              border: `2px solid ${COLORS.deepTeal}`,
              borderRadius: 10,
              padding: '26px 36px',
              boxShadow: '0 16px 40px rgba(57, 124, 120, 0.12)',
              minWidth: 560,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 15,
                fontWeight: 900,
                color: COLORS.deepTeal,
                letterSpacing: '0.1em',
              }}
            >
              UPPER TRIANGULAR SYSTEM SECURED
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 17,
                color: COLORS.midnightInk,
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              All entries below pivots (1, 1) and (2, 2) have become zero.
              The system is primed for immediate bottom-up back-substitution!
            </div>
          </div>
        )}
      </div>

      {/* Visual Staircase Indicator for Row Echelon Form (Frames 950+) */}
      {frame >= 950 && (
        <svg
          style={{
            position: 'absolute',
            top: 245,
            left: 540,
            width: 640,
            height: 250,
            pointerEvents: 'none',
            zIndex: 40,
          }}
        >
          {/* Staircase line outlining pivots */}
          <path
            d="M 130 110 L 235 110 L 235 180 L 340 180 L 340 245 L 460 245"
            fill="none"
            stroke={COLORS.terracotta}
            strokeWidth="3.5"
            strokeDasharray="6,4"
          />
        </svg>
      )}

      {/* Animated Vector Rigged GAUSS Character */}
      <Gauss
        pose={gaussPose}
        expression={gaussExpression}
        lookAt={gaussLookAt}
        speaking={isSpeaking}
        x={70}
        y={480}
        scale={0.94}
        delay={20}
      />

      {/* Prominent Documentary-Grade GAUSS Dialogue Caption */}
      <DialogueCaption
        dialogueText={gaussDialogue}
        speaker="GAUSS // PRESENTER"
        topicTag={captionTopic}
        delay={20}
        width={840}
        style={{
          position: 'absolute',
          left: 540,
          bottom: 35,
        }}
        variant={frame >= 950 ? 'saffron' : 'teal'}
      />
    </div>
  );
};
