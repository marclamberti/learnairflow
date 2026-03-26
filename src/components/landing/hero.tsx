import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 px-4 py-24 text-center sm:py-32">
      <div className="flex flex-col items-center gap-4">
        <span className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
          Interactive Coding Platform
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Learn Apache Airflow
          <br />
          <span className="text-muted-foreground">by Writing Real DAGs</span>
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
