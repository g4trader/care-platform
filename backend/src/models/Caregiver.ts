export type CareType = "elderly" | "children" | "special_needs";

export interface Caregiver {
  id: string;
  userId: string;
  bio: string;
  careTypes: CareType[];
  location: {
    city: string;
    state: string;
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  certifications: string[]; // IDs dos cursos concluídos
  rating: number; // 0-5
  createdAt: Date;
  updatedAt: Date;
}

