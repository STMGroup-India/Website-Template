"use client";
import { useEffect, useState, useMemo } from "react";

/* ── Monza-inspired circuit path (closed loop) ── */
const CIRCUIT =
  "M 600 80 C 750 80, 900 120, 950 220 S 1000 420, 920 520 C 840 620, 650 640, 580 720 S 500 880, 550 980 C 600 1080, 800 1100, 850 1200 S 820 1380, 700 1420 C 580 1460, 400 1400, 340 1300 S 200 1100, 220 980 C 240 860, 350 800, 380 700 S 300 520, 280 420 C 260 320, 320 200, 420 140 S 520 80, 600 80 Z";

/* ── Tiny F1 car SVG (top-down silhouette) ── */
function F1Car({ color, x, y, angle }: { color: string; x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle})`}>
      {/* Body */}
      <rect x="-12" y="-5" width="24" height="10" rx="4" fill={color} />
      {/* Nose */}
      <polygon points="12,-3 18,0 12,3" fill={color} />
      {/* Rear wing */}
      <rect x="-14" y="-6" width="3" height="12" rx="1" fill={color} opacity="0.8" />
      {/* Front wheels */}
      <rect x="6" y="-7" width="5" height="2.5" rx="1" fill="#222" />
      <rect x="6" y="4.5" width="5" height="2.5" rx="1" fill="#222" />
      {/* Rear wheels */}
      <rect x="-11" y="-7.5" width="5" height="3" rx="1" fill="#222" />
      <rect x="-11" y="4.5" width="5" height="3" rx="1" fill="#222" />
      {/* Helmet */}
      <circle cx="4" cy="0" r="2.5" fill="#fff" opacity="0.7" />
    </g>
  );
}

/* ── Get point + angle along an SVG path at a given fraction (0-1) ── */
function getPointOnPath(pathEl: SVGPathElement | null, fraction: number) {
  if (!pathEl) return { x: 0, y: 0, angle: 0 };
  const len = pathEl.getTotalLength();
  const t = ((fraction % 1) + 1) % 1; // wrap 0-1
  const p = pathEl.getPointAtLength(t * len);
  const p2 = pathEl.getPointAtLength(((t * len) + 2) % len);
  const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
  return { x: p.x, y: p.y, angle };
}

const CARS = [
  { color: "#e11d48", offset: 0 },      // Red (Ferrari-ish)
  { color: "#0ea5e9", offset: 0.18 },    // Blue (Alpine-ish)
  { color: "#f97316", offset: 0.35 },    // Orange (McLaren-ish)
  { color: "#16a34a", offset: 0.55 },    // Green (Aston-ish)
  { color: "#171717", offset: 0.72 },    // Black (Mercedes-ish)
];

export default function KerbBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [pathEl, setPathEl] = useState<SVGPathElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll drives car position along the circuit
  const scrollFraction = scrollY * 0.00025;

  const carPositions = useMemo(() => {
    return CARS.map((car) => {
      const pos = getPointOnPath(pathEl, scrollFraction + car.offset);
      return { ...car, ...pos };
    });
  }, [pathEl, scrollFraction]);

  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none z-0 overflow-hidden"
      style={{ height: "calc(100% - 200px)" }}
      aria-hidden="true"
    >
      {/* Soft red ambient glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.05] rounded-full"
        style={{ background: "radial-gradient(circle, #e11d48, transparent 70%)" }} />

      <svg
        className="absolute"
        style={{
          width: "1200px",
          height: "1550px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        viewBox="0 0 1200 1550"
        fill="none"
      >
        {/* Track surface (asphalt) */}
        <path d={CIRCUIT} stroke="#e8e8e8" strokeWidth="70" strokeLinejoin="round" fill="none" opacity="0.45" />

        {/* Kerb - outer (red/white) */}
        <path
          d={CIRCUIT}
          stroke="url(#kerbOuter)"
          strokeWidth="6"
          fill="none"
          opacity="0.35"
          strokeDasharray="12 12"
          style={{ filter: "url(#kerbOffset1)" }}
        />
        {/* Kerb - inner (red/white) */}
        <path
          d={CIRCUIT}
          stroke="url(#kerbInner)"
          strokeWidth="6"
          fill="none"
          opacity="0.35"
          strokeDasharray="12 12"
          style={{ filter: "url(#kerbOffset2)" }}
        />

        {/* Center dashed line */}
        <path d={CIRCUIT} stroke="#d4d4d4" strokeWidth="1.5" strokeDasharray="16 12" fill="none" opacity="0.5" />

        {/* Hidden path for measuring car positions */}
        <path ref={(el) => setPathEl(el)} d={CIRCUIT} fill="none" stroke="none" />

        {/* F1 Cars */}
        {pathEl && carPositions.map((car, i) => (
          <F1Car key={i} color={car.color} x={car.x} y={car.y} angle={car.angle} />
        ))}

        {/* Start/finish line */}
        <line x1="590" y1="55" x2="610" y2="55" stroke="#222" strokeWidth="3" opacity="0.3" />
        <rect x="595" y="48" width="10" height="14" fill="url(#checkerPattern)" opacity="0.25" />

        <defs>
          <pattern id="kerbOuter" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="12" height="24" fill="#e11d48" />
            <rect x="12" width="12" height="24" fill="#fff" />
          </pattern>
          <pattern id="kerbInner" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="12" height="24" fill="#fff" />
            <rect x="12" width="12" height="24" fill="#e11d48" />
          </pattern>
          <pattern id="checkerPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="#222" />
            <rect x="2" y="2" width="2" height="2" fill="#222" />
            <rect x="2" width="2" height="2" fill="#fff" />
            <rect y="2" width="2" height="2" fill="#fff" />
          </pattern>
          {/* Offset filters to push kerbs to outer/inner edges of track */}
          <filter id="kerbOffset1">
            <feOffset dx="0" dy="-32" />
          </filter>
          <filter id="kerbOffset2">
            <feOffset dx="0" dy="32" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
