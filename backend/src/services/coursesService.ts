import { Course, CourseLevel } from "../models/Course";

// Armazenamento em memória
let courses: Course[] = [];

// Dados mock iniciais
const mockCourses: Omit<Course, "id" | "createdAt">[] = [
  {
    name: "Cuidados Básicos com Idosos",
    description: "Curso introdutório sobre cuidados essenciais com idosos, incluindo higiene, alimentação e primeiros socorros.",
    duration: 20,
    level: "beginner",
  },
  {
    name: "Desenvolvimento Infantil e Cuidados",
    description: "Aprenda sobre desenvolvimento infantil, atividades educativas e cuidados específicos para crianças.",
    duration: 30,
    level: "intermediate",
  },
  {
    name: "Cuidados Especializados",
    description: "Curso avançado para profissionais que trabalham com pessoas com necessidades especiais.",
    duration: 40,
    level: "advanced",
  },
  {
    name: "Primeiros Socorros para Cuidadores",
    description: "Técnicas essenciais de primeiros socorros aplicadas ao contexto de cuidado.",
    duration: 16,
    level: "beginner",
  },
];

// Inicializar com dados mock
const now = new Date();
mockCourses.forEach((mock, index) => {
  courses.push({
    ...mock,
    id: `course-${index + 1}`,
    createdAt: now,
  });
});

export const coursesService = {
  getAll: (): Course[] => {
    return courses;
  },

  findById: (id: string): Course | undefined => {
    return courses.find((c) => c.id === id);
  },
};

