import {
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

export function MascotWaving({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot waving hello"
    >
      {/* Left arm — resting */}
      <Arm x1={42} y1={148} x2={24} y2={186} />

      {/* Legs & body */}
      <Legs />
      <Torso />
      <NeckJoint />

      {/* Right arm — raised & waving */}
      <g className="animate-wave" style={{ transformOrigin: "158px 148px" }}>
        <Arm x1={158} y1={148} x2={180} y2={108} />
      </g>

      {/* Head */}
      <HeadShape />
      <NormalEyes />
      <Smile />
      <Antenna />
    </svg>
  );
}
