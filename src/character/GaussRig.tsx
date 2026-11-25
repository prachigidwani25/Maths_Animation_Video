import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/typography';

export type CharacterPose =
  | 'idle'
  | 'explaining'
  | 'pointing'
  | 'solving'
  | 'celebrating'
  | 'thinking';

export type CharacterExpression =
  | 'neutral'
  | 'curious'
  | 'thinking'
  | 'aha'
  | 'confident'
  | 'happy'
  | 'proud'
  | 'surprised'
  | 'focused';

export type LookDirection = 'viewer' | 'right' | 'up-right' | 'down-right';

interface GaussRigProps {
  pose?: CharacterPose;
  expression?: CharacterExpression;
  lookAt?: LookDirection;
  speaking?: boolean;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  dialogueText?: string;
  flip?: boolean;
}

export const GaussRig: React.FC<GaussRigProps> = ({
  pose = 'explaining',
  expression = 'happy',
  lookAt = 'right',
  speaking = false,
  x = 120,
  y = 480,
  scale = 1,
  delay = 0,
  dialogueText,
  flip = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 110 },
  });
  const entranceOffset = interpolate(enterSpring, [0, 1], [-50, 0]);
  const entranceOpacity = interpolate(enterSpring, [0, 0.3, 1], [0, 1, 1]);

  // Breathing & subtle idle motion
  const breathing = Math.sin((frame - delay) / 14) * 3;
  const headBob = Math.sin((frame - delay) / 14) * 1.5;

  // Eye blinking cycle: blinks every ~75 frames for 5 frames
  const blinkCycle = (frame - delay) % 75;
  const isBlinking = blinkCycle >= 70 && blinkCycle < 75;

  // Eyeball gaze offsets based on lookAt
  let pupilOffsetX = 0;
  let pupilOffsetY = 0;
  if (lookAt === 'right') {
    pupilOffsetX = 3.5;
    pupilOffsetY = 0;
  } else if (lookAt === 'up-right') {
    pupilOffsetX = 3.2;
    pupilOffsetY = -2.5;
  } else if (lookAt === 'down-right') {
    pupilOffsetX = 3.0;
    pupilOffsetY = 2.5;
  }

  // Mouth talking animation cycle
  const mouthTalk = speaking ? Math.abs(Math.sin((frame - delay) / 3)) * 6 : 0;

  // Eyebrow angles & heights based on expression
  let browLeftY = 0;
  let browRightY = 0;
  let browLeftRot = 0;
  let browRightRot = 0;
  let headTilt = 0;

  switch (expression) {
    case 'curious':
      browLeftY = -3;
      browRightY = 1;
      browLeftRot = -10;
      browRightRot = 6;
      headTilt = -3;
      break;
    case 'thinking':
      browLeftY = 2;
      browRightY = -2;
      browLeftRot = 8;
      browRightRot = -8;
      headTilt = 4;
      pupilOffsetY = -3.5;
      pupilOffsetX = -1;
      break;
    case 'aha':
      browLeftY = -5;
      browRightY = -5;
      browLeftRot = -14;
      browRightRot = 14;
      headTilt = -2;
      break;
    case 'focused':
      browLeftY = 2;
      browRightY = 2;
      browLeftRot = 10;
      browRightRot = -10;
      headTilt = 1;
      break;
    case 'surprised':
      browLeftY = -6;
      browRightY = -6;
      browLeftRot = -8;
      browRightRot = 8;
      break;
    case 'proud':
    case 'confident':
    case 'happy':
    default:
      browLeftY = -1;
      browRightY = -1;
      browLeftRot = -4;
      browRightRot = 4;
      headTilt = -1;
      break;
  }

  // Arm kinematics based on pose
  let rightArmRotation = -20;
  let rightForearmRotation = 10;
  let leftArmRotation = 15;
  let leftForearmRotation = -15;

  if (pose === 'pointing') {
    rightArmRotation = -65 + Math.sin((frame - delay) / 8) * 2;
    rightForearmRotation = -20;
    leftArmRotation = 20;
    leftForearmRotation = 10;
  } else if (pose === 'explaining') {
    rightArmRotation = -40 + Math.sin((frame - delay) / 10) * 4;
    rightForearmRotation = -35;
    leftArmRotation = 15;
    leftForearmRotation = -10;
  } else if (pose === 'celebrating') {
    rightArmRotation = -145 + Math.sin((frame - delay) / 6) * 5;
    rightForearmRotation = -25;
    leftArmRotation = 145 - Math.sin((frame - delay) / 6) * 5;
    leftForearmRotation = 25;
    headTilt = 0;
  } else if (pose === 'thinking') {
    rightArmRotation = -90;
    rightForearmRotation = -95;
    leftArmRotation = 25;
    leftForearmRotation = -30;
  } else if (pose === 'solving') {
    leftArmRotation = -35;
    leftForearmRotation = -70;
    rightArmRotation = -45 + Math.sin((frame - delay) / 4) * 6;
    rightForearmRotation = -60;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${entranceOffset}px, ${breathing}px) scale(${scale})`,
        opacity: entranceOpacity,
        transformOrigin: 'bottom center',
        zIndex: 50,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Speech / Caption Dialogue Badge (Warm Editorial Style) */}
      {dialogueText && (
        <div
          style={{
            marginBottom: 16,
            backgroundColor: COLORS.pureWhite,
            border: `2px solid ${COLORS.deepTeal}`,
            borderLeft: `5px solid ${COLORS.terracotta}`,
            borderRadius: 6,
            padding: '12px 18px',
            boxShadow: '0 6px 20px rgba(32, 42, 53, 0.08)',
            maxWidth: 340,
            transform: flip ? 'scaleX(-1)' : 'none',
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              fontWeight: 900,
              color: COLORS.terracotta,
              letterSpacing: '0.12em',
              marginBottom: 4,
              textTransform: 'uppercase',
            }}
          >
            GAUSS // {expression.toUpperCase()}
          </div>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.midnightInk,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {dialogueText}
          </p>
        </div>
      )}

      {/* The Rigged Vector SVG Character in Warm Editorial Palette */}
      <svg
        width="320"
        height="440"
        viewBox="0 0 320 440"
        style={{
          overflow: 'visible',
          transform: flip ? 'scaleX(-1)' : 'none',
          filter: 'drop-shadow(0 12px 24px rgba(32, 42, 53, 0.15))',
        }}
      >
        <defs>
          <radialGradient id="lensReflectEditorial" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#DCE8E1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#397C78" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="jacketTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#448B86" />
            <stop offset="100%" stopColor="#2E6864" />
          </linearGradient>
        </defs>

        {/* ================= LOWER BODY / LEGS ================= */}
        <g id="legs" transform="translate(160, 310)">
          {/* Left Leg (Midnight Ink) */}
          <rect x="-38" y="0" width="28" height="95" rx="6" fill="#202A35" />
          {/* Right Leg */}
          <rect x="10" y="0" width="28" height="95" rx="6" fill="#182029" />

          {/* Left Shoe */}
          <g transform="translate(-46, 85)">
            <path d="M 0 10 L 38 10 L 44 24 L -4 24 Z" fill="#F5F2EA" />
            <path d="M 4 14 L 34 14 L 38 22 L 0 22 Z" fill="#397C78" />
            <rect x="12" y="16" width="16" height="4" fill="#E4775E" rx="1" />
            <rect x="-6" y="24" width="52" height="6" rx="2" fill="#202A35" />
          </g>

          {/* Right Shoe */}
          <g transform="translate(6, 85)">
            <path d="M 0 10 L 40 10 L 48 24 L -2 24 Z" fill="#F5F2EA" />
            <path d="M 4 14 L 36 14 L 42 22 L 2 22 Z" fill="#397C78" />
            <rect x="14" y="16" width="16" height="4" fill="#E4775E" rx="1" />
            <rect x="-4" y="24" width="54" height="6" rx="2" fill="#202A35" />
          </g>
        </g>

        {/* ================= TORSO & JACKET ================= */}
        <g id="torso" transform="translate(160, 200)">
          {/* Inner Tee / Hoodie Base (Warm Paper) */}
          <path
            d="M -44 10 L 44 10 L 40 115 L -40 115 Z"
            fill="#F5F2EA"
            stroke="#DCE8E1"
            strokeWidth="1"
          />

          {/* Terracotta Hoodie Drawstrings */}
          <path d="M -16 10 L -12 70" stroke="#E4775E" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 16 10 L 12 70" stroke="#E4775E" strokeWidth="2.5" strokeLinecap="round" />

          {/* Matrix Chest Icon [ ··· ] on Sage Mist surface */}
          <g transform="translate(0, 52)">
            <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#202A35" />
            <text
              x="0"
              y="5"
              fill="#E4B95F"
              fontSize="14"
              fontFamily={FONTS.mono}
              fontWeight="900"
              textAnchor="middle"
            >
              [ : : ]
            </text>
          </g>

          {/* Outer Track Jacket (Deep Teal) - Left Side */}
          <path
            d="M -54 5 L -26 10 L -30 115 L -52 115 Z"
            fill="url(#jacketTeal)"
          />
          {/* Outer Track Jacket - Right Side */}
          <path
            d="M 54 5 L 26 10 L 30 115 L 52 115 Z"
            fill="url(#jacketTeal)"
          />

          {/* Terracotta Collar Lapels */}
          <polygon points="-26,10 -12,45 -22,48 -32,10" fill="#E4775E" />
          <polygon points="26,10 12,45 22,48 32,10" fill="#E4775E" />

          {/* Belt / Waistband */}
          <rect x="-42" y="112" width="84" height="6" fill="#202A35" rx="2" />
        </g>

        {/* ================= LEFT ARM ================= */}
        <g id="leftArm" transform="translate(108, 205)">
          <g transform={`rotate(${leftArmRotation})`}>
            {/* Shoulder & Bicep */}
            <rect x="-14" y="0" width="26" height="58" rx="12" fill="url(#jacketTeal)" />

            {/* Sigma Arm Patch on sleeve (Terracotta badge) */}
            <rect x="-12" y="18" width="14" height="14" rx="2" fill="#E4775E" />
            <text x="-5" y="30" fill="#F5F2EA" fontSize="10" fontWeight="900" textAnchor="middle">
              Σ
            </text>

            {/* Forearm & Hand */}
            <g transform={`translate(0, 52) rotate(${leftForearmRotation})`}>
              <rect x="-12" y="0" width="24" height="52" rx="10" fill="url(#jacketTeal)" />
              {/* Terracotta cuff */}
              <rect x="-10" y="46" width="20" height="6" fill="#E4775E" rx="2" />
              {/* Hand */}
              <circle cx="0" cy="60" r="11" fill="#F7C59F" />
              {/* If solving pose: hold tablet */}
              {pose === 'solving' && (
                <g transform="translate(15, 55) rotate(-15)">
                  <rect x="-24" y="-32" width="48" height="34" rx="4" fill="#202A35" stroke="#E4B95F" strokeWidth="1.5" />
                  <line x1="-16" y1="-22" x2="16" y2="-22" stroke="#397C78" strokeWidth="2" />
                  <line x1="-16" y1="-14" x2="8" y2="-14" stroke="#397C78" strokeWidth="2" />
                </g>
              )}
            </g>
          </g>
        </g>

        {/* ================= RIGHT ARM ================= */}
        <g id="rightArm" transform="translate(212, 205)">
          <g transform={`rotate(${rightArmRotation})`}>
            {/* Shoulder & Bicep */}
            <rect x="-12" y="0" width="26" height="58" rx="12" fill="url(#jacketTeal)" />

            {/* Forearm & Hand */}
            <g transform={`translate(0, 52) rotate(${rightForearmRotation})`}>
              <rect x="-12" y="0" width="24" height="52" rx="10" fill="url(#jacketTeal)" />
              {/* Terracotta cuff */}
              <rect x="-10" y="46" width="20" height="6" fill="#E4775E" rx="2" />

              {/* Hand / Fingers */}
              {pose === 'pointing' ? (
                // Pointing Hand with Index Finger Extended
                <g transform="translate(0, 58)">
                  <circle cx="0" cy="0" r="10" fill="#F7C59F" />
                  <rect x="2" y="-18" width="8" height="22" rx="4" fill="#F7C59F" transform="rotate(25)" />
                  <circle cx="-4" cy="2" r="5" fill="#E8B088" />
                </g>
              ) : pose === 'celebrating' ? (
                // Open Celebrating Hand / High Five
                <g transform="translate(0, 58)">
                  <circle cx="0" cy="0" r="12" fill="#F7C59F" />
                  <rect x="-9" y="-12" width="5" height="12" rx="2" fill="#F7C59F" />
                  <rect x="-3" y="-14" width="5" height="14" rx="2" fill="#F7C59F" />
                  <rect x="3" y="-12" width="5" height="12" rx="2" fill="#F7C59F" />
                </g>
              ) : (
                // Natural Open Explaining Hand
                <g transform="translate(0, 58)">
                  <ellipse cx="2" cy="4" rx="12" ry="10" fill="#F7C59F" />
                  <rect x="4" y="-8" width="7" height="12" rx="3" fill="#F7C59F" transform="rotate(15)" />
                </g>
              )}
            </g>
          </g>
        </g>

        {/* ================= HEAD & FACE RIG ================= */}
        <g id="head" transform={`translate(160, 110) rotate(${headTilt})`}>
          {/* Neck */}
          <rect x="-14" y="32" width="28" height="26" fill="#E8B088" rx="4" />

          {/* Over-ear Headphones around Neck (Midnight Ink + Terracotta) */}
          <g transform="translate(0, 44)">
            <path d="M -48 -8 Q 0 16 48 -8" stroke="#202A35" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="-46" cy="-8" r="14" fill="#202A35" />
            <circle cx="-46" cy="-8" r="8" fill="#E4775E" />
            <circle cx="46" cy="-8" r="14" fill="#202A35" />
            <circle cx="46" cy="-8" r="8" fill="#E4775E" />
          </g>

          {/* Back Volume Hair */}
          <circle cx="0" cy="-6" r="52" fill="#2E241E" />
          <circle cx="-38" cy="-2" r="28" fill="#2E241E" />
          <circle cx="38" cy="-2" r="28" fill="#2E241E" />

          {/* Face Base Shape */}
          <path
            d="M -36 -12 C -36 -46 36 -46 36 -12 C 36 24 22 46 0 46 C -22 46 -36 24 -36 -12 Z"
            fill="#FCD5B5"
          />

          {/* Ears */}
          <circle cx="-38" cy="4" r="8" fill="#F7C59F" />
          <circle cx="38" cy="4" r="8" fill="#F7C59F" />

          {/* Cheeks / Warm Blushing */}
          <ellipse cx="-20" cy="16" rx="7" ry="4" fill="#E4775E" opacity="0.3" />
          <ellipse cx="20" cy="16" rx="7" ry="4" fill="#E4775E" opacity="0.3" />

          {/* Nose */}
          <path d="M 0 4 Q 3 12 -2 14" stroke="#D99770" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* ================= EYES & GLASSES ================= */}
          {/* Left Eye */}
          <g transform="translate(-16, 2)">
            <ellipse cx="0" cy="0" rx="9" ry={isBlinking ? 1 : 9} fill="#FFFFFF" />
            {!isBlinking && (
              <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
                <circle cx="0" cy="0" r="5.5" fill="#2E241E" />
                <circle cx="0" cy="0" r="3" fill="#202A35" />
                <circle cx="-1.5" cy="-1.5" r="1.5" fill="#FFFFFF" />
              </g>
            )}
            {isBlinking && <line x1="-9" y1="0" x2="9" y2="0" stroke="#2E241E" strokeWidth="2.5" />}
          </g>

          {/* Right Eye */}
          <g transform="translate(16, 2)">
            <ellipse cx="0" cy="0" rx="9" ry={isBlinking ? 1 : 9} fill="#FFFFFF" />
            {!isBlinking && (
              <g transform={`translate(${pupilOffsetX}, ${pupilOffsetY})`}>
                <circle cx="0" cy="0" r="5.5" fill="#2E241E" />
                <circle cx="0" cy="0" r="3" fill="#202A35" />
                <circle cx="-1.5" cy="-1.5" r="1.5" fill="#FFFFFF" />
              </g>
            )}
            {isBlinking && <line x1="-9" y1="0" x2="9" y2="0" stroke="#2E241E" strokeWidth="2.5" />}
          </g>

          {/* Round Midnight Ink Wireframe Glasses */}
          <circle cx="-16" cy="2" r="15" fill="url(#lensReflectEditorial)" stroke="#202A35" strokeWidth="3" />
          <circle cx="16" cy="2" r="15" fill="url(#lensReflectEditorial)" stroke="#202A35" strokeWidth="3" />
          <line x1="-1" y1="0" x2="1" y2="0" stroke="#202A35" strokeWidth="2.8" />
          <line x1="-31" y1="0" x2="-38" y2="-4" stroke="#202A35" strokeWidth="2.2" />
          <line x1="31" y1="0" x2="38" y2="-4" stroke="#202A35" strokeWidth="2.2" />

          {/* ================= EYEBROWS ================= */}
          <g transform={`translate(-16, ${-14 + browLeftY}) rotate(${browLeftRot})`}>
            <path d="M -11 0 Q 0 -5 11 0" stroke="#2E241E" strokeWidth="3.8" fill="none" strokeLinecap="round" />
          </g>
          <g transform={`translate(16, ${-14 + browRightY}) rotate(${browRightRot})`}>
            <path d="M -11 0 Q 0 -5 11 0" stroke="#2E241E" strokeWidth="3.8" fill="none" strokeLinecap="round" />
          </g>

          {/* ================= MOUTH ================= */}
          <g transform={`translate(0, ${26 + headBob})`}>
            {expression === 'aha' || expression === 'surprised' ? (
              <ellipse cx="0" cy={0} rx="7" ry={8 + mouthTalk} fill="#5A231C" stroke="#3D120E" strokeWidth="1.8" />
            ) : expression === 'happy' || expression === 'proud' || expression === 'confident' ? (
              <g>
                <path d="M -13 0 Q 0 14 13 0 Z" fill="#5A231C" stroke="#3D120E" strokeWidth="1.5" />
                <path d="M -10 0 Q 0 4 10 0 Z" fill="#FFFFFF" />
              </g>
            ) : speaking ? (
              <ellipse cx="0" cy={0} rx="8" ry={4 + mouthTalk} fill="#5A231C" />
            ) : (
              <path d="M -9 0 Q 0 6 9 0" stroke="#3D120E" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* ================= STYLISH TOUSLED WAVY HAIR ================= */}
          <g id="frontHair" fill="#2E241E">
            <path d="M -42 -22 Q -24 -56 4 -48 Q 28 -56 44 -26 Q 38 -38 18 -40 Q -10 -42 -30 -30 Z" />
            <path d="M -14 -46 C -12 -62 18 -64 22 -44 C 14 -50 0 -50 -14 -46 Z" fill="#3D2E26" />
            <path d="M -32 -26 C -38 -44 -14 -42 -2 -34 C -14 -40 -28 -38 -32 -26 Z" />
            <path d="M 12 -38 C 28 -48 42 -32 38 -16 C 36 -28 24 -34 12 -38 Z" fill="#3D2E26" />
          </g>
        </g>
      </svg>
    </div>
  );
};
