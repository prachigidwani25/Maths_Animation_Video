import React from 'react';
import { Composition, Series, Audio, staticFile } from 'remotion';
import { Scene01_Hook } from './scenes/Scene01_Hook';
import { Scene02_AugmentedMatrix } from './scenes/Scene02_AugmentedMatrix';
import { Scene03_RowOperations } from './scenes/Scene03_RowOperations';
import { Scene04_GaussianElimination } from './scenes/Scene04_GaussianElimination';
import { Scene05_BackSubstitution } from './scenes/Scene05_BackSubstitution';
import { Scene06_Takeaway } from './scenes/Scene06_Takeaway';

// Master Film Assembly Component with Full Cinematic Soundtrack
export const MasterFilm: React.FC = () => {
  return (
    <>
      {/* Complete Stereo Master Soundtrack: Narration + Sidechain Ducked Cinematic Score */}
      <Audio src={staticFile('final_master_soundtrack.wav')} />
      <Series>
        {/* Scene 01: The Hook (0 - 28.20s) */}
        <Series.Sequence durationInFrames={846}>
          <Scene01_Hook />
        </Series.Sequence>

        {/* Scene 02: Augmented Matrix (28.20 - 57.00s) */}
        <Series.Sequence durationInFrames={864}>
          <Scene02_AugmentedMatrix />
        </Series.Sequence>

        {/* Scene 03: Elementary Row Operations (57.00 - 100.60s) */}
        <Series.Sequence durationInFrames={1308}>
          <Scene03_RowOperations />
        </Series.Sequence>

        {/* Scene 04: Gaussian Elimination Centerpiece (100.60 - 179.00s) */}
        <Series.Sequence durationInFrames={2352}>
          <Scene04_GaussianElimination />
        </Series.Sequence>

        {/* Scene 05: Back-Substitution (179.00 - 207.00s) */}
        <Series.Sequence durationInFrames={840}>
          <Scene05_BackSubstitution />
        </Series.Sequence>

        {/* Scene 06: Synthesis & Master Credits (207.00 - 236.50s) */}
        <Series.Sequence durationInFrames={885}>
          <Scene06_Takeaway />
        </Series.Sequence>
      </Series>
    </>
  );
};

// Scene Wrappers with Master Audio for Standalone Scene Review & Rendering
const Scene01WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={0} endAt={846} />
    <Scene01_Hook />
  </>
);

const Scene02WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={846} endAt={1710} />
    <Scene02_AugmentedMatrix />
  </>
);

const Scene03WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={1710} endAt={3018} />
    <Scene03_RowOperations />
  </>
);

const Scene04WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={3018} endAt={5370} />
    <Scene04_GaussianElimination />
  </>
);

const Scene05WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={5370} endAt={6210} />
    <Scene05_BackSubstitution />
  </>
);

const Scene06WithAudio: React.FC = () => (
  <>
    <Audio src={staticFile('final_master_soundtrack.wav')} startFrom={6210} endAt={7095} />
    <Scene06_Takeaway />
  </>
);

export const Root: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          MASTER DELIVERABLE: COMPLETE GAUSSIAN ELIMINATION FILM (3m 56.5s)
          ========================================================================= */}
      <Composition
        id="ProjectGauss-Final"
        component={MasterFilm}
        durationInFrames={7095}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* =========================================================================
          INDIVIDUAL SCENE COMPOSITIONS (STANDALONE RENDERS & REVIEW)
          ========================================================================= */}
      {/* SCENE 01: CINEMATIC OPENING / THE HOOK (28.2s) */}
      <Composition
        id="Scene01-Hook"
        component={Scene01WithAudio}
        durationInFrames={846}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* SCENE 02: EQUATIONS TO AUGMENTED MATRIX (28.8s) */}
      <Composition
        id="Scene02-AugmentedMatrix"
        component={Scene02WithAudio}
        durationInFrames={864}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* SCENE 03: ELEMENTARY ROW OPERATIONS (43.6s) */}
      <Composition
        id="Scene03-RowOperations"
        component={Scene03WithAudio}
        durationInFrames={1308}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* SCENE 04: THE GAUSSIAN ELIMINATION CENTREPIECE (78.4s) */}
      <Composition
        id="Scene04-GaussianElimination"
        component={Scene04WithAudio}
        durationInFrames={2352}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* SCENE 05: BACK-SUBSTITUTION / THE PAYOFF (28.0s) */}
      <Composition
        id="Scene05-BackSubstitution"
        component={Scene05WithAudio}
        durationInFrames={840}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* SCENE 06: SYNTHESIS & MASTER CREDITS (29.5s) */}
      <Composition
        id="Scene06-Takeaway"
        component={Scene06WithAudio}
        durationInFrames={885}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
