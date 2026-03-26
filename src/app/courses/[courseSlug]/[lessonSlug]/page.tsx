import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLessonParams, getCourse, getLesson } from "@/lib/content";
import { LessonLayout } from "@/components/lesson/lesson-layout";
import { LessonNav } from "@/components/lesson/lesson-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const lesson = getLesson(courseSlug, lessonSlug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.description };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = getLesson(courseSlug, lessonSlug);

  if (!course || !lesson) notFound();

  const lessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < course.lessons.length - 1
      ? course.lessons[lessonIndex + 1]
      : null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b border-border px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/courses" />}>
                Courses
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href={`/courses/${courseSlug}`} />}
              >
                {course.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <LessonLayout
        courseSlug={courseSlug}
        lessonSlug={lessonSlug}
        instructions={lesson.instructions}
        starterCode={lesson.starterCode}
        solutionCode={lesson.solutionCode}
        mockOutput={lesson.mockOutput}
        hints={lesson.hints}
      />

      <LessonNav
        courseSlug={courseSlug}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
      />
    </div>
  );
}
