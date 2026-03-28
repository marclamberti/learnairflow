import type { ComponentType } from "react";
import {
  MascotCoding,
  MascotReading,
  MascotRunningDag,
  MascotCelebrating,
} from "@/components/mascot";
import type { MascotProps } from "@/components/mascot/mascot-base";

interface Feature {
  title: string;
  description: string;
  mascot: ComponentType<MascotProps>;
  bg: string;
  accentGlow: string;
}

const FEATURES: Feature[] = [
  {
    title: "Interactive lessons make learning effective",
    description:
      "Write real Airflow DAGs with instant feedback. Our code editor guides you step by step — no setup, no boilerplate.",
    mascot: MascotCoding,
    bg: "bg-[#1C4D8D]",
    accentGlow: "bg-[#4988C4]",
  },
  {
    title: "It's backed by real-world scenarios",
    description:
      "Every lesson is built around production patterns. You'll learn dynamic tasks, branching, custom operators, and more.",
    mascot: MascotReading,
    bg: "bg-[#162F5A]",
    accentGlow: "bg-[#BDE8F5]",
  },
  {
    title: "Run DAGs directly in your browser",
    description:
      "Execute your code and see real output instantly. Watch your pipelines come to life — no local Airflow installation needed.",
    mascot: MascotRunningDag,
    bg: "bg-[#1C4D8D]",
    accentGlow: "bg-[#58CC02]",
  },
  {
    title: "Stay motivated and track your progress",
    description:
      "Pick up where you left off. Complete lessons, unlock new challenges, and watch yourself go from beginner to Airflow pro.",
    mascot: MascotCelebrating,
    bg: "bg-[#162F5A]",
    accentGlow: "bg-[#FFD700]",
  },
];

export function Features() {
  return (
    <div>
      {FEATURES.map((feature, i) => (
        <section
          key={feature.title}
          className={`${feature.bg} relative overflow-hidden px-4 py-20 sm:py-24`}
        >
          {/* Subtle glow behind icon area */}
          <div
            className={`absolute ${i % 2 === 0 ? "left-[10%]" : "right-[10%]"} top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full ${feature.accentGlow} opacity-[0.07] blur-[80px]`}
          />

          <div
            className={`relative mx-auto flex max-w-5xl flex-col items-center gap-10 lg:flex-row lg:gap-20 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Mascot block */}
            <div className="flex flex-shrink-0 items-center justify-center">
              <feature.mascot className="h-36 w-auto sm:h-44" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-[2rem]">
                {feature.title}
              </h2>
              <p className="max-w-lg text-[1.05rem] leading-relaxed text-[#BDE8F5]/70">
                {feature.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
