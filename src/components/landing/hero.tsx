import Link from "next/link";
import type { ReactNode } from "react";

/* Syntax-highlighting helpers for the code editor panel */
function Line({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <span className="flex">
      <span className="mr-4 inline-block w-5 text-right text-[#4988C4]/40 select-none">{n}</span>
      <span className="text-[#d4d4d4]">{children}</span>
      {"\n"}
    </span>
  );
}
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
 * DAG execution animation — 3 tasks in sequence: extract >> transform >> load
 *
 * 9-second cycle:
 *   0.0s        all queued (dark)
 *   0.5s        extract running
 *   2.0s        extract success → transform running
 *   3.5s        transform success → load running
 *   5.0s        load success
 *   5.0–7.5s    all green (pause)
 *   7.5–9.0s    reset to queued
 *
 * keyTimes (dur 9s): 0 | .056 | .222 | .389 | .556 | .833 | 1
 */

const DUR = "9s";

/* keyTimes shared across all task animations */
const KT = "0;.056;.222;.389;.556;.833;1";

/* Node fill colours per phase  — queued / running / success */
const Q = "#162F5A"; // queued
const R = "#1C4D8D"; // running (slightly lighter)
const S = "#58CC02"; // success

/* Stroke colours */
const SQ = "#4988C4"; // queued stroke
const SR = "#facc15"; // running stroke (yellow)
const SS = "#46a302"; // success stroke (green)

