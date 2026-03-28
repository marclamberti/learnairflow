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

export function MascotCoding({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot coding"
    >
      {/* Arms — forward as if typing */}
      <Arm x1={42} y1={148} x2={18} y2={176} />
      <Arm x1={158} y1={148} x2={182} y2={176} />

      {/* Legs & body */}
      <Legs />
      <Torso />
      <NeckJoint />

      {/* Head */}
      <HeadShape />
      <NormalEyes />
      <Smile />
      <Antenna />

      {/* Floating code brackets */}
      <text
        x={10}
        y={172}
        fill={C.light}
        fontSize={14}
        fontFamily="monospace"
        fontWeight="bold"
        opacity={0.7}
      >
        &lt;/&gt;
      </text>
      <text
        x={174}
        y={172}
        fill={C.light}
        fontSize={14}
        fontFamily="monospace"
        fontWeight="bold"
        opacity={0.7}
      >
        { }
      </text>
    </svg>
  );
}
