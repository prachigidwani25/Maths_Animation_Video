import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene05_BackSubstitution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase breakdown calibrated to narration chunks (840 frames / 28.0s):
  // Chunk 53 (0 - 225): With the triangular structure complete... This is back-substitution.
  // Chunk 54 (225 - 435): The third row says three z equals nine. Dividing by three gives z = 3.
  // Chunk 55 (435 - 570): Now feed z = 3 into row two... y must be 2.
  // Chunk 56 (570 - 660): Finally, substitute both into row one... x equals 1.
  // Chunk 57 (660 - 840): Solution (1, 2, 3) + 3-Way Equation Verification + Gauss celebration!

  const zSolved = frame > 340;
  const ySolved = frame > 520;
  const xSolved = frame > 635;
  const showVerification = frame > 660;

  // Spring animation for final solution hero card
  const heroSolution = spring({
    frame: frame - 655,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 120 },
  });

  // Gauss Character Kinematics & Performance Synchronized with Voiceover
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'solving' | 'celebrating' = 'explaining';
  let gaussExpression: 'thinking' | 'aha' | 'excited' | 'proud' = 'thinking';
  let gaussLookAt: 'right' | 'up-right' | 'down-right' = 'right';
  let isSpeaking = false;

  if (frame < 225) {
    gaussPose = 'explaining';
    gaussExpression = 'thinking';
    gaussLookAt = 'right';
    isSpeaking = frame > 11 && frame < 214;
  } else if (frame >= 225 && frame < 435) {
    gaussPose = 'solving';
    gaussExpression = 'thinking';
    gaussLookAt = 'down-right';
    isSpeaking = frame > 235 && frame < 430;
  } else if (frame >= 435 && frame < 570) {
    gaussPose = 'solving';
    gaussExpression = 'aha';
    gaussLookAt = 'right';
    isSpeaking = frame > 445 && frame < 570;
  } else if (frame >= 570 && frame < 660) {
    gaussPose = 'pointing';
    gaussExpression = 'excited';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 570 && frame < 658;
  } else {
    // Grand celebration! Both arms up!
    gaussPose = 'celebrating';
    gaussExpression = 'proud';
    gaussLookAt = 'right';
    isSpeaking = frame > 660 && frame < 825;
  }

  const gaussDialogue =
    frame < 225
      ? 'With the triangular structure complete, the system unlocks effortlessly from the bottom up. This is back-substitution.'
      : frame < 435
      ? 'The third row says three z equals nine. Dividing by three gives z equals three.'
      : frame < 570
      ? 'Now feed z equals three into the second row: negative y plus three equals one. That means y must be two.'
      : frame < 660
      ? 'Finally, substitute both into the top row: x plus two plus three equals six. Therefore, x equals one.'
      : 'Our solution is x equals one, y equals two, and z equals three. Plugging them back into all three original equations confirms: every single one holds true!';

  const captionTopic =
    frame < 225
      ? 'BACK-SUBSTITUTION // BOTTOM-UP CASCADE'
      : frame < 435
      ? 'ROW 3 RESOLUTION // z = 3'
      : frame < 570
      ? 'ROW 2 RESOLUTION // y = 2'
      : frame < 660
      ? 'ROW 1 RESOLUTION // x = 1'
      : 'VERIFIED EXACT SOLUTION // (1, 2, 3)';

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
      <LivingBackground theme="substitution" />
      <HeaderBar
        sceneNumber="SCENE 05"
        sceneTitle="BACK-SUBSTITUTION // UNRAVELING THE SOLUTION"
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
          BOTTOM-UP RESOLUTION
        </div>
        <h2
          style={{
            ...TYPOGRAPHY.titleScene,
            color: COLORS.midnightInk,
            margin: 0,
            fontSize: 46,
          }}
        >
          {showVerification ? 'Solution Verified & Confirmed' : 'Solving From Bottom to Top'}
        </h2>
      </div>

      {/* Left Stage: The 3 Unraveling Derivations */}
      <div
        style={{
          position: 'absolute',
          top: 190,
          left: 520,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          zIndex: 30,
        }}
      >
        {/* Step 1: Solving for z */}
        <div
          style={{
            width: 460,
            padding: '18px 24px',
            borderRadius: 10,
            backgroundColor: COLORS.pureWhite,
            border: zSolved ? `2px solid ${COLORS.deepTeal}` : `1.5px solid ${COLORS.hairlineStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: zSolved ? '0 8px 24px rgba(57, 124, 120, 0.12)' : 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.deepTeal, fontWeight: 800, marginBottom: 4 }}>
              FROM ROW 3:
            </div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 26, fontWeight: 700, color: COLORS.midnightInk }}>
              3z = 9
            </div>
          </div>
          {zSolved && (
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 26,
                fontWeight: 900,
                color: COLORS.midnightInk,
                backgroundColor: COLORS.mutedSaffron,
                padding: '6px 16px',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(228, 185, 95, 0.25)',
              }}
            >
              z = 3
            </div>
          )}
        </div>

        {/* Step 2: Solving for y */}
        <div
          style={{
            width: 460,
            padding: '18px 24px',
            borderRadius: 10,
            backgroundColor: COLORS.pureWhite,
            border: ySolved ? `2px solid ${COLORS.deepTeal}` : `1.5px solid ${COLORS.hairlineStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: ySolved ? '0 8px 24px rgba(57, 124, 120, 0.12)' : 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.deepTeal, fontWeight: 800, marginBottom: 4 }}>
              FROM ROW 2 (z = 3):
            </div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 26, fontWeight: 700, color: COLORS.midnightInk }}>
              -y + 3 = 1
            </div>
          </div>
          {ySolved && (
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 26,
                fontWeight: 900,
                color: COLORS.midnightInk,
                backgroundColor: COLORS.mutedSaffron,
                padding: '6px 16px',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(228, 185, 95, 0.25)',
              }}
            >
              y = 2
            </div>
          )}
        </div>

        {/* Step 3: Solving for x */}
        <div
          style={{
            width: 460,
            padding: '18px 24px',
            borderRadius: 10,
            backgroundColor: COLORS.pureWhite,
            border: xSolved ? `2px solid ${COLORS.deepTeal}` : `1.5px solid ${COLORS.hairlineStrong}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: xSolved ? '0 8px 24px rgba(57, 124, 120, 0.12)' : 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLORS.deepTeal, fontWeight: 800, marginBottom: 4 }}>
              FROM ROW 1 (y = 2, z = 3):
            </div>
            <div style={{ fontFamily: FONTS.sans, fontSize: 26, fontWeight: 700, color: COLORS.midnightInk }}>
              x + 2 + 3 = 6
            </div>
          </div>
          {xSolved && (
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 26,
                fontWeight: 900,
                color: COLORS.midnightInk,
                backgroundColor: COLORS.mutedSaffron,
                padding: '6px 16px',
                borderRadius: 6,
                boxShadow: '0 4px 12px rgba(228, 185, 95, 0.25)',
              }}
            >
              x = 1
            </div>
          )}
        </div>
      </div>

      {/* Right Stage: Hero Solution Box & Substitution Verification */}
      {frame > 560 && (
        <div
          style={{
            position: 'absolute',
            top: 190,
            right: GRID.marginX,
            width: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            zIndex: 35,
            opacity: interpolate(heroSolution, [0, 1], [0, 1]),
            transform: `scale(${interpolate(heroSolution, [0, 1], [0.9, 1])})`,
          }}
        >
          {/* Solution Vector Badge */}
          <div
            style={{
              backgroundColor: COLORS.pureWhite,
              border: `3px solid ${COLORS.deepTeal}`,
              borderRadius: 12,
              padding: '28px 32px',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(57, 124, 120, 0.16)',
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: 900,
                color: COLORS.deepTeal,
                letterSpacing: '0.14em',
                marginBottom: 10,
              }}
            >
              UNIQUE SOLUTION VECTOR
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.midnightInk,
                letterSpacing: '0.04em',
              }}
            >
              (x, y, z) = (1, 2, 3)
            </div>
          </div>

          {/* Verification in Original Equations */}
          {showVerification && (
            <div
              style={{
                backgroundColor: COLORS.sageMist,
                border: `1.5px solid ${COLORS.hairlineStrong}`,
                borderRadius: 10,
                padding: '22px 28px',
                boxShadow: '0 8px 24px rgba(32, 42, 53, 0.05)',
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  fontWeight: 900,
                  color: COLORS.terracotta,
                  marginBottom: 14,
                  letterSpacing: '0.1em',
                }}
              >
                SUBSTITUTION VERIFICATION:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: FONTS.mono, fontSize: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.midnightInk }}>
                  <span style={{ fontWeight: 600 }}>1 + 2 + 3 = 6</span>
                  <span style={{ color: COLORS.deepTeal, fontWeight: 900 }}>✓ PASS</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.midnightInk }}>
                  <span style={{ fontWeight: 600 }}>2(1) + 2 + 3(3) = 13</span>
                  <span style={{ color: COLORS.deepTeal, fontWeight: 900 }}>✓ PASS</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.midnightInk }}>
                  <span style={{ fontWeight: 600 }}>1 + 3(2) + 2(3) = 13</span>
                  <span style={{ color: COLORS.deepTeal, fontWeight: 900 }}>✓ PASS</span>
                </div>
              </div>
            </div>
          )}
        </div>
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
        delay={30}
        width={840}
        style={{
          position: 'absolute',
          left: 520,
          bottom: 35,
        }}
        variant={showVerification ? 'saffron' : 'teal'}
      />
    </div>
  );
};
