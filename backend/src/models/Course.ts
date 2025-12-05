export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: number; // em horas
  level: CourseLevel;
  createdAt: Date;
}

