import { getCourses } from "@/lib/content";
import { CourseCard } from "@/components/courses/course-card";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose a course and start building Airflow pipelines.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
