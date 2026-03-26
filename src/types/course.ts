export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
}

export interface LessonContent extends LessonMeta {
  /** Markdown string rendered in the content panel */
  instructions: string;

  /** Pre-filled code the user sees when they open the lesson */
  starterCode: string;

  /** The correct/expected solution */
  solutionCode: string;

  /** Mock output shown when user clicks "Run" (until backend exists) */
  mockOutput: string;

  /** Optional hints shown one at a time */
  hints?: string[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessons: LessonMeta[];
}
