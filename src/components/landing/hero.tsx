import Link from "next/link";
import { AnimatedCode } from "./animated-code";

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
        <div className="flex flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
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

        {/* Right — animated code editor */}
        <div className="animate-hero-scale-in hidden min-w-0 flex-1 lg:block" style={{ animationDelay: "300ms" }}>
          <AnimatedCode />
        </div>
      </div>
    </section>
  );
}
