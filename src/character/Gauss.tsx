import React from 'react';
import { GaussRig, CharacterPose, CharacterExpression, LookDirection } from './GaussRig';

export type GaussPose =
  | 'hero'
  | 'explaining'
  | 'solving'
  | 'presenting'
  | 'celebrating'
  | 'pointing'
  | 'thinking'
  | 'idle';

export type GaussExpression =
  | 'excited'
  | 'curious'
  | 'thinking'
  | 'aha'
  | 'confident'
  | 'confused'
  | 'surprised'
  | 'focused'
  | 'happy'
  | 'proud';

interface GaussProps {
  pose?: GaussPose;
  expression?: GaussExpression;
  lookAt?: LookDirection;
  speaking?: boolean;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  dialogueText?: string;
  flip?: boolean;
}

export const Gauss: React.FC<GaussProps> = ({
  pose = 'explaining',
  expression = 'happy',
  lookAt = 'right',
  speaking = false,
  x = 100,
  y = 480,
  scale = 1,
  delay = 0,
  dialogueText,
  flip = false,
}) => {
  // Map legacy poses to rigged poses
  let mappedPose: CharacterPose = 'explaining';
  if (pose === 'hero' || pose === 'idle') mappedPose = 'idle';
  else if (pose === 'pointing' || pose === 'presenting') mappedPose = 'pointing';
  else if (pose === 'solving') mappedPose = 'solving';
  else if (pose === 'celebrating') mappedPose = 'celebrating';
  else if (pose === 'thinking') mappedPose = 'thinking';
  else mappedPose = 'explaining';

  // Map legacy expressions
  let mappedExpression: CharacterExpression = 'happy';
  if (expression === 'confused' || expression === 'curious') mappedExpression = 'curious';
  else if (expression === 'thinking') mappedExpression = 'thinking';
  else if (expression === 'aha') mappedExpression = 'aha';
  else if (expression === 'focused') mappedExpression = 'focused';
  else if (expression === 'surprised') mappedExpression = 'surprised';
  else if (expression === 'proud' || expression === 'excited') mappedExpression = 'proud';
  else if (expression === 'confident') mappedExpression = 'confident';
  else mappedExpression = 'happy';

  return (
    <GaussRig
      pose={mappedPose}
      expression={mappedExpression}
      lookAt={lookAt}
      speaking={speaking}
      x={x}
      y={y}
      scale={scale}
      delay={delay}
      dialogueText={dialogueText}
      flip={flip}
    />
  );
};

export { GaussRig };
