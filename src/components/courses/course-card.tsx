import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseProgress } from "./course-progress";
import type { Course } from "@/types/course";

const DIFFICULTY_VARIANT = {
  beginner: "secondary",
  intermediate: "default",
  advanced: "outline",
} as const;

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.slug}`} className="group/link">
      <Card className="transition-shadow group-hover/link:shadow-md">
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <Badge variant={DIFFICULTY_VARIANT[course.difficulty]}>
              {course.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {course.lessons.length}{" "}
              {course.lessons.length === 1 ? "lesson" : "lessons"}
            </span>
          </div>
          <CourseProgress
            courseSlug={course.slug}
            lessonSlugs={course.lessons.map((l) => l.slug)}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
