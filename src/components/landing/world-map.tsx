"use client";

import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Coord = [number, number];

const CITIES: { name: string; coords: Coord }[] = [
  { name: "San Francisco", coords: [-122.4, 37.8] },
  { name: "New York", coords: [-74.0, 40.7] },
  { name: "London", coords: [-0.12, 51.5] },
  { name: "Paris", coords: [2.35, 48.9] },
  { name: "Tokyo", coords: [139.7, 35.7] },
  { name: "Sydney", coords: [151.2, -33.9] },
  { name: "São Paulo", coords: [-46.6, -23.5] },
  { name: "Singapore", coords: [103.8, 1.35] },
  { name: "Dubai", coords: [55.3, 25.3] },
  { name: "Bangalore", coords: [77.6, 12.97] },
];

const ROUTES: { from: Coord; to: Coord; delay: number }[] = [
  { from: CITIES[0].coords, to: CITIES[2].coords, delay: 0 },
  { from: CITIES[1].coords, to: CITIES[3].coords, delay: 2 },
  { from: CITIES[2].coords, to: CITIES[4].coords, delay: 4 },
  { from: CITIES[3].coords, to: CITIES[8].coords, delay: 1 },
  { from: CITIES[5].coords, to: CITIES[7].coords, delay: 3 },
  { from: CITIES[6].coords, to: CITIES[1].coords, delay: 5 },
  { from: CITIES[8].coords, to: CITIES[9].coords, delay: 2.5 },
  { from: CITIES[7].coords, to: CITIES[4].coords, delay: 1.5 },
  { from: CITIES[9].coords, to: CITIES[5].coords, delay: 3.5 },
  { from: CITIES[0].coords, to: CITIES[6].coords, delay: 4.5 },
];

/* ── Tactical corner brackets ── */
function CornerBrackets() {
  const style = "absolute h-6 w-6 border-[#4988C4]";
  return (
    <>
      <div className={`${style} left-4 top-4 border-l-2 border-t-2 opacity-40`} />
      <div className={`${style} right-4 top-4 border-r-2 border-t-2 opacity-40`} />
      <div className={`${style} left-4 bottom-4 border-l-2 border-b-2 opacity-40`} />
      <div className={`${style} right-4 bottom-4 border-r-2 border-b-2 opacity-40`} />
    </>
  );
}

/* ── Blinking status indicator ── */
function StatusDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#BDE8F5]/60">
        {label}
      </span>
    </div>
  );
}

export function WorldMap() {
  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-[#0F2854]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 200, center: [10, 35] }}
        width={800}
        height={500}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1C4D8D"
                stroke="#4988C4"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#4988C4" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Route lines */}
        {ROUTES.map((route, i) => (
          <Line
            key={`line-${i}`}
            from={route.from}
            to={route.to}
            stroke="#4988C4"
            strokeWidth={1}
            strokeLinecap="round"
            strokeOpacity={0.3}
            strokeDasharray="4 4"
          />
        ))}

        {/* Animated particles along routes */}
        {ROUTES.map((route, i) => (
          <Line
            key={`particle-${i}`}
            from={route.from}
            to={route.to}
            stroke="#BDE8F5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="2 2000"
            style={{
              animation: `dash 4s linear infinite`,
              animationDelay: `${route.delay}s`,
              filter: "url(#glow)",
            }}
          />
        ))}

        {/* City markers */}
        {CITIES.map((city) => (
          <Marker key={city.name} coordinates={city.coords}>
            <circle
              r={4}
              fill="none"
              stroke="#BDE8F5"
              strokeWidth={1}
              opacity={0.4}
              className="animate-map-pulse"
            />
            <circle r={2} fill="#BDE8F5" filter="url(#glow)" />
          </Marker>
        ))}
      </ComposableMap>

      {/* ── HUD Overlay ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Tactical corner brackets */}
        <CornerBrackets />

        {/* Top-left: mission title */}
        <div className="absolute left-8 top-8 flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4988C4]/70">
            Global Pipeline Network
          </span>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl"
            style={{ textShadow: "0 0 30px rgba(73,136,196,0.4)" }}
          >
            Mission Control
          </h1>
          <div className="mt-1 h-px w-48 bg-gradient-to-r from-[#4988C4] to-transparent" />
        </div>

        {/* Top-right: status panel */}
        <div className="absolute right-8 top-8 flex flex-col items-end gap-2">
          <StatusDot color="#58CC02" label="Systems Online" />
          <StatusDot color="#58CC02" label="10 Nodes Active" />
          <StatusDot color="#4988C4" label="10 DAG Routes" />
        </div>

        {/* Bottom-left: coordinates readout */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-1">
          <span className="font-mono text-[10px] tracking-widest text-[#4988C4]/50">
            LAT 00.000 &middot; LNG 00.000
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#4988C4]/50">
            GRID REF: ALPHA-7
          </span>
        </div>

        {/* Center CTA */}
        <div className="pointer-events-auto absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 sm:bottom-20">
          <p className="text-center text-base font-extrabold uppercase tracking-[0.25em] text-[#BDE8F5] sm:text-lg"
            style={{ textShadow: "0 0 20px rgba(189,232,245,0.4)" }}
          >
            Your mission: master Apache Airflow
          </p>
          <Link
            href="/courses"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-10 text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-200 hover:border-[#4988C4] hover:bg-[#1C4D8D]/60 hover:shadow-[0_0_30px_rgba(73,136,196,0.3)]"
          >
            <span className="text-lg">&#9654;</span>
            Begin Mission
          </Link>
        </div>

        {/* Bottom-right: classification badge */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 rounded border border-[#4988C4]/20 px-3 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4988C4]/50">
            Clearance Level: Cadet
          </span>
        </div>
      </div>

      {/* CRT / TV overlay — scanlines + vignette */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(200,200,200,0.08) 0px,
              rgba(200,200,200,0.08) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
        }}
      />
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
