"use client";

import { useState, useEffect, type ReactNode } from "react";

/* Syntax-highlighting helpers */
function K({ children }: { children: ReactNode }) {
  return <span className="text-[#c586c0]">{children}</span>;
}
function Fn({ children }: { children: ReactNode }) {
  return <span className="text-[#dcdcaa]">{children}</span>;
}
function Str({ children }: { children: ReactNode }) {
  return <span className="text-[#ce9178]">{children}</span>;
}
function N({ children }: { children: ReactNode }) {
  return <span className="text-[#b5cea8]">{children}</span>;
}

/*
 * Each line is [lineNumber, JSX content].
 * Empty lines have `null` content.
 */
const LINES: [number, ReactNode][] = [
  [1, <><K>import</K> airflow.sdk <K>as</K> sdk</>],
  [2, null],
  [3, null],
  [4, <><Fn>@sdk.dag</Fn>(schedule=<Str>{'"@daily"'}</Str>)</>],
  [5, <><K>def</K> <Fn>my_etl_pipeline</Fn>():</>],
  [6, null],
  [7, <>    <Fn>@sdk.task</Fn></>],
  [8, <>    <K>def</K> <Fn>extract</Fn>():</>],
  [9, <>        <K>return</K> {`{`}<Str>{'"users"'}</Str>: [<N>1</N>, <N>2</N>, <N>3</N>]{`}`}</>],
  [10, null],
  [11, <>    <Fn>@sdk.task</Fn></>],
  [12, <>    <K>def</K> <Fn>transform</Fn>(data):</>],
  [13, <>        <K>return</K> [u * <N>2</N> <K>for</K> u <K>in</K> data[<Str>{'"users"'}</Str>]]</>],
  [14, null],
  [15, <>    <Fn>@sdk.task</Fn></>],
  [16, <>    <K>def</K> <Fn>load</Fn>(records):</>],
  [17, <>        <Fn>print</Fn>(<K>f</K><Str>{'"Loaded {len(records)} rows"'}</Str>)</>],
  [18, null],
  [19, <>    data = <Fn>extract</Fn>()</>],
  [20, <>    records = <Fn>transform</Fn>(data)</>],
  [21, <>    <Fn>load</Fn>(records)</>],
  [22, null],
  [23, null],
  [24, <><Fn>my_etl_pipeline</Fn>()</>],
];

const LINE_DELAY = 300;   // ms between each line appearing
const PAUSE_AFTER = 4000; // ms to hold the full code before restarting

export function AnimatedCode() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < LINES.length) {
      // Reveal next line
      const t = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 600 : LINE_DELAY, // initial delay for entrance animation
      );
      return () => clearTimeout(t);
    } else {
      // All lines shown — pause then restart
      const t = setTimeout(() => setVisibleLines(0), PAUSE_AFTER);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <div className="max-w-[40rem] ml-auto overflow-hidden rounded-l-2xl border border-r-0 border-[#1C4D8D] bg-[#0B1D3D] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[#1C4D8D] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-[#4988C4]">my_dag.py</span>
      </div>
      {/* Code content */}
      <pre className="py-5 pl-5 pr-2 font-mono text-sm leading-[1.8]">
        <code>
          {LINES.map(([n, content], i) => (
            <span
              key={n}
              className={`flex transition-opacity duration-300 ${
                i < visibleLines ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="mr-4 inline-block w-5 text-right text-[#4988C4]/40 select-none">
                {n}
              </span>
              <span className="text-[#d4d4d4]">
                {content}
                {/* Blinking cursor on the last visible line */}
                {i === visibleLines - 1 && visibleLines < LINES.length && (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-[#BDE8F5]" />
                )}
              </span>
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