/* Arrow dim / lit */
const AD = "0.15"; // arrow dim opacity
const AL = "0.9";  // arrow lit opacity

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#1C4D8D] opacity-30 blur-[120px]" />
        <div className="absolute left-[-5%] top-[-10%] h-[400px] w-[400px] rounded-full bg-[#4988C4] opacity-10 blur-[100px]" />
      </div>

      <div className="flex w-full flex-col items-center gap-12 px-6 lg:flex-row lg:gap-14 lg:pr-0 lg:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
        {/* Left — text + CTA */}
        <div className="flex shrink-0 flex-col items-center gap-8 text-center lg:w-[480px] lg:items-start lg:text-left xl:w-[540px]">
          <h1 className="animate-hero-rise max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            The fun and effective way to learn{" "}
            <span className="bg-gradient-to-r from-[#BDE8F5] to-[#4988C4] bg-clip-text text-transparent">
              Apache Airflow!
            </span>
          </h1>

          <div className="animate-hero-rise flex flex-col items-center gap-5 lg:items-start" style={{ animationDelay: "150ms" }}>
            <Link
              href="/courses"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#58CC02] px-12 text-base font-extrabold uppercase tracking-widest text-white shadow-[0_5px_0_0_#46a302] transition-all duration-100 hover:brightness-110 active:translate-y-[5px] active:shadow-none"
            >
              Get Started
            </Link>
            <Link
              href="/courses/intro-to-airflow"
              className="text-sm font-bold uppercase tracking-widest text-[#4988C4] transition-colors hover:text-[#BDE8F5]"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Right — DAG + code editor bleeding off right edge */}
        <div className="animate-hero-scale-in flex min-w-0 flex-1 items-center gap-6" style={{ animationDelay: "300ms" }}>
          {/* Animated DAG */}
          <div className="hidden shrink-0 lg:block">
            <svg
              viewBox="0 0 420 370"
              fill="none"
              className="h-[24rem] w-[24rem]"
              aria-hidden="true"
            >
              <defs>
                <filter id="runGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <symbol id="check" viewBox="0 0 20 20">
                  <path d="M4 10 L8 14 L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </symbol>
                <symbol id="spinner" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2" fill="none" strokeDasharray="20 24" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                </symbol>
              </defs>

              {/* ── DAG title ── */}
              <text x="210" y="28" textAnchor="middle" fill="#4988C4" fontSize="13" fontWeight="bold" fontFamily="monospace">
                my_etl_pipeline
              </text>

              {/* ── Line: extract → transform ── */}
              <line x1="210" y1="126" x2="210" y2="160" stroke="#4988C4" strokeWidth="2">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite"
                  keyTimes={KT} values={`${AD};${AD};${AL};${AL};${AL};${AL};${AD}`} calcMode="discrete" />
              </line>

              {/* ── Line: transform → load ── */}
              <line x1="210" y1="236" x2="210" y2="270" stroke="#4988C4" strokeWidth="2">
                <animate attributeName="opacity" dur={DUR} repeatCount="indefinite"
                  keyTimes={KT} values={`${AD};${AD};${AD};${AL};${AL};${AL};${AD}`} calcMode="discrete" />
              </line>

              {/* ═══════════════ TASK 1: extract ═══════════════ */}
              <g>
                <rect x="120" y="50" width="180" height="76" rx="16">
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${Q};${R};${S};${S};${S};${S};${Q}`} />
                  <animate attributeName="stroke" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${SQ};${SR};${SS};${SS};${SS};${SQ};${SQ}`} />
                  <animate attributeName="stroke-width" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="2;3;2;2;2;2;2" />
                </rect>
                <rect x="120" y="50" width="180" height="76" rx="16" fill="none" stroke="#facc15" strokeWidth="3" filter="url(#runGlow)">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;1;0;0;0;0;0" />
                </rect>
                <text x="176" y="95" fill="#BDE8F5" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  extract
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="#BDE8F5;#BDE8F5;white;white;white;#BDE8F5;#BDE8F5" />
                </text>
                <use href="#spinner" x="267" y="73" width="30" height="30">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;1;0;0;0;0;0" />
                </use>
                <use href="#check" x="269" y="75" width="26" height="26">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;1;1;1;0;0" />
                </use>
              </g>

              {/* ═══════════════ TASK 2: transform ═══════════════ */}
              <g>
                <rect x="120" y="160" width="180" height="76" rx="16">
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${Q};${Q};${R};${S};${S};${S};${Q}`} />
                  <animate attributeName="stroke" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${SQ};${SQ};${SR};${SS};${SS};${SQ};${SQ}`} />
                  <animate attributeName="stroke-width" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="2;2;3;2;2;2;2" />
                </rect>
                <rect x="120" y="160" width="180" height="76" rx="16" fill="none" stroke="#facc15" strokeWidth="3" filter="url(#runGlow)">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;1;0;0;0;0" />
                </rect>
                <text x="162" y="205" fill="#BDE8F5" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  transform
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="#BDE8F5;#BDE8F5;#BDE8F5;white;white;#BDE8F5;#BDE8F5" />
                </text>
                <use href="#spinner" x="267" y="183" width="30" height="30">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;1;0;0;0;0" />
                </use>
                <use href="#check" x="269" y="185" width="26" height="26">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;0;1;1;0;0" />
                </use>
              </g>

              {/* ═══════════════ TASK 3: load ═══════════════ */}
              <g>
                <rect x="120" y="270" width="180" height="76" rx="16">
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${Q};${Q};${Q};${R};${S};${S};${Q}`} />
                  <animate attributeName="stroke" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values={`${SQ};${SQ};${SQ};${SR};${SS};${SQ};${SQ}`} />
                  <animate attributeName="stroke-width" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="2;2;2;3;2;2;2" />
                </rect>
                <rect x="120" y="270" width="180" height="76" rx="16" fill="none" stroke="#facc15" strokeWidth="3" filter="url(#runGlow)">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;0;1;0;0;0" />
                </rect>
                <text x="196" y="315" fill="#BDE8F5" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  load
                  <animate attributeName="fill" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="#BDE8F5;#BDE8F5;#BDE8F5;#BDE8F5;white;#BDE8F5;#BDE8F5" />
                </text>
                <use href="#spinner" x="267" y="293" width="30" height="30">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;0;1;0;0;0" />
                </use>
                <use href="#check" x="269" y="295" width="26" height="26">
                  <animate attributeName="opacity" dur={DUR} repeatCount="indefinite" calcMode="discrete"
                    keyTimes={KT} values="0;0;0;0;1;0;0" />
                </use>
              </g>
            </svg>
          </div>

          {/* Code editor — extends to viewport right edge */}
          <div className="min-w-0 flex-1 overflow-hidden rounded-l-2xl border border-r-0 border-[#1C4D8D] bg-[#0B1D3D] shadow-2xl">
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
                <Line n={1}><K>from</K> airflow <K>import</K> DAG</Line>
                <Line n={2}><K>from</K> datetime <K>import</K> datetime</Line>
                <Line n={3} />
                <Line n={4}><K>with</K> <Fn>DAG</Fn>(</Line>
                <Line n={5}>    <Str>{'"my_etl_pipeline"'}</Str>,</Line>
                <Line n={6}>    start_date=<Fn>datetime</Fn>(<N>2024</N>, <N>1</N>, <N>1</N>),</Line>
                <Line n={7}>    schedule=<Str>{'"@daily"'}</Str>,</Line>
                <Line n={8}>) <K>as</K> dag:</Line>
                <Line n={9} />
                <Line n={10}>    extract = <Fn>PythonOperator</Fn>(</Line>
                <Line n={11}>        task_id=<Str>{'"extract"'}</Str>,</Line>
                <Line n={12}>    )</Line>
                <Line n={13} />
                <Line n={14}>    transform = <Fn>PythonOperator</Fn>(</Line>
                <Line n={15}>        task_id=<Str>{'"transform"'}</Str>,</Line>
                <Line n={16}>    )</Line>
                <Line n={17} />
                <Line n={18}>    load = <Fn>PythonOperator</Fn>(</Line>
                <Line n={19}>        task_id=<Str>{'"load"'}</Str>,</Line>
                <Line n={20}>    )</Line>
                <Line n={21} />
                <Line n={22}>    extract &gt;&gt; transform &gt;&gt; load</Line>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
