import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center gap-8 px-4 py-24 text-center sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/30 to-transparent" />

      <div className="flex flex-col items-center gap-4">
        <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-primary">
          Interactive Coding Platform
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Learn Apache Airflow
          <br />
          <span className="text-secondary">by Writing Real DAGs</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Master data pipeline orchestration step by step. Write, run, and debug
          Airflow DAGs directly in your browser — no setup required.
        </p>
      </div>

      <div className="flex gap-4">
        <Button size="lg" render={<Link href="/courses" />} nativeButton={false}>
          Browse Courses
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/courses/intro-to-airflow" />} nativeButton={false}>
          Start Learning
        </Button>
      </div>
    </section>
  );
}
