import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="bg-primary px-4 py-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Ready to Build Your First DAG?
        </h2>
        <p className="text-lg text-primary-foreground/80">
          Your first DAG is just one click away. Jump in and start building
          Airflow pipelines in minutes.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary shadow-[0_4px_0_0_#4988C4] hover:bg-white/90 active:translate-y-1 active:shadow-none"
          render={<Link href="/courses/intro-to-airflow/your-first-dag" />}
          nativeButton={false}
        >
          Start the First Lesson
        </Button>
      </div>
    </section>
  );
}
