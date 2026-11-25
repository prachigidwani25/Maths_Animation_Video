import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LivingBackground } from '../../components/LivingBackground';
import { HeaderBar } from '../../components/HeaderBar';
import { EquationCard } from '../../components/EquationCard';
import { DialogueCaption } from '../../components/DialogueCaption';
import { Gauss } from '../../character/Gauss';
import { COLORS } from '../../styles/colors';
import { FONTS, TYPOGRAPHY } from '../../styles/typography';
import { GRID } from '../../styles/grid';

export const Scene01_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: High-impact Title Card Entrance (Frames 0-140)
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 0.4, 1], [0, 1, 1]);

  // Phase 2: Equations arrive (Chunk 03: Frame 320+)
  const showEquations = frame > 310;

  // Phase 3: Chaos overlay (Chunk 04: Frames 490-660)
  const chaosAlpha = interpolate(frame, [490, 520, 630, 660], [0, 0.96, 0.96, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 4: Resolution / Upper Triangular Grid Reveal (Chunk 05: Frames 660-846)
  const resolveSpring = spring({
    frame: frame - 660,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 120 },
  });

  // Character Kinematics & Performance Evolution Synchronized with Audio
  let gaussPose: 'idle' | 'explaining' | 'pointing' | 'thinking' | 'celebrating' = 'idle';
  let gaussExpression: 'curious' | 'thinking' | 'confident' | 'aha' = 'curious';
  let gaussLookAt: 'viewer' | 'right' | 'up-right' = 'viewer';
  let isSpeaking = false;

  if (frame < 140) {
    gaussPose = 'idle';
    gaussExpression = 'curious';
    gaussLookAt = 'viewer';
    isSpeaking = frame > 10 && frame < 130;
  } else if (frame >= 140 && frame < 320) {
    gaussPose = 'explaining';
    gaussExpression = 'curious';
    gaussLookAt = 'viewer';
    isSpeaking = frame > 145 && frame < 310;
  } else if (frame >= 320 && frame < 490) {
    // Points toward equations arriving on the right
    gaussPose = 'pointing';
    gaussExpression = 'curious';
    gaussLookAt = 'right';
    isSpeaking = frame > 325 && frame < 480;
  } else if (frame >= 490 && frame < 660) {
    // Ponders the chaotic algebraic sprawl
    gaussPose = 'thinking';
    gaussExpression = 'thinking';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 490 && frame < 645;
  } else {
    // Points confidently toward the triangular solution framework!
    gaussPose = 'pointing';
    gaussExpression = 'confident';
    gaussLookAt = 'up-right';
    isSpeaking = frame > 665 && frame < 830;
  }

  const gaussDialogue =
    frame < 140
      ? 'Welcome to the elegance of linear algebra. I am Gauss, your guide.'
      : frame < 320
      ? "Today, we tackle one of mathematics' greatest challenges: solving systems of linear equations."
      : frame < 490
      ? 'Look at these three equations. Three unknowns, tangled simultaneously.'
      : frame < 660
      ? 'If you guess, you get lost. If you substitute blindly, the algebra explodes.'
      : 'So, how do we cut through the chaos? By transforming the entire system into a simple, triangular structure — without changing its solution.';

  const captionTopic =
    frame < 140
      ? 'WELCOME // MEET GAUSS'
      : frame < 320
      ? 'THE LINEAR CHALLENGE'
      : frame < 490
      ? 'LINEAR SYSTEM (3×3)'
      : frame < 660
      ? 'THE ALGEBRAIC TRAP'
      : 'THE ECHELON STRATEGY';

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
      <LivingBackground theme="hook" />
      <HeaderBar sceneNumber="SCENE 01" sceneTitle="THE HOOK // THE CHALLENGE OF LINEAR SYSTEMS" />

      {/* Hero Title & Subtitle Block (Top Left) */}
      <div
        style={{
          position: 'absolute',
          top: 105,
          left: GRID.marginX,
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            backgroundColor: COLORS.deepTeal,
            color: COLORS.warmPaper,
            fontFamily: FONTS.mono,
            fontSize: 14,
            fontWeight: 800,
            padding: '5px 14px',
            marginBottom: 14,
            borderRadius: 4,
            letterSpacing: '0.12em',
          }}
        >
          <span>CHOP 01</span>
          <span>//</span>
          <span>THE MATHEMATICAL PUZZLE</span>
        </div>

        <h1
          style={{
            ...TYPOGRAPHY.hero,
            color: COLORS.midnightInk,
            maxWidth: 1100,
            margin: 0,
            fontSize: 94,
          }}
        >
          GAUSSIAN <span style={{ color: COLORS.deepTeal }}>ELIMINATION</span>
        </h1>

        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.terracotta,
            letterSpacing: '0.04em',
            marginTop: 10,
            textTransform: 'uppercase',
          }}
        >
          The Art of Simplifying Linear Systems
        </p>
      </div>

      {/* Center Stage: The 3 Equations Arrive Sequentially */}
      {showEquations && (
        <div
          style={{
            position: 'absolute',
            top: 330,
            left: 540,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 25,
          }}
        >
          <EquationCard
            eqNumber={1}
            equationText="x + y + z = 6"
            delay={110}
            active={frame >= 110 && frame < 200}
            subText="Condition 1"
            width={600}
          />
          <EquationCard
            eqNumber={2}
            equationText="2x + y + 3z = 13"
            delay={160}
            active={frame >= 200 && frame < 290}
            subText="Condition 2"
            width={600}
          />
          <EquationCard
            eqNumber={3}
            equationText="x + 3y + 2z = 13"
            delay={210}
            active={frame >= 290 && frame < 380}
            subText="Condition 3"
            width={600}
          />
        </div>
      )}

      {/* Chaotic Algebraic Sprawl (Visual representation of blind substitution) */}
      {chaosAlpha > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 250,
            right: 80,
            width: 520,
            padding: '28px 32px',
            backgroundColor: COLORS.pureWhite,
            border: `2px solid ${COLORS.terracotta}`,
            borderRadius: 10,
            opacity: chaosAlpha,
            zIndex: 35,
            boxShadow: '0 16px 40px rgba(32, 42, 53, 0.12)',
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 800,
              color: COLORS.terracotta,
              marginBottom: 10,
              letterSpacing: '0.1em',
            }}
          >
            WARNING: ALGEBRAIC EXPLOSION
          </div>
          <p
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              color: COLORS.midnightInk,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            x = 6 - y - z <br />
            2(6 - y - z) + y + 3z = 13 <br />
            12 - 2y - 2z + y + 3z = 13 <br />
            -y + z = 1 ... (Unstructured Sprawl)
          </p>
        </div>
      )}

      {/* Resolution Preview: The Triangular Target (Frames 580+) */}
      {frame > 560 && (
        <div
          style={{
            position: 'absolute',
            top: 320,
            right: 80,
            width: 480,
            backgroundColor: COLORS.pureWhite,
            border: `2px solid ${COLORS.deepTeal}`,
            borderRadius: 10,
            padding: '26px 30px',
            opacity: interpolate(resolveSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(resolveSpring, [0, 1], [0.88, 1])})`,
            zIndex: 30,
            boxShadow: '0 16px 40px rgba(57, 124, 120, 0.15)',
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 13,
              fontWeight: 900,
              color: COLORS.deepTeal,
              marginBottom: 12,
              letterSpacing: '0.12em',
            }}
          >
            TARGET // UPPER TRIANGULAR ECHELON
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              fontWeight: 800,
              color: COLORS.midnightInk,
              lineHeight: 1.6,
              letterSpacing: '0.1em',
            }}
          >
            [ <span style={{ color: COLORS.mutedSaffron }}>■</span> ■ ■ | ■ ]<br />
            [ <span style={{ color: COLORS.terracotta }}>0</span> <span style={{ color: COLORS.mutedSaffron }}>■</span> ■ | ■ ]<br />
            [ <span style={{ color: COLORS.terracotta }}>0</span> <span style={{ color: COLORS.terracotta }}>0</span> <span style={{ color: COLORS.mutedSaffron }}>■</span> | ■ ]
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 15,
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Zeros below diagonal unlock effortless back-substitution!
          </div>
        </div>
      )}

      {/* Animated Vector Rigged GAUSS Character */}
      <Gauss
        pose={gaussPose}
        expression={gaussExpression}
        lookAt={gaussLookAt}
        speaking={isSpeaking}
        x={80}
        y={490}
        scale={0.94}
        delay={20}
      />

      {/* Prominent Documentary-Grade GAUSS Dialogue Caption */}
      <DialogueCaption
        dialogueText={gaussDialogue}
        speaker="GAUSS // THE LINEAR ALGEBRA GUIDE"
        topicTag={captionTopic}
        delay={30}
        width={760}
        style={{
          position: 'absolute',
          left: 480,
          bottom: 40,
        }}
        variant={frame >= 360 && frame < 580 ? 'terracotta' : 'teal'}
      />
    </div>
  );
};
