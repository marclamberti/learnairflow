"use client";

import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  courseSlug: string;
  lessonSlugs: string[];
}

export function CourseProgress({ courseSlug, lessonSlugs }: CourseProgressProps) {
  const completedLessons = useLessonProgress((s) => s.completedLessons);
  const completed = lessonSlugs.filter(
    (slug) => !!completedLessons[`${courseSlug}/${slug}`],
  ).length;
  const total = lessonSlugs.length;

  if (completed === 0) return null;

  const percent = Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-2">
      <Progress value={percent} className="h-1.5 flex-1" />
      <span className="text-xs font-bold text-primary">
        {completed}/{total}
      </span>
    </div>
  );
}
