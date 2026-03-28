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

export function MascotEncouraging({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot encouraging you"
    >
      {/* Left arm — resting at side */}
      <Arm x1={42} y1={148} x2={22} y2={180} />

      {/* Legs & body */}
      <Legs />
      <Torso />
      <NeckJoint />

      {/* Right arm — extended forward pointing at viewer */}
      <Arm x1={158} y1={148} x2={190} y2={132} />

      {/* Head */}
      <HeadShape />
      <NormalEyes />
      <Smile />
      <Antenna />
    </svg>
  );
}
