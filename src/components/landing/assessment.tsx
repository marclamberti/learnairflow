"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Corner brackets ── */
function CornerBrackets() {
  const s = "absolute h-6 w-6 border-[#4988C4]";
  return (
    <>
      <div className={`${s} left-4 top-4 border-l-2 border-t-2 opacity-40`} />
      <div className={`${s} right-4 top-4 border-r-2 border-t-2 opacity-40`} />
      <div className={`${s} left-4 bottom-4 border-l-2 border-b-2 opacity-40`} />
      <div className={`${s} right-4 bottom-4 border-r-2 border-b-2 opacity-40`} />
    </>
  );
}

/* ── Commander portrait (SVG comm-link) ── */
function Commander({ speaking }: { speaking?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Comm frame */}
      <div
        className={`relative flex h-24 w-24 items-center justify-center rounded-full border-2 ${
          speaking
            ? "border-[#4988C4] shadow-[0_0_20px_rgba(73,136,196,0.4)]"
            : "border-[#4988C4]/40"
        } bg-[#0F2854] transition-all duration-500`}
      >
        {/* Pulsing ring when speaking */}
        {speaking && (
          <div className="absolute inset-0 animate-ping rounded-full border border-[#4988C4]/30" />
        )}
        {/* Face SVG */}
        <svg viewBox="0 0 48 48" className="h-16 w-16" shapeRendering="auto">
          {/* Head */}
          <circle cx={24} cy={22} r={14} fill="#4988C4" />
          {/* Visor / face area */}
          <rect x={13} y={16} width={22} height={12} rx={6} fill="#0F2854" />
          {/* Eyes */}
          <circle cx={19} cy={22} r={2.5} fill="#BDE8F5" />
          <circle cx={29} cy={22} r={2.5} fill="#BDE8F5" />
          <circle cx={19.8} cy={21.5} r={1} fill="white" opacity={0.9} />
          <circle cx={29.8} cy={21.5} r={1} fill="white" opacity={0.9} />
          {/* Headset */}
          <path
            d="M10 20 Q10 10 24 10 Q38 10 38 20"
            stroke="#1C4D8D"
            strokeWidth={2.5}
            fill="none"
          />
          <rect x={7} y={18} width={5} height={8} rx={2} fill="#1C4D8D" />
          <rect x={36} y={18} width={5} height={8} rx={2} fill="#1C4D8D" />
          {/* Mic */}
          <line x1={9} y1={26} x2={14} y2={32} stroke="#1C4D8D" strokeWidth={2} strokeLinecap="round" />
          <circle cx={14} cy={33} r={2} fill="#4988C4" />
          {/* Antenna */}
          <line x1={24} y1={10} x2={24} y2={4} stroke="#4988C4" strokeWidth={1.5} />
          <circle cx={24} cy={3} r={2} fill="#58CC02" className="animate-antenna-glow" />
        </svg>
      </div>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#4988C4]/60">
        Cmdr. Flow
      </span>
    </div>
  );
}

/* ── Speech bubble ── */
function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full rounded-xl border border-[#4988C4]/20 bg-[#1C4D8D]/15 px-6 py-5">
      {/* Arrow pointing up to commander */}
      <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[#4988C4]/20 bg-[#1C4D8D]/15" />
      <p className="text-base italic leading-relaxed text-[#BDE8F5]/70">{children}</p>
    </div>
  );
}

/* ── Questions ── */

interface Question {
  scenario: string;
  question: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    scenario: "Let's start with the basics, agent. Every operative needs to know the fundamentals.",
    question: "What is a DAG in Apache Airflow?",
    options: [
      "A database for storing task results",
      "A directed acyclic graph defining task dependencies",
      "A deployment configuration file",
      "A monitoring dashboard for pipelines",
    ],
    correct: 1,
  },
  {
    scenario: "Good. Now imagine you're designing your first pipeline. Tasks must run in a specific order.",
    question: "What defines the execution order of tasks in Airflow?",
    options: [
      "The order they appear in the Python file",
      "Alphabetical sorting by task ID",
      "Dependencies set with bitshift operators or chain helpers",
      "The schedule interval configuration",
    ],
    correct: 2,
  },
  {
    scenario: "HQ needs to scale operations. Pipeline execution must be distributed across multiple machines.",
    question: "Which Airflow component is responsible for actually running your tasks?",
    options: [
      "The Scheduler",
      "The Workers",
      "The Executor",
      "The Metadata Database",
    ],
    correct: 1,
  },
  {
    scenario: "Situation report: a critical pipeline fails at 0300. The on-call team is alerted.",
    question: "What Airflow feature handles automatic retries on task failure?",
    options: [
      "The DAG schedule interval",
      "The retries and retry_delay task parameters",
      "The Airflow webserver health check",
      "The trigger_rule configuration",
    ],
    correct: 1,
  },
  {
    scenario: "Final scenario. Your pipeline needs to pass a computed value from one task to the next.",
    question: "How do you share data between tasks in Airflow?",
    options: [
      "Global Python variables",
      "Writing to a shared log file",
      "XCom (cross-communication)",
      "Environment variables set at runtime",
    ],
    correct: 2,
  },
];

