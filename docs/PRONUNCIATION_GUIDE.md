# PRONUNCIATION GUIDE FOR ELEVENLABS NARRATION
## PROJECT GAUSS — GAUSSIAN ELIMINATION

To ensure natural, fluid, and phonetically precise text-to-speech generation when recording with ElevenLabs, use the following spoken conventions:

---

### 1. MATHEMATICAL TERMINOLOGY

| Written Term | Recommended Spoken Text (Phonetic / Natural) | What to Avoid |
|---|---|---|
| **Gaussian elimination** | `GAW-see-un ee-lim-ih-NAY-shun` | Don't say "GOW-shun" or "Gawss-ian" awkwardly. |
| **Augmented matrix** | `awg-MEN-tid MAY-triks` | |
| **Row echelon form** | `row ESH-uh-lon form` | Do not pronounce the "ch" as in "chair" ("ech-elon"). It is "esh-e-lon". |
| **Pivot** | `PIH-vut` | |
| **Back-substitution** | `back sub-stih-TOO-shun` | |
| **Coefficients** | `koh-eh-FISH-unts` | |
| **Homogeneous / Non-homogeneous** | `non-hoh-moh-JEE-nee-us` | |

---

### 2. ROW NOTATION & EQUATION REFERENCES

| Notation | Natural Spoken Form in ElevenLabs | Notes |
|---|---|---|
| **$R_1$** | `Row one` | Never pronounce as "R-one" or "R sub one". |
| **$R_2$** | `Row two` | Never pronounce as "R-two". |
| **$R_3$** | `Row three` | Never pronounce as "R-three". |
| **$R_2 \leftarrow R_2 - 2R_1$** | `Row two becomes row two minus two times row one` or `Replace row two with row two minus two row one` | Keep it spoken and natural. |
| **$R_3 \leftarrow R_3 - R_1$** | `Row three becomes row three minus row one` | |
| **$R_3 \leftarrow R_3 + 2R_2$** | `Row three becomes row three plus two times row two` | |
| **$[A \mid \mathbf{b}]$** | `A augmented with b` or `The augmented matrix` | Never say "A vertical bar b". |

---

### 3. VARIABLES & NUMERICAL EXPRESSIONS

| Expression | Spoken Form |
|---|---|
| **$x + y + z = 6$** | `x plus y plus z equals six` |
| **$2x + y + 3z = 13$** | `two x plus y plus three z equals thirteen` |
| **$x + 3y + 2z = 13$** | `x plus three y plus two z equals thirteen` |
| **$3z = 9$** | `three z equals nine` |
| **$-y + z = 1$** | `minus y plus z equals one` or `negative y plus z equals one` |
| **$(x, y, z) = (1, 2, 3)$** | `x equals one, y equals two, and z equals three` |
| **$3 \times 3$** | `three by three` |
| **$3 \times 4$** | `three by four` |

---

### 4. PACING & INFLECTION TIPS FOR ELEVENLABS

- **Commas (`,`)**: Create a 0.25-second natural breath pause.
- **Periods (`.` )**: Create a 0.5-second structural pause. Use between mathematical steps.
- **Em-dashes (`—`)**: Use to build anticipation before revealing a pivot or a zero entry.
- **Ellipses (`...`)**: Provide a brief reflective pause before Gauss discovers an insight.
