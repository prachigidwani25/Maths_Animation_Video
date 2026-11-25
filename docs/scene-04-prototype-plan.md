# SCENE 04 VISUAL PROTOTYPE IMPLEMENTATION PLAN
## PROJECT GAUSS — THE CENTERPIECE OF GAUSSIAN ELIMINATION

---

### 1. OBJECTIVE & PROTOTYPE GATE

Scene 04 (**The Main Event: Gaussian Elimination**) is the mathematical and visual pinnacle of the entire film.
Before developing all six scenes, we must build, test, and render a complete standalone prototype of Scene 04 to validate:
1. **Chromatic Swiss Visual Quality:** Cobalt Blue field, Lemon Yellow pivot badges, Vivid Orange operation trays, Warm Off-White typography, and Ink Black structural accents.
2. **Gauss Character Integration:** Dynamic pose changes (Focused $\rightarrow$ Pointing $\rightarrow$ Aha! $\rightarrow$ Proud), natural breathing/blinking, non-intrusive positioning in the left quadrant.
3. **Matrix Motion Mechanics:** Independent cell transitions, spring-physics row highlights, vector subtraction breakdowns, and zero reveals.
4. **Camera Choreography:** Subtle zoom into the active pivot, lateral pan to the arithmetic tray, and wide pullback to reveal the final row echelon form.
5. **Strict Mathematical Integrity:** Complete calculation of all three operations ($R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$, $R_3 \leftarrow R_3 + 2R_2$).

---

### 2. SCENE 04 STRUCTURAL BREAKDOWN & PHASING

Total Prototype Duration: 105 seconds (3150 frames @ 30 FPS)

```
[Phase 0: Target Introduction] (Frames 0 - 390 | 13s)
- Initial matrix M0 displays with animated Cobalt Blue brackets
- Lower triangle target zones [(2,1), (3,1), (3,2)] highlight in dashed yellow
- Gauss enters in "Focused" pose, examining the task

[Phase 1: Pivot 1 Identification] (Frames 390 - 690 | 10s)
- Entry (1,1) = 1 is enveloped in an energetic Lemon Yellow badge
- Gauss points toward Pivot 1 ("Explaining" / "Aha!" pose)
- Editorial banner: "PIVOT 01 // LEADING ENTRY AT (1,1)"

[Phase 2: Operation 1 (R2 -> R2 - 2R1)] (Frames 690 - 1290 | 20s)
- Row 2 illuminates with a Vivid Orange glow
- Arithmetic derivation tray drops down: [2, 1, 3 | 13] - 2[1, 1, 1 | 6]
- Step-by-step arithmetic reveals: [0, -1, 1 | 1]
- Entry (2,1) animates from 2 into a bold 0!
- Gauss displays "Aha!" expression

[Phase 3: Operation 2 (R3 -> R3 - R1)] (Frames 1290 - 1830 | 18s)
- Row 3 illuminates in Vivid Orange
- Arithmetic tray displays: [1, 3, 2 | 13] - [1, 1, 1 | 6] = [0, 2, 1 | 7]
- Entry (3,1) animates into 0!
- Column 1 is cleared! Intermediate matrix M1 established

[Phase 4: Pivot 2 Identification] (Frames 1830 - 2190 | 12s)
- Focus shifts diagonally to Entry (2,2) = -1
- Yellow badge pops onto Entry (2,2)
- Gauss nods with "Confident" expression

[Phase 5: Operation 3 (R3 -> R3 + 2R2)] (Frames 2190 - 2790 | 20s)
- Row 3 illuminates
- Arithmetic tray: [0, 2, 1 | 7] + 2[0, -1, 1 | 1] = [0, 0, 3 | 9]
- Entry (3,2) cancels out to 0! Entry (3,3) updates to 3; augment updates to 9
- Gauss looks "Excited" and celebratory

[Phase 6: Row Echelon Synthesis] (Frames 2790 - 3150 | 12s)
- Camera pulls back to full 1920x1080 canvas
- Staircase line renders beneath all pivots
- The three zeros pulse with subtle gold/yellow halos
- Headline: "ROW ECHELON FORM ACHIEVED // TRIANGULAR SYSTEM COMPLETE"
- Gauss stands proud with a wide smile
```

---

### 3. TECHNICAL COMPONENTS REQUIRED

1. `src/styles/colors.ts`: Official Chromatic Swiss palette tokens.
2. `src/styles/typography.ts`: Modular typographic scale and font definitions.
3. `src/components/Matrix.tsx`: Tabular 2D matrix layout with independent cell animations.
4. `src/components/MatrixBracket.tsx`: SVG architectural square brackets with path drawing.
5. `src/components/PivotHighlight.tsx`: Spring-animated Lemon Yellow badge.
6. `src/components/RowOperationTray.tsx`: Animated vector subtraction computation box.
7. `src/character/Gauss.tsx`: Layered character component displaying Gauss with reactive expressions and poses.
8. `src/scenes/Scene04_Elimination.tsx`: The full choreographed Scene 04 composition.
9. `src/Root.tsx`: Remotion composition entry configuring Scene 04 at 1920x1080 @ 30 FPS.

---

### 4. QUALITY ASSURANCE GATES FOR SCENE 04 PROTOTYPE

- **Arithmetic Check:** Every subtraction step verified against `docs/mathematical-verification.md`.
- **Zero Transition Timing:** Cell values do not instantly snap; they scale down, swap value, and spring pop up.
- **Visual Stability:** Brackets and column dividers do not jitter or resize when numbers change length.
- **Render Validation:** Render test frames (e.g. frame 200, frame 800, frame 1500, frame 2400, frame 3000) and verify crisp visual rendering.
