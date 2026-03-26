import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LessonCheck } from "@/components/courses/lesson-check";
import { CourseProgress } from "@/components/courses/course-progress";

export async function generateStaticParams() {
  return getCourses().map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return {};
  return { title: course.title, description: course.description };
}

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          {course.difficulty}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-lg text-muted-foreground">{course.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          Lessons ({course.lessons.length})
        </h2>
        <div className="mb-4">
          <CourseProgress
            courseSlug={course.slug}
            lessonSlugs={course.lessons.map((l) => l.slug)}
          />
        </div>
        <div className="flex flex-col gap-3">
          {course.lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              href={`/courses/${course.slug}/${lesson.slug}`}
              className="group/lesson"
            >
              <Card className="transition-shadow group-hover/lesson:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {index + 1}.{" "}
                    </span>
                    {lesson.title}
                    <LessonCheck courseSlug={course.slug} lessonSlug={lesson.slug} />
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        render={<Link href={`/courses/${course.slug}/${course.lessons[0].slug}`} />}
        nativeButton={false}
      >
        Start Course
      </Button>
    </div>
  );
}
