import Link from "next/link";
import { MascotEncouraging } from "@/components/mascot";

export function CTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center sm:py-32">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1C4D8D] opacity-20 blur-[100px]" />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8">
        <MascotEncouraging className="h-36 w-auto animate-float" />
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Build your first DAG{" "}
          <span className="bg-gradient-to-r from-[#BDE8F5] to-[#4988C4] bg-clip-text text-transparent">
            today.
          </span>
        </h2>
        <Link
          href="/courses/intro-to-airflow/your-first-dag"
          className="inline-flex h-[54px] items-center justify-center rounded-2xl bg-[#58CC02] px-12 text-[15px] font-extrabold uppercase tracking-widest text-white shadow-[0_5px_0_0_#46a302] transition-all duration-100 hover:brightness-110 active:translate-y-[5px] active:shadow-none"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