const RANKS = [
  {
    min: 0,
    max: 1,
    rank: "Recruit",
    message: "Don't worry, agent. Everyone starts somewhere. I'll make sure you're ready for the field.",
  },
  {
    min: 2,
    max: 3,
    rank: "Field Agent",
    message: "Not bad, agent. You've got a solid foundation. Let's sharpen those skills.",
  },
  {
    min: 4,
    max: 5,
    rank: "Senior Operative",
    message: "Impressive work, agent. You clearly know your way around a pipeline. Let's take it further.",
  },
];

/* ── Main component ── */

export function Assessment() {
  const router = useRouter();
  const [phase, setPhase] = useState<"briefing" | "questions" | "results">("briefing");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState<number | null>(null);

  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const rankData = RANKS.find((r) => score >= r.min && score <= r.max) ?? RANKS[0];

  function handleSelect(optionIndex: number) {
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);
    setSelected(null);

    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setPhase("results");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2854]">
      <CornerBrackets />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(200,200,200,0.08) 0px, rgba(200,200,200,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 px-6">
        {/* ── Briefing ── */}
        {phase === "briefing" && (
          <div className="flex flex-col items-center gap-6 animate-hero-rise">
            <Commander speaking />

            <SpeechBubble>
              Welcome to the field assessment, agent. Before we deploy you, I need
              to evaluate your operational readiness. You&apos;ll face{" "}
              <span className="font-bold text-[#BDE8F5]">5 tactical scenarios</span>.
              Answer carefully — your responses will determine your training track.
            </SpeechBubble>

            <button
              type="button"
              onClick={() => setPhase("questions")}
              className="inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-10 text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-200 hover:border-[#4988C4] hover:bg-[#1C4D8D]/60 hover:shadow-[0_0_30px_rgba(73,136,196,0.3)]"
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* ── Questions ── */}
        {phase === "questions" && (
          <div className="flex w-full flex-col gap-6 animate-hero-rise" key={current}>
            {/* Commander + scenario */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Commander speaking />
              </div>
              <div className="flex min-w-0 flex-col gap-3 pt-2">
                {/* Progress */}
                <div className="flex items-center gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-6 bg-[#4988C4]"
                          : i < current
                            ? "w-3 bg-[#4988C4]/60"
                            : "w-3 bg-[#4988C4]/20"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-[#4988C4]/50">
                    {current + 1}/{QUESTIONS.length}
                  </span>
                </div>

                {/* Scenario as dialogue */}
                <div className="rounded-lg border border-[#4988C4]/15 bg-[#1C4D8D]/15 px-5 py-4">
                  <p className="text-base italic leading-relaxed text-[#BDE8F5]/70">
                    &ldquo;{QUESTIONS[current].scenario}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
              {QUESTIONS[current].question}
            </h3>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
              {QUESTIONS[current].options.map((option, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border px-5 py-3.5 text-left transition-all duration-200 ${
                    selected === i
                      ? "border-[#4988C4] bg-[#1C4D8D]/40 shadow-[0_0_20px_rgba(73,136,196,0.2)]"
                      : "border-[#4988C4]/20 bg-[#0F2854]/60 hover:border-[#4988C4]/50 hover:bg-[#1C4D8D]/20"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                      selected === i
                        ? "border-[#4988C4] bg-[#4988C4] text-white"
                        : "border-[#4988C4]/30 text-[#4988C4]/60"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-base text-[#BDE8F5]/80">{option}</span>
                </button>
              ))}
            </div>

            {/* Next */}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={selected === null}
                onClick={handleNext}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-8 text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-200 hover:border-[#4988C4] hover:bg-[#1C4D8D]/60 hover:shadow-[0_0_30px_rgba(73,136,196,0.3)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[#4988C4]/30 disabled:hover:bg-[#0F2854]/80 disabled:hover:shadow-none"
              >
                {current < QUESTIONS.length - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {phase === "results" && (
          <div className="flex w-full flex-col items-center gap-6 animate-hero-rise">
            <Commander speaking />

            <SpeechBubble>{rankData.message}</SpeechBubble>

            {/* Rank reveal */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4988C4]/60">
                Evaluated Rank
              </span>
              <h2
                className="text-3xl font-extrabold uppercase tracking-wider text-white sm:text-4xl"
                style={{ textShadow: "0 0 30px rgba(73,136,196,0.5)" }}
              >
                {rankData.rank}
              </h2>
            </div>

            {/* Score card */}
            <div className="w-full rounded-xl border border-[#4988C4]/20 bg-[#0F2854]/60 p-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4988C4]/50">
                Assessment Report
              </span>
              <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                <span className="text-[#BDE8F5]/40">Score</span>
                <span className="font-mono font-bold text-white">
                  {score} / {QUESTIONS.length}
                </span>
                <span className="text-[#BDE8F5]/40">Rank</span>
                <span className="font-bold text-white">{rankData.rank}</span>
                <span className="text-[#BDE8F5]/40">Status</span>
                <span className="font-bold text-[#58CC02]">Cleared for Training</span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => router.push("/courses")}
              className="inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[#4988C4]/30 bg-[#0F2854]/80 px-10 text-sm font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-200 hover:border-[#4988C4] hover:bg-[#1C4D8D]/60 hover:shadow-[0_0_30px_rgba(73,136,196,0.3)]"
            >
              <span className="text-lg">&#9654;</span>
              Proceed to Training Grounds
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
