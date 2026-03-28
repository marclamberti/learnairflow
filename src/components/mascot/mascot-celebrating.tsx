import {
  C,
  type MascotProps,
  Antenna,
  HeadShape,
  NormalEyes,
  Smile,
  NeckJoint,
  Torso,
  Legs,
  Arm,
} from "./mascot-base";

export function MascotCelebrating({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot celebrating"
    >
      {/* Confetti particles */}
      <g className="animate-glow-pulse">
        <rect x={20} y={30} width={6} height={6} rx={1} fill={C.green} opacity={0.7} transform="rotate(25 23 33)" />
        <rect x={170} y={40} width={5} height={5} rx={1} fill={C.light} opacity={0.6} transform="rotate(-15 172 42)" />
        <circle cx={40} cy={55} r={3} fill="#FFD700" opacity={0.7} />
        <circle cx={165} cy={25} r={3} fill={C.green} opacity={0.6} />
        <rect x={55} y={18} width={4} height={8} rx={1} fill={C.light} opacity={0.5} transform="rotate(40 57 22)" />
        <rect x={145} y={58} width={4} height={8} rx={1} fill="#FFD700" opacity={0.5} transform="rotate(-30 147 62)" />
      </g>

      {/* Both arms raised high */}
      <Arm x1={42} y1={148} x2={18} y2={100} />
      <Arm x1={158} y1={148} x2={182} y2={100} />

      {/* Legs & body — bouncing */}
      <g className="animate-celebrate">
        <Legs />
        <Torso />
        <NeckJoint />

        {/* Head */}
        <HeadShape />
        <NormalEyes />
        <Smile />
        <Antenna fast />
      </g>

      {/* Star near hand */}
      <text x={182} y={96} fill="#FFD700" fontSize={18} opacity={0.85}>★</text>
    </svg>
  );
}
