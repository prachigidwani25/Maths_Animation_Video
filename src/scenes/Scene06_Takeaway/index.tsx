import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene06_Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (Frames 0 - 300): The 1st Pillar & The Core Philosophy
  // Phase 2 (Frames 300 - 520): Pillars 2 & 3 lock into place (The Complete Trinity)
  // Phase 3 (Frames 520 - 815): The Master Takeaway & Academic Credit Sequence
  // Phase 4 (Frames 815 - 885): Outro Fade

  const pillar1Spring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  const pillar2Spring = spring({
    frame: frame - 310,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  const pillar3Spring = spring({
    frame: frame - 370,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  const creditsSpring = spring({
    frame: frame - 530,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Outro fade overlay
  const outroFade = interpolate(frame, [820, 875], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Character Kinematics & Performance Synchronized with Voiceover
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'celebrating' = 'explaining';
  let gaussExpression: 'curious' | 'confident' | 'proud' | 'aha' = 'confident';
  let gaussLookAt: 'right' | 'up-right' | 'viewer' = 'right';
  let isSpeaking = false;

  if (frame < 300) {
    gaussPose = 'explaining';
    gaussExpression = 'confident';
    gaussLookAt = 'right';
    isSpeaking = frame > 15 && frame < 290;
  } else if (frame >= 300 && frame < 520) {
    gaussPose = 'pointing';
    gaussExpression = 'proud';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 310 && frame < 490;
  } else if (frame >= 520 && frame < 815) {
    gaussPose = 'celebrating';
    gaussExpression = 'proud';
    gaussLookAt = 'viewer';
    isSpeaking = frame > 525 && frame < 800;
  } else {
    gaussPose = 'idle';
    gaussExpression = 'proud';
    gaussLookAt = 'viewer';
    isSpeaking = false;
  }

  const gaussDialogue =
    frame < 300
      ? 'Gaussian elimination is not just an algorithm. It is the art of strategic simplification. Represent the equations as an augmented matrix.'
      : frame < 520
      ? 'Use row operations to reach row echelon form. And back-substitute to find your answers.'
      : 'By transforming complexity into structure, even the most tangled system reveals its truth. Linear systems solved with elegance. Mastered, with Gauss.';

  const captionTopic =
    frame < 300
      ? 'CORE PHILOSOPHY // STRATEGIC SIMPLIFICATION'
      : frame < 520
      ? 'THE THREE PILLARS OF GAUSS'
      : 'ELEGANCE MASTERED // LINEAR ALGEBRA M3';

  // 3 Core Pillars Data
  const pillars = [
    {
      num: '01',
      title: 'AUGMENTED MATRIX',
      subtitle: '[A | b] ISOMORPHISM',
      body: 'Strip variable labels. Preserve 100% of the mathematical relationships in a clean rectangular coordinate array.',
      color: COLORS.deepTeal,
      accent: COLORS.sageMist,
      springVal: pillar1Spring,
    },
    {
      num: '02',
      title: 'ROW ECHELON FORM',
      subtitle: 'REVERSIBLE ROW OPS',
      body: 'Systematically eliminate lower variables using pivots. Create an invariant upper triangular staircase of zeros.',
      color: COLORS.terracotta,
      accent: '#FDEAE4',
      springVal: pillar2Spring,
    },
    {
      num: '03',
      title: 'BACK-SUBSTITUTION',
      subtitle: 'BOTTOM-UP CASCADE',
      body: 'Unlock each unknown effortlessly from the bottom row up. Verify against all original equations: (1, 2, 3).',
      color: COLORS.mutedSaffron,
      accent: '#FDF6E2',
      springVal: pillar3Spring,
    },
  ];

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
      <LivingBackground theme="takeaway" />
      <HeaderBar sceneNumber="SCENE 06" sceneTitle="THE GAUSSIAN METHOD // SYNTHESIS & MASTERY" />

      {/* Main Content Layout Container */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: GRID.marginX,
          right: GRID.marginX,
          bottom: 180,
          display: 'flex',
          gap: 40,
        }}
      >
        {/* Left Column: Character Stage */}
        <div
          style={{
            flex: '0 0 540px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {/* Animated Pedestal Base */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              width: 380,
              height: 16,
              borderRadius: '50%',
              backgroundColor: COLORS.midnightInk,
              opacity: 0.12,
              filter: 'blur(8px)',
            }}
          />

          <Gauss
            pose={gaussPose}
            expression={gaussExpression}
            lookAt={gaussLookAt}
            scale={1.22}
            speaking={isSpeaking}
          />
        </div>

        {/* Right Column: Dynamic Presentation Stage */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* STATE A: THE THREE ARCHITECTURAL PILLARS (Frames 0 - 520) */}
          {frame < 540 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                opacity: interpolate(frame, [510, 540], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 16,
                  fontWeight: 800,
                  color: COLORS.deepTeal,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                THE THREE FOUNDATIONS OF SYSTEMIC ELIMINATION
              </div>

              {pillars.map((p, idx) => {
                const pY = interpolate(p.springVal, [0, 1], [35, 0]);
                const pAlpha = interpolate(p.springVal, [0, 0.4, 1], [0, 1, 1]);

                return (
                  <div
                    key={idx}
                    style={{
                      transform: `translateY(${pY}px)`,
                      opacity: pAlpha,
                      backgroundColor: COLORS.warmPaper,
                      borderRadius: 14,
                      border: `2px solid ${p.color}`,
                      boxShadow: '0 8px 24px rgba(32, 42, 53, 0.08)',
                      padding: '20px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 24,
                    }}
                  >
                    {/* Index Badge */}
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: 12,
                        backgroundColor: p.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONTS.mono,
                        fontSize: 26,
                        fontWeight: 800,
                        color: COLORS.warmPaper,
                        flexShrink: 0,
                      }}
                    >
                      {p.num}
                    </div>

                    {/* Pillar Text Description */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 14,
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: FONTS.sans,
                            fontSize: 24,
                            fontWeight: 800,
                            color: COLORS.midnightInk,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {p.title}
                        </span>
                        <span
                          style={{
                            fontFamily: FONTS.mono,
                            fontSize: 15,
                            fontWeight: 800,
                            color: p.color,
                            letterSpacing: '0.06em',
                          }}
                        >
                          {p.subtitle}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.sans,
                          fontSize: 18,
                          color: COLORS.midnightInk,
                          opacity: 0.85,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.body}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* STATE B: MASTER DIPLOMA & FINAL CREDITS (Frames 520+) */}
          {frame >= 520 && (
            <div
              style={{
                transform: `translateY(${interpolate(creditsSpring, [0, 1], [40, 0])}px)`,
                opacity: interpolate(creditsSpring, [0, 0.4, 1], [0, 1, 1]),
                backgroundColor: COLORS.warmPaper,
                borderRadius: 18,
                border: `3px solid ${COLORS.deepTeal}`,
                boxShadow: '0 16px 40px rgba(32, 42, 53, 0.12)',
                padding: '36px 44px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Top Banner */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `2px solid ${COLORS.sageMist}`,
                  paddingBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 14,
                      fontWeight: 800,
                      color: COLORS.terracotta,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ACADEMIC MATHEMATICAL CERTIFICATION // M3
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 34,
                      fontWeight: 800,
                      color: COLORS.midnightInk,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    GAUSSIAN ELIMINATION
                  </div>
                </div>

                {/* Master Seal */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: `3px solid ${COLORS.mutedSaffron}`,
                    backgroundColor: '#FDF8EC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONTS.mono,
                    fontSize: 30,
                    fontWeight: 800,
                    color: COLORS.midnightInk,
                  }}
                >
                  ∑
                </div>
              </div>

              {/* Solution Summary Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    backgroundColor: '#EDF5F1',
                    borderRadius: 12,
                    padding: '14px 18px',
                    border: `1.5px solid ${COLORS.deepTeal}`,
                  }}
                >
                  <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.deepTeal, fontWeight: 700 }}>
                    SYSTEM SOLUTION
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.midnightInk, fontWeight: 700, marginTop: 4 }}>
                    x=1, y=2, z=3
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#FDEEEB',
                    borderRadius: 12,
                    padding: '14px 18px',
                    border: `1.5px solid ${COLORS.terracotta}`,
                  }}
                >
                  <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.terracotta, fontWeight: 700 }}>
                    ECHELON STABILITY
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.midnightInk, fontWeight: 700, marginTop: 4 }}>
                    Upper Triangular
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#FDF7E7',
                    borderRadius: 12,
                    padding: '14px 18px',
                    border: `1.5px solid ${COLORS.mutedSaffron}`,
                  }}
                >
                  <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: COLORS.midnightInk, fontWeight: 700 }}>
                    INVARIANCE
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 24, color: COLORS.midnightInk, fontWeight: 700, marginTop: 4 }}>
                    100% Exact Proof
                  </div>
                </div>
              </div>

              {/* Production Credits Footer */}
              <div
                style={{
                  borderTop: `1px solid ${COLORS.sageMist}`,
                  paddingTop: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  color: COLORS.midnightInk,
                  opacity: 0.8,
                }}
              >
                <div>PROJECT GAUSS // PRODUCED FOR EDUCATIONAL EXCELLENCE</div>
                <div>POWERED BY REMOTION // SWISS EDITORIAL MOTION</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prominent Swiss Dialogue Caption System */}
      <DialogueCaption
        speaker="GAUSS"
        dialogueText={gaussDialogue}
        topicTag={captionTopic}
      />

      {/* Outro Fade to Paper Baseline */}
      {outroFade > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.warmPaper,
            opacity: outroFade,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
