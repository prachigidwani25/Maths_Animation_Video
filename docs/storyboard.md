# SIX-SCENE CINEMATIC STORYBOARD
## PROJECT GAUSS — GAUSSIAN ELIMINATION: THE ART OF SIMPLIFYING LINEAR SYSTEMS

---

### SCENE 01 — THE HOOK: THE CHALLENGE OF LINEAR SYSTEMS
- **Target Timecode:** `0:00 – 0:35` (Frames `0 – 1050` at 30 FPS)
- **Visual Tone & Environment:** Bold Cobalt Blue background (`#0038FF`), high-contrast Warm Off-White (`#F7F4E8`) typography, thin structural ink grids.
- **Story & Composition:**
  - **Shot 1.1 (0:00–0:05):** Screen opens on a geometric grid wipe. Massive Swiss editorial header: `PROJECT GAUSS // 01`. Title text springs into view: `GAUSSIAN ELIMINATION: THE ART OF SIMPLIFYING LINEAR SYSTEMS`.
  - **Shot 1.2 (0:05–0:18):** Three linear equations cascade into 3 separate modular cards:
    - Card 1: $x + y + z = 6$
    - Card 2: $2x + y + 3z = 13$
    - Card 3: $x + 3y + 2z = 13$
  - **Shot 1.3 (0:18–0:26):** Gauss enters on the left, looking curious and perplexed. Tangled geometric lines connect the variables to symbolize the algebraic knot.
  - **Shot 1.4 (0:26–0:35):** Gauss straightens up, confident. A bright Lemon Yellow diagonal staircase outline slides across the frame, introducing our mission: convert this tangled system into a clear triangular hierarchy.

---

### SCENE 02 — UNDERSTANDING THE CONCEPT: THE AUGMENTED MATRIX
- **Target Timecode:** `0:35 – 1:10` (Frames `1050 – 2100` at 30 FPS)
- **Visual Tone & Environment:** Warm Off-White base (`#F7F4E8`), Ink Black typography (`#111111`), Cobalt Blue structural brackets.
- **Story & Composition:**
  - **Shot 2.1 (0:35–0:48):** The algebraic variable symbols $x, y, z$ softly morph and fade out, revealing their pure coefficients:
    $[1, 1, 1]$, $[2, 1, 3]$, $[1, 3, 2]$.
  - **Shot 2.2 (0:48–0:58):** Vertical Cobalt Blue matrix brackets snap in with crisp spring physics. A vertical dividing hairline separates the coefficient matrix $A$ from the constant vector $\mathbf{b} = [6, 13, 13]^T$.
  - **Shot 2.3 (0:58–1:10):** Editorial headers label the columns: `COL 1 (x)`, `COL 2 (y)`, `COL 3 (z)`, and `AUGMENT (=)`. Gauss points proudly at the matrix: every single piece of information from the original system is preserved without algebraic noise.

---

### SCENE 03 — VISUAL INTUITION: ELEMENTARY ROW OPERATIONS
- **Target Timecode:** `1:10 – 1:55` (Frames `2100 – 3450` at 30 FPS)
- **Visual Tone & Environment:** Three-column Swiss modular layout, high contrast, vivid accents.
- **Story & Composition:**
  - **Shot 3.1 (1:10–1:22):** Headline: `THE 3 LEGAL MOVES // ELEMENTARY ROW OPERATIONS`. Gauss stands as the teacher, introducing the three invariants that preserve the solution space.
  - **Shot 3.2 (1:22–1:32):** *Move 1: Row Swap ($R_i \leftrightarrow R_j$)*. Two matrix rows smoothly exchange vertical positions with animated blue curved motion trails. Intuition: changing equation order doesn't change reality.
  - **Shot 3.3 (1:32–1:42):** *Move 2: Scalar Multiplication ($R_i \leftarrow k R_i, k \neq 0$)*. A row lights up with a scalar badge $(\times 2)$, multiplying each entry, then dividing back $(\times 1/2)$. Intuition: scaling both sides maintains equivalence.
  - **Shot 3.4 (1:42–1:55):** *Move 3: Linear Combination ($R_i \leftarrow R_i + k R_j$)*. Vector addition tray demonstrates that subtracting a multiple of another row can be reversed identically ($E^{-1}$ exists), preserving the exact intersection point in 3D space.

---

