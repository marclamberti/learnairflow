import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="border-t border-border bg-muted/40 px-4 py-20 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Build Your First DAG?
        </h2>
        <p className="text-lg text-muted-foreground">
          Jump into the first lesson and start writing Airflow pipelines in
          minutes.
        </p>
        <Button size="lg" render={<Link href="/courses/intro-to-airflow/your-first-dag" />} nativeButton={false}>
          Start the First Lesson
        </Button>
      </div>
    </section>
  );
}
