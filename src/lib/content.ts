import { allCourses } from "@/content/courses";
import { Course, LessonContent } from "@/types/course";

export function getCourses(): Course[] {
  return allCourses;
}

export function getCourse(courseSlug: string): Course | undefined {
  return allCourses.find((c) => c.slug === courseSlug);
}

export function getLesson(
  courseSlug: string,
  lessonSlug: string,
): LessonContent | undefined {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  return course.lessons.find(
    (l) => l.slug === lessonSlug,
  ) as LessonContent | undefined;
}

export function getAllLessonParams() {
  return allCourses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseSlug: course.slug,
      lessonSlug: lesson.slug,
    })),
  );
}