### SCENE 04 — THE MAIN EVENT: GAUSSIAN ELIMINATION
- **Target Timecode:** `1:55 – 3:40` (Frames `3450 – 6600` at 30 FPS)
- **Visual Tone & Environment:** Cobalt Blue stage, Lemon Yellow pivot spotlights, Vivid Orange active calculation trays.
- **Story & Composition:**
  - **Shot 4.1 (1:55–2:08):** Target visualization: The lower triangle entries $(2,1), (3,1), (3,2)$ are shown with glowing target markers. Our mission is to transform them into zeros.
  - **Shot 4.2 (2:08–2:18):** **Pivot 1 Identified:** Entry $(1,1) = 1$ is spotlighted with a Lemon Yellow badge. Gauss points with focused determination.
  - **Shot 4.3 (2:18–2:38):** **Operation 1 ($R_2 \leftarrow R_2 - 2R_1$):** Row 2 slides forward with a Vivid Orange glow. Below it, an arithmetic breakdown tray appears:
    $[2, 1, 3 \mid 13] - [2, 2, 2 \mid 12] = [0, -1, 1 \mid 1]$.
    The first entry $2$ flips into an emphatic $0$! Gauss reacts with an `Aha!` expression.
  - **Shot 4.4 (2:38–2:56):** **Operation 2 ($R_3 \leftarrow R_3 - R_1$):** Row 3 activates. Arithmetic breakdown:
    $[1, 3, 2 \mid 13] - [1, 1, 1 \mid 6] = [0, 2, 1 \mid 7]$.
    Entry $(3,1)$ flips into $0$! Column 1 below the pivot is cleared!
  - **Shot 4.5 (2:56–3:08):** **Pivot 2 Identified:** The focus shifts diagonally to Entry $(2,2) = -1$. Spotlight pulses in Lemon Yellow.
  - **Shot 4.6 (3:08–3:28):** **Operation 3 ($R_3 \leftarrow R_3 + 2R_2$):** Row 3 and Row 2 activate. Tray:
    $[0, 2, 1 \mid 7] + 2[0, -1, 1 \mid 1] = [0, 0, 3 \mid 9]$.
    Entry $(3,2)$ cancels out into $0$! Entry $(3,3)$ updates to $3$, augment updates to $9$.
  - **Shot 4.7 (3:28–3:40):** The camera pulls back. The three zeros $[(2,1), (3,1), (3,2)]$ glow. An architectural yellow staircase step renders under the pivots. Headline: `ROW ECHELON FORM ACHIEVED`. Gauss smiles with pride.

---

### SCENE 05 — BACK-SUBSTITUTION AND SOLUTION
- **Target Timecode:** `3:40 – 4:35` (Frames `6600 – 8250` at 30 FPS)
- **Visual Tone & Environment:** Warm Off-White background, Ink Black equations, Lemon Yellow solution cards.
- **Story & Composition:**
  - **Shot 5.1 (3:40–3:52):** Matrix transitions into 3 clean decoupled equations. A glowing upward arrow marks the bottom-up sequence.
  - **Shot 5.2 (3:52–4:04):** **Solving for z:** $3z = 9 \implies z = 3$. A bold yellow badge pops up: $z = 3$.
  - **Shot 5.3 (4:04–4:18):** **Solving for y:** $-y + z = 1 \implies -y + 3 = 1 \implies y = 2$. Second badge pops up: $y = 2$.
  - **Shot 5.4 (4:18–4:28):** **Solving for x:** $x + y + z = 6 \implies x + 2 + 3 = 6 \implies x = 1$. Third badge pops up: $x = 1$.
  - **Shot 5.5 (4:28–4:35):** The solution vector $\mathbf{x} = (1, 2, 3)^T$ docks into the hero position. All three original equations reappear, and each is verified with satisfying checkmarks.

---

### SCENE 06 — THE FINAL TAKEAWAY
- **Target Timecode:** `4:35 – 5:00` (Frames `8250 – 9000` at 30 FPS)
- **Visual Tone & Environment:** Chromatic Swiss celebratory poster, Cobalt Blue ground, Vivid Orange and Lemon Yellow geometric blocks.
- **Story & Composition:**
  - **Shot 6.1 (4:35–4:48):** Three oversized editorial pillars display the core mental model:
    `01 // AUGMENTED MATRIX` (System representation)  
    `02 // ROW ECHELON FORM` (Eliminate below pivots)  
    `03 // BACK-SUBSTITUTION` (Unravel from bottom up)  
  - **Shot 6.2 (4:48–5:00):** Gauss jumps into the frame, hands raised in full celebration! Closing title card: `PROJECT GAUSS // MASTERED`. References, credits, and formal AI disclosure display cleanly on the right quadrant.
