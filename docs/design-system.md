# WARM EDITORIAL DESIGN SYSTEM SPECIFICATION
## PROJECT GAUSS — GAUSSIAN ELIMINATION: THE ART OF SIMPLIFYING LINEAR SYSTEMS

---

### 1. PHILOSOPHICAL FOUNDATION: WARM EDITORIAL

We reject the aggressive, oversaturated look of typical motion graphics in favor of **Swiss International Typographic Design × Warm Editorial**.
Every frame is composed like an exquisite contemporary print publication brought to life: calm, warm neutral backgrounds, razor-sharp midnight ink typography, purposeful deep teal structural accents, selective terracotta action indicators, and muted saffron pivot discoveries.

Mathematics is treated with calm architectural clarity and intellectual dignity.

---

### 2. COLOR TOKEN ARCHITECTURE

Our official palette consists of six immutable Warm Editorial tokens:

| Token Name | Hex Code | Role & Semantics | Visual Weight & Usage |
|---|---|---|---|
| **Warm Paper** | `#F5F2EA` | Primary canvas background. Sets a calm, human, sophisticated base tone. | Dominant ground (>70% of frame area) |
| **Midnight Ink** | `#202A35` | Primary typography, mathematical notation, matrix brackets, axes and structural hairlines. | Structural clarity & high contrast |
| **Deep Teal** | `#397C78` | Primary accent color. Major mathematical headers, bracket accents, character jacket, and structural highlights. | Principal accent (~15% weight) |
| **Terracotta** | `#E4775E` | Active row operations, transformation vectors, directional arrows, and arithmetic derivation steps. | Action / Focus driver (~8% weight) |
| **Muted Saffron**| `#E4B95F` | Pivots, discoveries, key variable emphasis, and eureka moments. | High-value mathematical highlight (~5% weight) |
| **Sage Mist** | `#DCE8E1` | Secondary surfaces, subtle panels, supporting diagrams, card backings. | Supporting surface structure |

#### Color Discipline Rules:
1. **Never use all colors equally:** Warm Paper dominates the background. Midnight Ink delivers crystal-clear legibility. Deep Teal is the primary accent. Terracotta and Muted Saffron are reserved strictly for operations and pivots.
2. **Zero Aggressive Hues:** No oversaturated blues, neon yellows, or harsh chromatic clashes.
3. **Semantic Anchoring:**
   - Pivots are ALWAYS Muted Saffron (`#E4B95F`).
   - Active transformations and directional vectors are ALWAYS Terracotta (`#E4775E`).
   - Permanent algebraic structural truths and section themes are ALWAYS Deep Teal (`#397C78`).

---

### 3. TYPOGRAPHY & TYPE SCALE

The typography leverages **Inter / Modern Grotesk** with strict geometric proportioning and tabular lining numbers ($tnum$).

```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
```

#### The Modular Typographic Scale (1920 × 1080 canvas):

| Scale Token | Font Size | Weight | Tracking | Line Height | Usage |
|---|---|---|---|---|---|
| `display-hero` | 88px | 900 (Black) | -0.04em | 1.0 | Film Title, Giant Numbers (01..05) |
| `display-scene` | 42px | 800 (ExtraBold)| -0.03em | 1.15 | Scene Titles, Solution Vector |
| `math-equation`| 30px | 700 (Bold) | -0.01em | 1.3 | Linear Equations ($x + y + z = 6$) |
| `matrix-cell` | 32px | 800 (ExtraBold)| 0.00em | 1.0 | Matrix Entries ($1, -1, 3, 13$) |
| `heading-section`| 24px | 700 (Bold) | -0.02em | 1.25 | Subsection headers, Operation labels |
| `body-editorial` | 16px | 500 (Medium) | +0.01em | 1.5 | Explanatory sidebars, rule text |
| `label-meta` | 12px | 800 (ExtraBold)| +0.10em | 1.0 | Column headers, Pivot tags, Subtitles (All Caps) |

#### Typographic Rules:
1. **Flush-Left Alignment:** No centered paragraphs. Mathematical derivations align to vertical grid lines.
2. **Phase Numbering:** Every major phase is explicitly numbered (`01 // REPRESENTATION`, `02 // FIRST PIVOT`, `03 // ROW ECHELON`).
3. **Monospaced Number Alignment:** Matrix columns maintain strict tabular lining so decimals, negatives, and double digits never distort matrix column spacing.

---

### 4. 12-COLUMN MODULAR GRID SYSTEM

Canvas: `1920px × 1080px`

```
Margin Left/Right: 96px (5% of width)
Margin Top/Bottom: 64px
Columns: 12 equal columns of 120px each
Gutters: 24px between columns
Baseline Unit: 8px modular baseline
```

Architectural hairlines (`rgba(32, 42, 53, 0.06)`) and subtle registration crosshairs (`rgba(57, 124, 120, 0.3)`) establish Swiss editorial precision on the Warm Paper background.

---

### 5. ANIMATED CHARACTER: GAUSS

GAUSS is a fully vector-rigged SVG character natively integrated into the composition:
- **No static raster crops or rectangular clipping cards.**
- **Wardrobe:** Deep Teal track jacket with Terracotta $\Sigma$ sleeve patch, Warm Paper hoodie featuring the matrix emblem `[ : : ]`, and Midnight Ink wireframe glasses.
- **Natural Biological Motion:** Dynamic blinking cycle, gaze tracking (looking at viewer, equations, or matrix), organic sinusoidal breathing, and mouth shape articulation during speech.
- **Kinematic Gestures:** Explaining, pointing with extended index finger, writing/solving on a digital slate, and celebrating with both arms raised.
