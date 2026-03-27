import { getCourses } from "@/lib/content";
import { CourseCard } from "@/components/courses/course-card";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">Courses</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pick a course and start your Airflow adventure!
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
