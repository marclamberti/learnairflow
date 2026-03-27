import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

interface LessonNavProps {
  courseSlug: string;
  nextLesson: { slug: string; title: string } | null;
}

export function LessonNav({ courseSlug, nextLesson }: LessonNavProps) {
  if (!nextLesson) return null;

  return (
    <div className="flex items-center justify-end">
      <Link
        href={`/courses/${courseSlug}/${nextLesson.slug}`}
        className="group/nav flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="text-xs text-muted-foreground/70">Next</span>
        <span>{nextLesson.title}</span>
        <ChevronRightIcon className="size-4 transition-transform group-hover/nav:translate-x-0.5" />
      </Link>
    </div>
  );
}
