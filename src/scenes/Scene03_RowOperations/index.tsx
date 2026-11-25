import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene03_RowOperations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 4-Phase Choreography calibrated to narration chunks:
  // Phase 0 (0-240): The 3 Elementary Moves Overview (Chunk 17)
  // Phase 1 (240-440): Move 1 - Row Swap (Chunk 18)
  // Phase 2 (440-680): Move 2 - Scalar Multiplication (Chunk 19)
  // Phase 3 (680-1308): Move 3 - Row Addition & Invariance Proof (Chunk 20)

  const activeOp = frame < 240 ? 0 : frame < 440 ? 1 : frame < 680 ? 2 : 3;

  // Swap animation interpolation for Move 1
  const swapProgress = spring({
    frame: frame - 270,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });
  const row1Y = interpolate(swapProgress, [0, 1], [0, 68]);
  const row2Y = interpolate(swapProgress, [0, 1], [0, -68]);

  // Scalar pulse interpolation for Move 2
  const scalePulse = Math.sin((frame - 480) / 10) * 0.05;

  // Character Kinematics & Performance Synchronized with Voiceover
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'thinking' | 'celebrating' = 'pointing';
  let gaussExpression: 'curious' | 'thinking' | 'aha' | 'focused' | 'proud' = 'curious';
  let gaussLookAt: 'right' | 'up-right' = 'right';
  let isSpeaking = false;

  if (activeOp === 0) {
    gaussPose = 'explaining';
    gaussExpression = 'curious';
    gaussLookAt = 'right';
    isSpeaking = frame > 14 && frame < 220;
  } else if (activeOp === 1) {
    gaussPose = 'pointing';
    gaussExpression = 'curious';
    gaussLookAt = 'right';
    isSpeaking = frame > 250 && frame < 430;
  } else if (activeOp === 2) {
    gaussPose = 'pointing';
    gaussExpression = 'focused';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 455 && frame < 670;
  } else {
    gaussPose = 'pointing';
    gaussExpression = 'aha';
    gaussLookAt = 'right';
    isSpeaking = frame > 690 && frame < 1280;
  }

  const gaussDialogue =
    activeOp === 0
      ? 'Now, what are we allowed to do to this matrix? Only three moves, known as elementary row operations.'
      : activeOp === 1
      ? 'First, we can swap any two rows. Changing the order of our equations obviously does not change the truth.'
      : activeOp === 2
      ? 'Second, we can scale any row by a non-zero number. If two quantities are equal, doubling both sides keeps them equal.'
      : 'And third, the master key: we can add or subtract a multiple of one row to another. Because every operation is reversible, the solution set never changes. The system stays mathematically identical.';

  const captionTopic =
    activeOp === 0
      ? 'ELEMENTARY ROW OPERATIONS // THE 3 RULES'
      : activeOp === 1
      ? 'RULE 01 // ROW SWAP (Ri ↔ Rj)'
      : activeOp === 2
      ? 'RULE 02 // NON-ZERO SCALING (Ri ← k·Ri)'
      : 'RULE 03 // LINEAR COMBINATION & INVARIANCE';

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
      <LivingBackground theme="operations" />
      <HeaderBar sceneNumber="SCENE 03" sceneTitle="VISUAL INTUITION // ELEMENTARY ROW OPERATIONS" />

      {/* Top Banner */}
      <div
        style={{
          position: 'absolute',
          top: 105,
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
          RULES OF TRANSFORMATION // 3 INVARIANT MOVES
        </div>
        <h2
          style={{
            ...TYPOGRAPHY.titleScene,
            color: COLORS.midnightInk,
            margin: 0,
            fontSize: 46,
          }}
        >
          Why Row Operations Preserve Truth
        </h2>
      </div>

      {/* 3 Modular Operation Tabs (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          right: GRID.marginX,
          display: 'flex',
          gap: 14,
          zIndex: 25,
        }}
      >
        {[
          { id: 1, title: '01 // ROW SWAP', code: 'R_i ↔ R_j' },
          { id: 2, title: '02 // SCALING', code: 'R_i ← k·R_i' },
          { id: 3, title: '03 // COMBINATION', code: 'R_i ← R_i + k·R_j' },
        ].map((tab) => {
          const isSelected = activeOp === tab.id;
          return (
            <div
              key={tab.id}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                backgroundColor: isSelected ? COLORS.deepTeal : COLORS.pureWhite,
                color: isSelected ? COLORS.warmPaper : COLORS.midnightInk,
                border: isSelected ? `2px solid ${COLORS.deepTeal}` : `1.5px solid ${COLORS.hairlineStrong}`,
                fontFamily: FONTS.mono,
                fontWeight: 800,
                fontSize: 13,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                boxShadow: isSelected ? '0 6px 18px rgba(57, 124, 120, 0.22)' : 'none',
              }}
            >
              <span>{tab.title}</span>
              <span style={{ fontSize: 15, color: isSelected ? COLORS.mutedSaffron : COLORS.terracotta }}>{tab.code}</span>
            </div>
          );
        })}
      </div>

      {/* Interactive Demonstration Stage (Center-Right) */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 540,
          width: 860,
          backgroundColor: COLORS.pureWhite,
          border: `1.5px solid ${COLORS.hairlineStrong}`,
          borderRadius: 12,
          padding: 32,
          zIndex: 30,
          boxShadow: '0 16px 40px rgba(32, 42, 53, 0.08)',
        }}
      >
        {activeOp === 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.deepTeal, fontWeight: 900 }}>
                THE ONLY 3 LEGAL OPERATIONS ON A LINEAR SYSTEM
              </span>
              <span
                style={{
                  backgroundColor: COLORS.deepTeal,
                  color: COLORS.warmPaper,
                  fontSize: 12,
                  fontFamily: FONTS.mono,
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontWeight: 800,
                }}
              >
                100% INVARIANT
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { num: '01', title: 'ROW SWAP', sym: 'R_i ↔ R_j', desc: 'Reorder equations freely without altering mutual geometric intersection.' },
                { num: '02', title: 'SCALAR SCALING', sym: 'R_i ← k·R_i (k ≠ 0)', desc: 'Multiply or divide entire row by any non-zero real number.' },
                { num: '03', title: 'ROW COMBINATION', sym: 'R_i ← R_i + k·R_j', desc: 'Add or subtract a multiple of one row to another to eliminate variables.' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    padding: '16px 20px',
                    backgroundColor: COLORS.warmPaper,
                    borderRadius: 8,
                    border: `1.5px solid ${i === 0 ? COLORS.deepTeal : i === 1 ? COLORS.terracotta : COLORS.mutedSaffron}`,
                  }}
                >
                  <span style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 900, color: COLORS.deepTeal }}>{item.num}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: FONTS.sans, fontSize: 18, fontWeight: 800, color: COLORS.midnightInk }}>{item.title}</span>
                      <span style={{ fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700, color: COLORS.terracotta }}>{item.sym}</span>
                    </div>
                    <div style={{ fontFamily: FONTS.sans, fontSize: 14, color: COLORS.textSecondary, marginTop: 2 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeOp === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.deepTeal, fontWeight: 900 }}>
                OPERATION 1: SWAPPING TWO ROWS (R1 ↔ R2)
              </span>
              <span
                style={{
                  backgroundColor: COLORS.terracotta,
                  color: COLORS.warmPaper,
                  fontSize: 12,
                  fontFamily: FONTS.mono,
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontWeight: 800,
                }}
              >
                EQUIVALENT ORDER
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
              {/* Row 1 (Swaps down) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '14px 22px',
                  backgroundColor: COLORS.sageMist,
                  borderRadius: 8,
                  border: `1.5px solid ${COLORS.deepTeal}`,
                  transform: `translateY(${row1Y}px)`,
                  fontFamily: FONTS.mono,
                  fontSize: 22,
                  color: COLORS.midnightInk,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: COLORS.deepTeal, width: 44, fontWeight: 900 }}>R1:</span>
                <span>[ 1, 1, 1 | 6 ]</span>
                <span style={{ marginLeft: 'auto', fontSize: 14, color: COLORS.textSecondary, fontWeight: 600 }}>
                  Eq 1: x + y + z = 6
                </span>
              </div>

              {/* Row 2 (Swaps up) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '14px 22px',
                  backgroundColor: 'rgba(228, 119, 94, 0.1)',
                  borderRadius: 8,
                  border: `1.5px solid ${COLORS.terracotta}`,
                  transform: `translateY(${row2Y}px)`,
                  fontFamily: FONTS.mono,
                  fontSize: 22,
                  color: COLORS.midnightInk,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: COLORS.terracotta, width: 44, fontWeight: 900 }}>R2:</span>
                <span>[ 2, 1, 3 | 13 ]</span>
                <span style={{ marginLeft: 'auto', fontSize: 14, color: COLORS.textSecondary, fontWeight: 600 }}>
                  Eq 2: 2x + y + 3z = 13
                </span>
              </div>

              {/* Row 3 (Stationary) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '14px 22px',
                  backgroundColor: COLORS.warmPaper,
                  borderRadius: 8,
                  border: `1px solid ${COLORS.hairline}`,
                  fontFamily: FONTS.mono,
                  fontSize: 22,
                  color: COLORS.midnightInk,
                  fontWeight: 700,
                }}
              >
                <span style={{ width: 44, color: COLORS.textSecondary }}>R3:</span>
                <span>[ 1, 3, 2 | 13 ]</span>
                <span style={{ marginLeft: 'auto', fontSize: 14, color: COLORS.textSecondary, fontWeight: 600 }}>
                  Eq 3: x + 3y + 2z = 13
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                padding: '14px 18px',
                borderLeft: `4px solid ${COLORS.deepTeal}`,
                backgroundColor: COLORS.warmPaper,
                fontSize: 15,
                color: COLORS.midnightInk,
                lineHeight: 1.5,
              }}
            >
              <strong>Geometric Intuition:</strong> Stating condition B before condition A does not alter their mutual intersection point in 3D coordinate space.
            </div>
          </div>
        )}

        {activeOp === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.deepTeal, fontWeight: 900 }}>
                OPERATION 2: SCALAR MULTIPLICATION (R1 ← 2·R1)
              </span>
              <span
                style={{
                  backgroundColor: COLORS.deepTeal,
                  color: COLORS.warmPaper,
                  fontSize: 12,
                  fontFamily: FONTS.mono,
                  fontWeight: 900,
                  padding: '4px 10px',
                  borderRadius: 4,
                }}
              >
                k ≠ 0
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  padding: '18px 24px',
                  backgroundColor: COLORS.sageMist,
                  border: `2px solid ${COLORS.deepTeal}`,
                  borderRadius: 8,
                  transform: `scale(${1 + scalePulse})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: FONTS.mono,
                  fontSize: 24,
                  color: COLORS.midnightInk,
                  fontWeight: 800,
                }}
              >
                <span>[ 1, 1, 1 | 6 ] × 2</span>
                <span style={{ color: COLORS.terracotta }}>➔</span>
                <span style={{ color: COLORS.deepTeal }}>[ 2, 2, 2 | 12 ]</span>
              </div>

              <div
                style={{
                  padding: '18px 24px',
                  backgroundColor: COLORS.warmPaper,
                  border: `1px solid ${COLORS.hairlineStrong}`,
                  borderRadius: 8,
                  fontFamily: FONTS.mono,
                  fontSize: 17,
                  color: COLORS.midnightInk,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Reversibility Check:</span>
                <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>[ 2, 2, 2 | 12 ] × (1/2) = [ 1, 1, 1 | 6 ]</span>
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                padding: '14px 18px',
                borderLeft: `4px solid ${COLORS.deepTeal}`,
                backgroundColor: COLORS.warmPaper,
                fontSize: 15,
                color: COLORS.midnightInk,
                lineHeight: 1.5,
              }}
            >
              <strong>Geometric Intuition:</strong> Multiplying both sides of an equality by a non-zero constant scales both sides identically without changing the hyperplane.
            </div>
          </div>
        )}

        {activeOp === 3 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 19, color: COLORS.deepTeal, fontWeight: 900 }}>
                OPERATION 3: LINEAR COMBINATIONS (R2 ← R2 - 2·R1)
              </span>
              <span
                style={{
                  backgroundColor: COLORS.terracotta,
                  color: COLORS.warmPaper,
                  fontSize: 12,
                  fontFamily: FONTS.mono,
                  fontWeight: 900,
                  padding: '4px 10px',
                  borderRadius: 4,
                }}
              >
                THE ELIMINATION ENGINE
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 14,
                fontFamily: FONTS.mono,
                fontSize: 20,
                color: COLORS.midnightInk,
                backgroundColor: COLORS.warmPaper,
                padding: '20px 24px',
                borderRadius: 8,
                border: `1.5px solid ${COLORS.hairlineStrong}`,
              }}
            >
              <span style={{ color: COLORS.textSecondary, fontWeight: 700 }}>Row 2:</span>
              <span style={{ fontWeight: 800 }}>[ 2, 1, 3 | 13 ]</span>

              <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>- 2 × Row 1:</span>
              <span style={{ color: COLORS.terracotta, fontWeight: 800 }}>[ 2, 2, 2 | 12 ]</span>

              <span style={{ color: COLORS.deepTeal, fontWeight: 900 }}>New Row 2:</span>
              <span style={{ color: COLORS.deepTeal, fontWeight: 900, fontSize: 22 }}>[ 0, -1, 1 | 1 ]</span>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: '14px 18px',
                borderLeft: `4px solid ${COLORS.terracotta}`,
                backgroundColor: COLORS.warmPaper,
                fontSize: 15,
                color: COLORS.midnightInk,
                lineHeight: 1.5,
              }}
            >
              <strong>The Invariant Proof:</strong> Because $R_2$ can be recovered by adding $2R_1$ back, the solution vector is preserved with 100% mathematical fidelity.
            </div>
          </div>
        )}
      </div>

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
        delay={30}
        width={860}
        style={{
          position: 'absolute',
          left: 480,
          bottom: 40,
        }}
        variant={activeOp === 1 ? 'teal' : activeOp === 2 ? 'saffron' : 'terracotta'}
      />
    </div>
  );
};
