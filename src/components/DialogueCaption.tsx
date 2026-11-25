import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../styles/colors';
import { FONTS, TYPOGRAPHY } from '../styles/typography';

interface DialogueCaptionProps {
  dialogueText: string;
  speaker?: string;
  topicTag?: string;
  delay?: number;
  width?: number;
  style?: React.CSSProperties;
  variant?: 'teal' | 'terracotta' | 'saffron';
}

// Helper to highlight key mathematical terms in speech
const renderFormattedText = (text: string, accentColor: string) => {
  // Regex matches quoted terms, mathematical notation like [A | b], formulas like 3z = 9, (1, 2, 3), R2, etc.
  const regex = /(\[.*?\]|\(.*?\)|(?:[xyz]\s*=\s*\d+)|(?:\d+[xyz]\s*=\s*\d+)|(?:R\d)|pivots?|triangular|echelon|back-substitution|zeros?|invariant|isomorphism)/gi;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span
          key={index}
          style={{
            color: accentColor,
            fontWeight: 800,
            backgroundColor: 'rgba(57, 124, 120, 0.08)',
            padding: '1px 6px',
            borderRadius: 3,
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export const DialogueCaption: React.FC<DialogueCaptionProps> = ({
  dialogueText,
  speaker = 'GAUSS // PRESENTER',
  topicTag,
  delay = 0,
  width = 720,
  style = {},
  variant = 'teal',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const translateY = interpolate(enter, [0, 1], [24, 0]);
  const opacity = interpolate(enter, [0, 0.4, 1], [0, 1, 1]);

  const accentColor =
    variant === 'terracotta'
      ? COLORS.terracotta
      : variant === 'saffron'
      ? COLORS.mutedSaffron
      : COLORS.deepTeal;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        backgroundColor: COLORS.pureWhite,
        borderRadius: 10,
        border: `1.5px solid ${COLORS.hairlineStrong}`,
        borderLeft: `6px solid ${accentColor}`,
        padding: '20px 28px',
        boxShadow: '0 12px 36px rgba(32, 42, 53, 0.09)',
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 45,
        ...style,
      }}
    >
      {/* Speaker Bar & Topic */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: accentColor,
            }}
          />
          <span
            style={{
              ...TYPOGRAPHY.dialogueSpeaker,
              color: accentColor,
            }}
          >
            {speaker}
          </span>
        </div>

        {topicTag && (
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 800,
              color: COLORS.textSecondary,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {topicTag}
          </span>
        )}
      </div>

      {/* Main Dialogue Body */}
      <div
        style={{
          ...TYPOGRAPHY.dialogue,
          color: COLORS.midnightInk,
          letterSpacing: '-0.01em',
        }}
      >
        {renderFormattedText(dialogueText, accentColor)}
      </div>
    </div>
  );
};
