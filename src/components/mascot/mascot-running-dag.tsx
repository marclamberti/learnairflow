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

export function MascotRunningDag({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot running a DAG"
    >
      {/* Left arm — pulled back */}
      <Arm x1={42} y1={148} x2={16} y2={168} />

      {/* Legs & body */}
      <Legs />
      <Torso dagActive />
      <NeckJoint />

      {/* Right arm — extended forward pressing play */}
      <Arm x1={158} y1={148} x2={186} y2={138} />

      {/* Play button triangle near right hand */}
      <polygon
        points="190,130 190,148 200,139"
        fill={C.green}
        opacity={0.85}
      />

      {/* Head */}
      <HeadShape />
      <NormalEyes />
      <Smile />
      <Antenna fast />

      {/* Speed lines */}
      <g opacity={0.3}>
        <line x1={2} y1={120} x2={18} y2={120} stroke={C.light} strokeWidth={2} strokeLinecap="round" />
        <line x1={6} y1={140} x2={22} y2={140} stroke={C.light} strokeWidth={2} strokeLinecap="round" />
        <line x1={0} y1={160} x2={16} y2={160} stroke={C.light} strokeWidth={2} strokeLinecap="round" />
      </g>
    </svg>
  );
}
