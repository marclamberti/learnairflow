"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useLessonProgress } from "@/hooks/use-lesson-progress";

interface LessonCheckProps {
  courseSlug: string;
  lessonSlug: string;
}

export function LessonCheck({ courseSlug, lessonSlug }: LessonCheckProps) {
  const isCompleted = useLessonProgress(
    (s) => !!s.completedLessons[`${courseSlug}/${lessonSlug}`],
  );

  if (!isCompleted) return null;

  return <CheckCircle2Icon className="size-4 text-primary" />;
}
