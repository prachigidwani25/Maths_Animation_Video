import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../styles/colors';
import { GRID } from '../styles/grid';

export type SceneBackgroundTheme =
  | 'hook'
  | 'matrix'
  | 'operations'
  | 'elimination'
  | 'substitution'
  | 'takeaway';

interface LivingBackgroundProps {
  theme?: SceneBackgroundTheme;
  showDottedGrid?: boolean;
  intensity?: number;
}

export const LivingBackground: React.FC<LivingBackgroundProps> = ({
  theme = 'hook',
  showDottedGrid = true,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Smooth continuous temporal drivers
  const t = frame * 0.02;
  const tSlow = frame * 0.01;
  const tFast = frame * 0.04;

  // Rich floating mathematical symbols with distinct palette assignments
  const symbols = [
    { char: '∑', baseX: 240, baseY: 180, color: COLORS.deepTeal, speed: 0.7, amp: 16, size: 44 },
    { char: 'ℝ³', baseX: 1720, baseY: 180, color: COLORS.terracotta, speed: 0.5, amp: 14, size: 42 },
    { char: 'det(A)', baseX: 880, baseY: 130, color: COLORS.deepTeal, speed: 0.6, amp: 12, size: 36 },
    { char: 'λ', baseX: 440, baseY: 840, color: COLORS.mutedSaffron, speed: 0.8, amp: 18, size: 40 },
    { char: 'v⃗', baseX: 1620, baseY: 860, color: COLORS.terracotta, speed: 0.6, amp: 15, size: 40 },
    { char: 'Δ', baseX: 1140, baseY: 940, color: COLORS.deepTeal, speed: 0.5, amp: 14, size: 38 },
    { char: 'π', baseX: 1800, baseY: 520, color: COLORS.mutedSaffron, speed: 0.7, amp: 16, size: 36 },
    { char: 'x⃗', baseX: 160, baseY: 380, color: COLORS.terracotta, speed: 0.6, amp: 12, size: 38 },
    { char: 'I₃', baseX: 1420, baseY: 130, color: COLORS.deepTeal, speed: 0.5, amp: 15, size: 34 },
    { char: '∇', baseX: 360, baseY: 960, color: COLORS.deepTeal, speed: 0.7, amp: 14, size: 36 },
  ];

  // Floating geometric micro-shapes for ambient visual texture
  const shapes = [
    { type: 'circle', x: 380, y: 220, r: 12, color: COLORS.mutedSaffron, speed: 0.6 },
    { type: 'circle', x: 1580, y: 280, r: 16, color: COLORS.terracotta, speed: 0.5 },
    { type: 'square', x: 210, y: 780, s: 18, color: COLORS.deepTeal, speed: 0.7 },
    { type: 'diamond', x: 1760, y: 720, s: 20, color: COLORS.mutedSaffron, speed: 0.6 },
    { type: 'circle', x: 920, y: 980, r: 14, color: COLORS.sageMist, speed: 0.5 },
    { type: 'square', x: 1360, y: 880, s: 16, color: COLORS.terracotta, speed: 0.65 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: GRID.width,
        height: GRID.height,
        backgroundColor: COLORS.warmPaper,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* ================= LAYER 1: 12-COLUMN MODULAR SWISS GRID ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: GRID.marginX,
          right: GRID.marginX,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          opacity: gridOpacity,
        }}
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 1,
              height: '100%',
              backgroundColor: COLORS.gridLine,
            }}
          />
        ))}
      </div>

      {/* Horizontal Modular Divisions */}
      <div
        style={{
          position: 'absolute',
          top: GRID.marginY,
          left: 0,
          right: 0,
          bottom: GRID.marginY,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: gridOpacity,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.gridLine,
            }}
          />
        ))}
      </div>

      {/* ================= LAYER 2: RICH COLORFUL LIVING GEOMETRIC GRAPHICS ================= */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: intensity,
        }}
      >
        {/* Defs for gradients & markers */}
        <defs>
          <linearGradient id="tealFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.deepTeal} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLORS.deepTeal} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="terraFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.terracotta} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLORS.terracotta} stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="saffronFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.mutedSaffron} stopOpacity="0.45" />
            <stop offset="100%" stopColor={COLORS.mutedSaffron} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 1. FLOATING COLORFUL MATHEMATICAL SYMBOLS (Clearly visible 0.22 - 0.32 opacity) */}
        {symbols.map((sym, i) => {
          const dy = Math.sin(t * sym.speed + i * 1.2) * sym.amp;
          const dx = Math.cos(tSlow * sym.speed + i * 0.8) * (sym.amp * 0.8);
          return (
            <text
              key={i}
              x={sym.baseX + dx}
              y={sym.baseY + dy}
              fill={sym.color}
              fillOpacity={0.24}
              fontSize={sym.size}
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="800"
              textAnchor="middle"
            >
              {sym.char}
            </text>
          );
        })}

        {/* 2. FLOATING GEOMETRIC SHAPES WITH CONNECTING LINES */}
        {shapes.map((s, i) => {
          const dx = Math.cos(tSlow + i) * 14;
          const dy = Math.sin(tSlow * 1.2 + i) * 14;
          const curX = s.x + dx;
          const curY = s.y + dy;
          const size = s.s ?? 16;
          const radius = s.r ?? 12;

          if (s.type === 'circle') {
            return (
              <g key={i}>
                <circle cx={curX} cy={curY} r={radius} fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.38" />
                <circle cx={curX} cy={curY} r={3} fill={s.color} fillOpacity="0.6" />
              </g>
            );
          } else if (s.type === 'diamond') {
            return (
              <g key={i} transform={`translate(${curX}, ${curY}) rotate(${frame * 0.2})`}>
                <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.38" transform="rotate(45)" />
              </g>
            );
          } else {
            return (
              <g key={i} transform={`translate(${curX}, ${curY}) rotate(${frame * -0.15})`}>
                <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={s.color} fillOpacity="0.18" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.38" rx="2" />
              </g>
            );
          }
        })}

        {/* ================= LAYER 3: DISTINCT THEMATIC BACKGROUND MOTION ================= */}

        {/* ---------------- THEME 01: HOOK (Dynamic Geometry & Compass Engine) ---------------- */}
        {theme === 'hook' && (
          <g>
            {/* Upper Right: Multi-ring Rotating Compass Astrolabe */}
            <g transform={`translate(1640, 250) rotate(${frame * 0.15})`}>
              {/* Outer Saffron Ring */}
              <circle cx="0" cy="0" r="160" stroke={COLORS.mutedSaffron} strokeWidth="2" strokeDasharray="10 8" fill="url(#saffronFade)" opacity="0.35" />
              {/* Mid Teal Ring */}
              <circle cx="0" cy="0" r="120" stroke={COLORS.deepTeal} strokeWidth="1.8" fill="none" opacity="0.4" />
              {/* Inner Terracotta Target */}
              <circle cx="0" cy="0" r="70" stroke={COLORS.terracotta} strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.45" />
              <line x1="-180" y1="0" x2="180" y2="0" stroke={COLORS.deepTeal} strokeWidth="1.5" opacity="0.35" />
              <line x1="0" y1="-180" x2="0" y2="180" stroke={COLORS.deepTeal} strokeWidth="1.5" opacity="0.35" />
              {/* Cardinal Nodes */}
              <circle cx="160" cy="0" r="5" fill={COLORS.terracotta} opacity="0.7" />
              <circle cx="-160" cy="0" r="5" fill={COLORS.terracotta} opacity="0.7" />
              <circle cx="0" cy="160" r="5" fill={COLORS.deepTeal} opacity="0.7" />
              <circle cx="0" cy="-160" r="5" fill={COLORS.deepTeal} opacity="0.7" />
            </g>

            {/* Lower Left: Geometric Orbiting Arc */}
            <g transform={`translate(280, 840) rotate(${-frame * 0.1})`}>
              <circle cx="0" cy="0" r="130" stroke={COLORS.terracotta} strokeWidth="1.8" strokeDasharray="12 8" fill="none" opacity="0.32" />
              <circle cx="0" cy="0" r="90" stroke={COLORS.deepTeal} strokeWidth="1.5" fill="none" opacity="0.3" />
              <circle cx="90" cy="0" r="6" fill={COLORS.mutedSaffron} opacity="0.8" />
            </g>

            {/* Dynamic Sine-wave Intersection Rays across background */}
            <path
              d={`M 80 ${720 + Math.sin(t) * 20} Q 960 ${680 + Math.cos(t) * 25} 1840 ${730 + Math.sin(t * 0.8) * 20}`}
              stroke={COLORS.terracotta}
              strokeWidth="2"
              fill="none"
              opacity="0.25"
              strokeDasharray="6 8"
            />
            <path
              d={`M 80 ${750 + Math.cos(t * 0.9) * 20} Q 960 ${780 + Math.sin(t * 1.1) * 22} 1840 ${710 + Math.cos(t) * 18}`}
              stroke={COLORS.deepTeal}
              strokeWidth="2"
              fill="none"
              opacity="0.22"
              strokeDasharray="8 6"
            />
          </g>
        )}

        {/* ---------------- THEME 02: MATRIX (Isometric Rays & Column Architecture) ---------------- */}
        {theme === 'matrix' && (
          <g>
            {/* Prominent Vertical Matrix Alignment Rays with Shifting Dashes */}
            {[580, 820, 1100, 1380, 1660].map((rx, idx) => {
              const sway = Math.sin(tSlow + idx * 0.8) * 12;
              const color = idx % 2 === 0 ? COLORS.deepTeal : COLORS.terracotta;
              return (
                <g key={idx}>
                  <line
                    x1={rx + sway}
                    y1={0}
                    x2={rx + sway}
                    y2={1080}
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="6 14"
                    opacity="0.22"
                  />
                  {/* Floating alignment nodes along the ray */}
                  <circle cx={rx + sway} cy={220 + idx * 90 + Math.sin(t + idx) * 20} r="4" fill={color} opacity="0.5" />
                </g>
              );
            })}

            {/* Upper Right: Geometric Coordinate Plane Frame */}
            <g transform={`translate(1560, 200) rotate(${frame * 0.08})`}>
              <rect x="-80" y="-80" width="160" height="160" stroke={COLORS.deepTeal} strokeWidth="2" strokeDasharray="8 6" fill="url(#tealFade)" opacity="0.3" />
              <rect x="-50" y="-50" width="100" height="100" stroke={COLORS.mutedSaffron} strokeWidth="1.5" fill="none" opacity="0.38" />
              <circle cx="0" cy="0" r="30" stroke={COLORS.terracotta} strokeWidth="1.5" fill="none" opacity="0.4" />
            </g>

            {/* Lower Left: Matrix Column Bracket Geometry */}
            <g transform={`translate(220, 860) rotate(${-frame * 0.12})`}>
              <rect x="-70" y="-70" width="140" height="140" stroke={COLORS.terracotta} strokeWidth="1.8" strokeDasharray="10 6" fill="url(#terraFade)" opacity="0.3" rx="6" />
              <circle cx="0" cy="0" r="50" stroke={COLORS.deepTeal} strokeWidth="1.5" fill="none" opacity="0.35" />
              <circle cx="0" cy="0" r="6" fill={COLORS.mutedSaffron} opacity="0.8" />
            </g>
          </g>
        )}

        {/* ---------------- THEME 03: OPERATIONS (Parallel Transform Vectors & Invariant Gears) ---------------- */}
        {theme === 'operations' && (
          <g>
            {/* Dynamic Horizontal Transformation Vectors with Arrowheads */}
            {[-1.5, -0.5, 0.5, 1.5].map((step, idx) => {
              const yPos = 400 + step * 160 + Math.sin(t + idx) * 14;
              const color = idx % 2 === 0 ? COLORS.terracotta : COLORS.deepTeal;
              return (
                <g key={idx} opacity="0.28">
                  <line
                    x1="120"
                    y1={yPos}
                    x2="1800"
                    y2={yPos}
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="12 12"
                  />
                  <polygon
                    points={`1810,${yPos} 1792,${yPos - 6} 1792,${yPos + 6}`}
                    fill={color}
                  />
                  <circle cx={400 + idx * 280 + Math.sin(tFast + idx) * 30} cy={yPos} r="5" fill={COLORS.mutedSaffron} />
                </g>
              );
            })}

            {/* Upper Right: Rotating Invariance Permutation Ring */}
            <g transform={`translate(1620, 240) rotate(${frame * 0.2})`}>
              <circle cx="0" cy="0" r="140" stroke={COLORS.deepTeal} strokeWidth="2" strokeDasharray="8 8" fill="url(#tealFade)" opacity="0.35" />
              <circle cx="0" cy="0" r="100" stroke={COLORS.mutedSaffron} strokeWidth="1.8" strokeDasharray="12 6" fill="none" opacity="0.4" />
              <circle cx="0" cy="0" r="60" stroke={COLORS.terracotta} strokeWidth="1.5" fill="none" opacity="0.45" />
              {/* 3 Equidistant Operation Nodes */}
              {[0, 120, 240].map((deg, k) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <circle key={k} cx={Math.cos(rad) * 100} cy={Math.sin(rad) * 100} r="6" fill={COLORS.terracotta} opacity="0.8" />
                );
              })}
            </g>

            {/* Lower Left: Dynamic Directional Shear Quadrant */}
            <g transform={`translate(260, 840) rotate(${-frame * 0.15})`}>
              <rect x="-60" y="-60" width="120" height="120" stroke={COLORS.terracotta} strokeWidth="1.8" fill="url(#terraFade)" opacity="0.3" transform="skewX(15)" />
              <circle cx="0" cy="0" r="45" stroke={COLORS.deepTeal} strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.4" />
            </g>
          </g>
        )}

        {/* ---------------- THEME 04: GAUSSIAN ELIMINATION (Pivot Orbital Radars & Cascade) ---------------- */}
        {theme === 'elimination' && (
          <g>
            {/* Concentric Pulsing Pivot Radar Rings at Matrix Diagonal Coordinates */}
            {[
              { cx: 720, cy: 300, color: COLORS.mutedSaffron, rBase: 65, speed: 1.0 },
              { cx: 830, cy: 370, color: COLORS.deepTeal, rBase: 55, speed: 1.2 },
              { cx: 940, cy: 440, color: COLORS.terracotta, rBase: 45, speed: 1.4 },
            ].map((p, idx) => {
              const pulse = Math.sin(tFast * p.speed + idx) * 8;
              return (
                <g key={idx} opacity="0.35">
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={p.rBase + pulse}
                    fill="none"
                    stroke={p.color}
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={(p.rBase * 0.6) + pulse * 0.5}
                    fill={p.color}
                    fillOpacity="0.12"
                    stroke={p.color}
                    strokeWidth="1.5"
                  />
                  <circle cx={p.cx} cy={p.cy} r="4" fill={p.color} />
                </g>
              );
            })}

            {/* Stepped Echelon Staircase Background Cascade */}
            <path
              d="M 620 240 L 750 240 L 750 320 L 860 320 L 860 400 L 980 400"
              fill="none"
              stroke={COLORS.terracotta}
              strokeWidth="2.5"
              opacity="0.32"
              strokeDasharray="8 6"
            />

            {/* Upper Right: Eliminator Compass Gauge */}
            <g transform={`translate(1620, 260) rotate(${frame * 0.12})`}>
              <circle cx="0" cy="0" r="150" stroke={COLORS.deepTeal} strokeWidth="2" strokeDasharray="10 8" fill="url(#tealFade)" opacity="0.35" />
              <circle cx="0" cy="0" r="110" stroke={COLORS.mutedSaffron} strokeWidth="1.8" fill="none" opacity="0.4" />
              <line x1="-160" y1="0" x2="160" y2="0" stroke={COLORS.terracotta} strokeWidth="1.5" opacity="0.4" />
              <line x1="0" y1="-160" x2="0" y2="160" stroke={COLORS.terracotta} strokeWidth="1.5" opacity="0.4" />
              <circle cx="110" cy="0" r="6" fill={COLORS.terracotta} opacity="0.8" />
              <circle cx="-110" cy="0" r="6" fill={COLORS.terracotta} opacity="0.8" />
            </g>

            {/* Lower-left Triangular Cluster highlighting zeros */}
            <g transform="translate(300, 840)">
              <polygon
                points="0,-80 80,60 -80,60"
                stroke={COLORS.deepTeal}
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="url(#tealFade)"
                opacity="0.28"
                transform={`rotate(${frame * 0.1})`}
              />
              <circle cx="0" cy="0" r="30" stroke={COLORS.mutedSaffron} strokeWidth="1.5" fill="none" opacity="0.4" />
            </g>
          </g>
        )}

        {/* ---------------- THEME 05: BACK-SUBSTITUTION (Harmonic Radial Field & Orbitals) ---------------- */}
        {theme === 'substitution' && (
          <g>
            {/* 16 Harmonic Converging Perspective Rays radiating from Solution Vector Hub */}
            {Array.from({ length: 16 }).map((_, idx) => {
              const deg = idx * 22.5 + frame * 0.08;
              const rad = (deg * Math.PI) / 180;
              const r1 = 140 + Math.sin(t + idx * 0.5) * 12;
              const r2 = 340;
              const cx = 1580;
              const cy = 340;
              const x1 = cx + Math.cos(rad) * r1;
              const y1 = cy + Math.sin(rad) * r1;
              const x2 = cx + Math.cos(rad) * r2;
              const y2 = cy + Math.sin(rad) * r2;
              const color = idx % 2 === 0 ? COLORS.deepTeal : COLORS.mutedSaffron;
              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                  opacity="0.26"
                />
              );
            })}

            {/* Concentric Solution Orbitals in Upper Right */}
            <g transform="translate(1580, 340)">
              <circle cx="0" cy="0" r={110 + Math.sin(t) * 8} stroke={COLORS.mutedSaffron} strokeWidth="2" strokeDasharray="10 6" fill="url(#saffronFade)" opacity="0.38" />
              <circle cx="0" cy="0" r={70 + Math.cos(t) * 6} stroke={COLORS.deepTeal} strokeWidth="1.8" fill="none" opacity="0.4" />
              <circle cx="0" cy="0" r="8" fill={COLORS.terracotta} opacity="0.8" />
            </g>

            {/* Lower Left: Mathematical Equilibrium Rings */}
            <g transform={`translate(260, 820) rotate(${-frame * 0.12})`}>
              <circle cx="0" cy="0" r="120" stroke={COLORS.terracotta} strokeWidth="2" strokeDasharray="12 8" fill="url(#terraFade)" opacity="0.32" />
              <circle cx="0" cy="0" r="80" stroke={COLORS.deepTeal} strokeWidth="1.8" fill="none" opacity="0.38" />
              <rect x="-35" y="-35" width="70" height="70" stroke={COLORS.mutedSaffron} strokeWidth="1.5" fill="none" opacity="0.45" transform="rotate(45)" />
              <circle cx="80" cy="0" r="5" fill={COLORS.mutedSaffron} opacity="0.85" />
            </g>

            {/* Floating verification crosshairs */}
            <g transform="translate(1120, 880)" opacity="0.35">
              <line x1="-30" y1="0" x2="30" y2="0" stroke={COLORS.deepTeal} strokeWidth="2" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke={COLORS.deepTeal} strokeWidth="2" />
              <circle cx="0" cy="0" r="18" stroke={COLORS.mutedSaffron} strokeWidth="1.5" fill="none" />
            </g>
          </g>
        )}

        {/* ---------------- THEME 06: TAKEAWAY (Triumphant Trinity & Harmonic Radiance) ---------------- */}
        {theme === 'takeaway' && (
          <g>
            {/* Glowing Golden Ratio Spirals & Harmonic Circular Field */}
            <g transform="translate(960, 500)">
              {[180, 280, 380, 480].map((radius, idx) => {
                const pulse = Math.sin(tFast + idx * 0.7) * 10;
                const strokeCol = idx % 2 === 0 ? COLORS.deepTeal : COLORS.mutedSaffron;
                return (
                  <circle
                    key={idx}
                    cx="0"
                    cy="0"
                    r={radius + pulse}
                    fill="none"
                    stroke={strokeCol}
                    strokeWidth="1.8"
                    strokeDasharray="12 10"
                    opacity="0.22"
                  />
                );
              })}
              {/* Radiating 12 Architectural Axis Lines */}
              {Array.from({ length: 12 }).map((_, i) => {
                const ang = (i * 30 * Math.PI) / 180 + frame * 0.003;
                return (
                  <line
                    key={i}
                    x1={Math.cos(ang) * 100}
                    y1={Math.sin(ang) * 100}
                    x2={Math.cos(ang) * 520}
                    y2={Math.sin(ang) * 520}
                    stroke={COLORS.terracotta}
                    strokeWidth="1.2"
                    strokeDasharray="6 8"
                    opacity="0.2"
                  />
                );
              })}
            </g>

            {/* Upper Right: Triumphant Compass & Laurels Ring */}
            <g transform={`translate(1620, 220) rotate(${frame * 0.15})`}>
              <circle cx="0" cy="0" r="130" stroke={COLORS.deepTeal} strokeWidth="2" strokeDasharray="8 6" fill="url(#tealFade)" opacity="0.32" />
              <circle cx="0" cy="0" r="90" stroke={COLORS.mutedSaffron} strokeWidth="1.8" strokeDasharray="10 8" fill="none" opacity="0.4" />
              <circle cx="0" cy="0" r="8" fill={COLORS.terracotta} opacity="0.9" />
            </g>

            {/* Lower Left: Master Synthesis Anchor */}
            <g transform={`translate(240, 840) rotate(${-frame * 0.12})`}>
              <rect x="-65" y="-65" width="130" height="130" stroke={COLORS.terracotta} strokeWidth="2" strokeDasharray="10 6" fill="url(#terraFade)" opacity="0.3" rx="8" />
              <circle cx="0" cy="0" r="45" stroke={COLORS.deepTeal} strokeWidth="1.6" fill="none" opacity="0.38" />
              <circle cx="0" cy="0" r="6" fill={COLORS.mutedSaffron} opacity="0.85" />
            </g>
          </g>
        )}

        {/* ================= LAYER 4: ARCHITECTURAL REGISTRATION CROSSHAIRS ================= */}
        {showDottedGrid && (
          <g opacity="0.75">
            {/* Top-left registration crosshair */}
            <g transform={`translate(${GRID.marginX}, ${GRID.marginY})`}>
              <line x1="-14" y1="0" x2="14" y2="0" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="none" stroke={COLORS.terracotta} strokeWidth="1.2" />
            </g>
            {/* Top-right registration crosshair */}
            <g transform={`translate(${GRID.width - GRID.marginX}, ${GRID.marginY})`}>
              <line x1="-14" y1="0" x2="14" y2="0" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="none" stroke={COLORS.terracotta} strokeWidth="1.2" />
            </g>
            {/* Bottom-left registration crosshair */}
            <g transform={`translate(${GRID.marginX}, ${GRID.height - GRID.marginY})`}>
              <line x1="-14" y1="0" x2="14" y2="0" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="none" stroke={COLORS.mutedSaffron} strokeWidth="1.2" />
            </g>
            {/* Bottom-right registration crosshair */}
            <g transform={`translate(${GRID.width - GRID.marginX}, ${GRID.height - GRID.marginY})`}>
              <line x1="-14" y1="0" x2="14" y2="0" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke={COLORS.deepTeal} strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="none" stroke={COLORS.mutedSaffron} strokeWidth="1.2" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
