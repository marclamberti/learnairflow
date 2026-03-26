import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface LessonNavProps {
  courseSlug: string;
  prevLesson: { slug: string; title: string } | null;
  nextLesson: { slug: string; title: string } | null;
}

export function LessonNav({
  courseSlug,
  prevLesson,
  nextLesson,
}: LessonNavProps) {
  return (
    <div>
      <Separator />
      <div className="flex items-center justify-between px-4 py-2">
        {prevLesson ? (
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={`/courses/${courseSlug}/${prevLesson.slug}`} />}
            nativeButton={false}
          >
            <ChevronLeftIcon data-icon="inline-start" />
            {prevLesson.title}
          </Button>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={`/courses/${courseSlug}/${nextLesson.slug}`} />}
            nativeButton={false}
          >
            {nextLesson.title}
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
