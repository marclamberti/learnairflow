import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES = [
  {
    title: "Interactive Code Editor",
    description:
      "Write Airflow DAGs in a real code editor with syntax highlighting, autocomplete, and instant feedback.",
  },
  {
    title: "Step-by-Step Lessons",
    description:
      "Progress through structured courses — from your first DAG to advanced patterns like dynamic tasks and branching.",
  },
  {
    title: "Run DAGs in the Browser",
    description:
      "Execute your code and see real output instantly. No local Airflow installation needed.",
  },
  {
    title: "Track Your Progress",
    description:
      "Pick up where you left off. Your progress is saved automatically as you complete each lesson.",
  },
] as const;

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
        Everything You Need to Master Airflow
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
