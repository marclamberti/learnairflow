import { Course } from "@/types/course";
import { lesson as yourFirstDag } from "./your-first-dag";
import { lesson as taskDependencies } from "./task-dependencies";
import { lesson as usingOperators } from "./using-operators";

export const course: Course = {
  slug: "intro-to-airflow",
  title: "Introduction to Airflow",
  description:
    "Build your first DAGs from scratch. Learn the fundamentals of tasks, operators, and dependencies.",
  difficulty: "beginner",
  lessons: [yourFirstDag, taskDependencies, usingOperators],
};
