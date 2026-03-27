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

        {/* Right — DAG + code editor bleeding off right edge */}
        <div className="animate-hero-scale-in hidden min-w-0 flex-1 lg:block" style={{ animationDelay: "300ms" }}>
          {/* Code editor — extends to viewport right edge */}
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
