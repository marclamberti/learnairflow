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
} from "./mascot-base";

export function MascotReading({ className }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Flo the robot reading a book"
    >
      {/* Arms — holding book */}
      <line x1={42} y1={148} x2={62} y2={182} stroke={C.head} strokeWidth={22} strokeLinecap="round" />
      <circle cx={62} cy={182} r={10} fill={C.light} />
      <line x1={158} y1={148} x2={138} y2={182} stroke={C.head} strokeWidth={22} strokeLinecap="round" />
      <circle cx={138} cy={182} r={10} fill={C.light} />

      {/* Book held between hands */}
      <rect x={58} y={174} width={84} height={20} rx={3} fill={C.light} opacity={0.9} />
      <line x1={100} y1={174} x2={100} y2={194} stroke={C.head} strokeWidth={1.5} />
      <line x1={68} y1={180} x2={94} y2={180} stroke={C.head} strokeWidth={1} opacity={0.4} />
      <line x1={68} y1={185} x2={90} y2={185} stroke={C.head} strokeWidth={1} opacity={0.4} />
      <line x1={106} y1={180} x2={132} y2={180} stroke={C.head} strokeWidth={1} opacity={0.4} />
      <line x1={106} y1={185} x2={128} y2={185} stroke={C.head} strokeWidth={1} opacity={0.4} />

      {/* Legs & body */}
      <Legs />
      <Torso />
      <NeckJoint />

      {/* Head */}
      <HeadShape />
      <NormalEyes />
      <Smile />
      <Antenna />

      {/* Sparkle near head */}
      <g opacity={0.6} className="animate-glow-pulse">
        <text x={168} y={52} fill={C.light} fontSize={16}>✦</text>
        <text x={22} y={62} fill={C.light} fontSize={10}>✦</text>
      </g>
    </svg>
  );
}
