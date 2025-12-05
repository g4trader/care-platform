import { Caregiver, CareType } from "../models/Caregiver";

// Armazenamento em memória
let caregivers: Caregiver[] = [];
let nextCaregiverId = 1;

// Dados mock iniciais para demonstração
const mockCaregivers: Omit<Caregiver, "id" | "createdAt" | "updatedAt">[] = [
  {
    userId: "mock-user-1",
    bio: "Cuidadora experiente com mais de 10 anos de experiência no cuidado de idosos.",
    careTypes: ["elderly"],
    location: { city: "São Paulo", state: "SP" },
    priceRange: { min: 50, max: 80, currency: "BRL" },
    certifications: ["course-1"],
    rating: 4.8,
  },
  {
    userId: "mock-user-2",
    bio: "Especialista em cuidados infantis e desenvolvimento de crianças.",
    careTypes: ["children"],
    location: { city: "Rio de Janeiro", state: "RJ" },
    priceRange: { min: 60, max: 90, currency: "BRL" },
    certifications: ["course-2"],
    rating: 4.9,
  },
  {
    userId: "mock-user-3",
    bio: "Profissional qualificado para cuidados especiais e necessidades específicas.",
    careTypes: ["special_needs"],
    location: { city: "Belo Horizonte", state: "MG" },
    priceRange: { min: 70, max: 100, currency: "BRL" },
    certifications: ["course-1", "course-2"],
    rating: 4.7,
  },
];

// Inicializar com dados mock
mockCaregivers.forEach((mock, index) => {
  const now = new Date();
  caregivers.push({
    ...mock,
    id: `caregiver-${index + 1}`,
    createdAt: now,
    updatedAt: now,
  });
  nextCaregiverId = index + 2;
});

export const caregiversService = {
  create: (data: Omit<Caregiver, "id" | "createdAt" | "updatedAt">): Caregiver => {
    const now = new Date();
    const caregiver: Caregiver = {
      ...data,
      id: `caregiver-${nextCaregiverId++}`,
      createdAt: now,
      updatedAt: now,
    };
    caregivers.push(caregiver);
    return caregiver;
  },

  update: (id: string, data: Partial<Omit<Caregiver, "id" | "createdAt">>): Caregiver | null => {
    const index = caregivers.findIndex((c) => c.id === id);
    if (index === -1) return null;

    caregivers[index] = {
      ...caregivers[index],
      ...data,
      updatedAt: new Date(),
    };
    return caregivers[index];
  },

  findByUserId: (userId: string): Caregiver | undefined => {
    return caregivers.find((c) => c.userId === userId);
  },

  findById: (id: string): Caregiver | undefined => {
    return caregivers.find((c) => c.id === id);
  },

  getAll: (filters?: { careType?: CareType; city?: string }): Caregiver[] => {
    let result = [...caregivers];

    if (filters?.careType) {
      result = result.filter((c) => c.careTypes.includes(filters.careType!));
    }

    if (filters?.city) {
      result = result.filter((c) =>
        c.location.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }

    return result;
  },
};

