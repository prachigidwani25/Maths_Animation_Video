# PROJECT GAUSS — CINEMATIC SOUNDTRACK & AUDIO DESIGN SPECIFICATION

**Title:** The Architecture of Truth (Original Cinematic Score for Project GAUSS)  
**Composer:** Project Gauss Sound Design Unit (Algorithmic / Additive & Physical Modeling Engine)  
**License:** **Creative Commons Zero (CC0 1.0 Universal / Public Domain Dedication)**  
**Audio Assets:**
- Master Complete Soundtrack: [`public/final_master_soundtrack.wav`](file:///Users/shriyasdeshmukh/Prachi_Maths_Vid/public/final_master_soundtrack.wav) (48kHz Stereo, 16-bit PCM)
- Ducked Music Stem: [`public/cinematic_score_ducked.wav`](file:///Users/shriyasdeshmukh/Prachi_Maths_Vid/public/cinematic_score_ducked.wav) (44.1kHz Stereo)
- Raw Music Stem: [`public/cinematic_score_raw.wav`](file:///Users/shriyasdeshmukh/Prachi_Maths_Vid/public/cinematic_score_raw.wav) (44.1kHz Stereo)
- Narration Padded Master: [`public/final_narration_padded.wav`](file:///Users/shriyasdeshmukh/Prachi_Maths_Vid/public/final_narration_padded.wav) (24kHz Mono, 236.50s)

---

## 1. CREATIVE DIRECTION & PHILOSOPHY

The musical score for Project GAUSS was composed to elevate the educational film into a modern, minimalist documentary experience (in the tradition of Max Richter, Ólafur Arnalds, and Brian Eno).

### Acoustic Aesthetic
- **Warm & Organic:** Soft felt acoustic piano harmonics, resonant cello-range analog synthesizer pads, and delicate metallic chimes.
- **Intelligent & Inquisitive:** D Dorian / F Major harmonic palette provides deep intellectual clarity without cloying melodrama or generic corporate optimism.
- **Rhythmic Precision:** A gentle 68 BPM clock-like organic wooden pulse enters during matrix transformations, mirroring the mathematical exactitude of Gaussian elimination.
- **Non-Intrusive:** High frequencies above 8 kHz and sub-bass below 60 Hz are gently attenuated. A targeted 4 dB notch is carved into the 1.8 kHz – 2.8 kHz vocal presence band to guarantee narration clarity.

---

## 2. THE SIX SCENE MOVEMENTS & MUSICAL EVOLUTION

```
[00:00 - 00:28.20]  MOVEMENT 01: THE HOOK (Atmospheric Inquisitiveness)
├── Key: Dm9 → Bbmaj7 → Fmaj7 → Asus4
├── Texture: Warm analog pad swells with subtle 0.22 Hz LFO breathing.
├── Motif: Sparse felt piano entering with single inquisitive notes (A4, E4, F4).
└── Narrative Goal: Establish the mystery and challenge of 3-variable linear systems.

[00:28.20 - 00:57.00]  MOVEMENT 02: THE AUGMENTED MATRIX (Analytical Clarity)
├── Key: Fmaj9 → C/E → Dm7 → Bbadd9
├── Texture: Introduction of the 68 BPM organic wooden pulse (clock-like precision).
├── Motif: Ascending 4-note piano phrases as variables are stripped into matrix rows.
└── Narrative Goal: Support the systematic transition from equations to array isomorphism.

[00:57.00 - 01:40.60]  MOVEMENT 03: ELEMENTARY ROW OPERATIONS (Systemic Rules)
├── Key: Dm → Bb → F → C
├── Texture: Subtle stereophonic rhythmic click on 8th notes with mid-warmth.
├── Motif: Soft celesta / kalimba ostinato accompanying the 3 legal moves (Swap, Scale, Combine).
└── Narrative Goal: Establish mathematical momentum and the invariance principle.

[01:40.60 - 02:59.00]  MOVEMENT 04: FORWARD ELIMINATION (The Engine of Discovery)
├── Key: F → Am → Dm → Bb → C → F
├── Texture: Layered piano arpeggios that build subtle intellectual tension.
├── Highlights:
│   ├── 02:15 (135.0s): High metallic chime (A5) rings out as Zero 1 appears in Row 2.
│   ├── 02:36 (156.0s): Higher crystalline chime (C6) marks Col 1 clearing (Zero 2).
│   └── 02:51 (171.0s): Warm orchestral chord resolves as Row Echelon staircase locks!
└── Narrative Goal: Drive purposeful forward progress toward the upper-triangular goal.

[02:59.00 - 03:27.00]  MOVEMENT 05: BACK-SUBSTITUTION (Harmonic Payoff)
├── Key: Bbmaj7 → C → Dm7 → F/A → F
├── Texture: Ascending melodic cascade as each variable unlocks from the bottom up.
├── Highlights: Solved badges for z=3, y=2, x=1 hit on harmonic cadence beats.
└── Narrative Goal: Exhilarating clarity and triumphant 3-way equation verification.

[03:27.00 - 03:56.50]  MOVEMENT 06: SYNTHESIS & OUTRO (Serene Mastery)
├── Key: Fmaj7 → C/E → Bbmaj7 → Fmaj9
├── Texture: Broad, peaceful harmonic plateau honoring the 3 Pillars of Gauss.
├── Outro: Long resonant piano sustain decay into warm paper silence with a final chime at 03:52.
└── Narrative Goal: Sense of lasting educational mastery and aesthetic peace.
```

---

## 3. PROFESSIONAL AUDIO MIXING & DUCKING SPECIFICATIONS

To satisfy the non-negotiable requirement that **narration must always dominate**, we implemented hardware-modeled sidechain compression via FFmpeg's `sidechaincompress` DSP:

| Parameter | Value | Functional Purpose |
| :--- | :--- | :--- |
| **Sidechain Trigger** | `final_narration_padded.wav` | Detects spoken voice amplitude in real time. |
| **Threshold** | `0.035` (-29.1 dB) | Instantly detects speech onset above room silence. |
| **Compression Ratio** | `4.5 : 1` | Compresses background music level during speech. |
| **Attack Time** | `80 ms` | Smooth, musical volume reduction without unnatural sudden drops. |
| **Release Time** | `450 ms` | Gentle, transparent swell back during scene pauses. |
| **Voiceover Level** | `-1.0 dB max / -20.9 dB mean` | Broadcast standard vocal loudness. |
| **Ducked Music Level** | `-19.0 dB max / -40.9 dB mean` | **Exactly 18 to 20 dB below voiceover during speech.** |
| **Master Soundtrack Level** | `-9.0 dB max / -29.8 dB mean` | Clean headroom, 0% clipping, 0% inter-sample distortion. |

---

## 4. LICENSING & ATTRIBUTION DISCLOSURE

- **Composition Title:** *The Architecture of Truth (Project Gauss Master Theme)*
- **Composer / Producer:** Project Gauss Animation Studio (Custom Algorithmic Synthesis Engine)
- **License:** **CC0 1.0 Universal (Public Domain)** — Free for educational, commercial, and broadcast use with zero copyright restrictions.
- **Vocals:** None (100% purely instrumental).
- **Prohibited Material:** No copyrighted sample libraries, commercial stems, or third-party proprietary loops were utilized.
