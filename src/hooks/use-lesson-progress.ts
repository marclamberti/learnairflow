import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LessonProgressState {
  completedLessons: Record<string, boolean>;
  markCompleted: (courseSlug: string, lessonSlug: string) => void;
}

export const useLessonProgress = create<LessonProgressState>()(
  persist(
    (set) => ({
      completedLessons: {},
      markCompleted: (courseSlug, lessonSlug) =>
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [`${courseSlug}/${lessonSlug}`]: true,
          },
        })),
    }),
    { name: "learnairflow-progress:v1" },
  ),
);
