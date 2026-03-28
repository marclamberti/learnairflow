/* ─── Flo the Robot — Shared SVG building blocks ─── */

export const C = {
  head: "#4988C4",
  body: "#1C4D8D",
  dark: "#0F2854",
  green: "#58CC02",
  light: "#BDE8F5",
  white: "#FFFFFF",
} as const;

export interface MascotProps {
  className?: string;
}

/* ── Antenna + Propeller ── */

export function Antenna({ fast }: { fast?: boolean }) {
  return (
    <g>
      {/* Glow behind propeller */}
      <circle
        cx={100}
        cy={12}
        r={8}
        fill={C.green}
        opacity={0.45}
        className="animate-antenna-glow"
      />
      {/* Stick */}
      <rect x={97} y={18} width={6} height={24} rx={3} fill={C.head} />
      {/* Propeller blades */}
      <g
        className={fast ? "animate-propeller-fast" : "animate-propeller"}
        style={{ transformOrigin: "100px 12px" }}
      >
        <ellipse
          cx={100}
          cy={12}
          rx={18}
          ry={4}
          fill={C.light}
          opacity={0.85}
          transform="rotate(30 100 12)"
        />
        <ellipse
          cx={100}
          cy={12}
          rx={18}
          ry={4}
          fill={C.light}
          opacity={0.85}
          transform="rotate(150 100 12)"
        />
        {/* Hub */}
        <circle cx={100} cy={12} r={4} fill={C.head} />
      </g>
    </g>
  );
}

/* ── Head (shape + ear bolts + visor background) ── */

export function HeadShape() {
  return (
    <g>
      <rect x={36} y={42} width={128} height={82} rx={30} fill={C.head} />
      {/* Ear bolts */}
      <circle cx={40} cy={82} r={7} fill={C.light} />
      <circle cx={160} cy={82} r={7} fill={C.light} />
      {/* Visor */}
      <rect x={50} y={54} width={100} height={46} rx={16} fill={C.dark} />
    </g>
  );
}

/* ── Eyes ── */

export function NormalEyes({ blink = true }: { blink?: boolean }) {
  const eyes = (
    <>
      <circle cx={76} cy={75} r={11} fill={C.white} />
      <circle cx={76} cy={77} r={6} fill={C.green} />
      <circle cx={73} cy={72} r={2.5} fill={C.white} opacity={0.9} />
      <circle cx={124} cy={75} r={11} fill={C.white} />
      <circle cx={124} cy={77} r={6} fill={C.green} />
      <circle cx={121} cy={72} r={2.5} fill={C.white} opacity={0.9} />
    </>
  );
  if (!blink) return <g>{eyes}</g>;
  return (
    <g className="animate-blink" style={{ transformOrigin: "100px 75px" }}>
      {eyes}
    </g>
  );
}

/* ── Mouth ── */

export function Smile() {
  return (
    <path
      d="M 84 92 Q 100 104 116 92"
      stroke={C.light}
      strokeWidth={2.5}
      fill="none"
      strokeLinecap="round"
    />
  );
}

/* ── Neck ── */

export function NeckJoint() {
  return <rect x={90} y={122} width={20} height={14} rx={6} fill={C.light} />;
}

/* ── Torso + chest screen + DAG pattern ── */

export function Torso({ dagActive }: { dagActive?: boolean }) {
  const nodeColor = dagActive ? C.green : C.head;
  return (
    <g>
      <rect x={42} y={132} width={116} height={72} rx={22} fill={C.body} />
      {/* Chest screen */}
      <rect x={60} y={142} width={80} height={42} rx={10} fill={C.dark} />
      {/* Diamond DAG */}
      <line x1={100} y1={150} x2={82} y2={163} stroke={nodeColor} strokeWidth={1.5} opacity={0.6} />
      <line x1={100} y1={150} x2={118} y2={163} stroke={nodeColor} strokeWidth={1.5} opacity={0.6} />
      <line x1={82} y1={163} x2={100} y2={176} stroke={nodeColor} strokeWidth={1.5} opacity={0.6} />
      <line x1={118} y1={163} x2={100} y2={176} stroke={nodeColor} strokeWidth={1.5} opacity={0.6} />
      <circle cx={100} cy={150} r={3} fill={nodeColor} />
      <circle cx={82} cy={163} r={3} fill={nodeColor} />
      <circle cx={118} cy={163} r={3} fill={nodeColor} />
      <circle cx={100} cy={176} r={3} fill={nodeColor} />
    </g>
  );
}

/* ── Legs + feet ── */

export function Legs() {
  return (
    <g>
      <rect x={66} y={202} width={22} height={26} rx={10} fill={C.head} />
      <rect x={112} y={202} width={22} height={26} rx={10} fill={C.head} />
      <ellipse cx={77} cy={230} rx={18} ry={8} fill={C.head} />
      <ellipse cx={123} cy={230} rx={18} ry={8} fill={C.head} />
    </g>
  );
}

/* ── Arm helper (thick rounded line + hand circle) ── */

export function Arm({
  x1,
  y1,
  x2,
  y2,
  handR = 10,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  handR?: number;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={C.head}
        strokeWidth={22}
        strokeLinecap="round"
      />
      <circle cx={x2} cy={y2} r={handR} fill={C.light} />
    </g>
  );
}
