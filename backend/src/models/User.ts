export type UserRole = "caregiver" | "client" | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

