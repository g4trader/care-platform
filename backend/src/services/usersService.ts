import { User, UserRole } from "../models/User";

// Armazenamento em memória
let users: User[] = [];
let nextUserId = 1;

export const usersService = {
  create: (name: string, role: UserRole): User => {
    const user: User = {
      id: `user-${nextUserId++}`,
      name,
      role,
      createdAt: new Date(),
    };
    users.push(user);
    return user;
  },

  updateRole: (id: string, role: UserRole): User | null => {
    const user = users.find((u) => u.id === id);
    if (!user) return null;
    user.role = role;
    return user;
  },

  findById: (id: string): User | undefined => {
    return users.find((u) => u.id === id);
  },

  getAll: (): User[] => {
    return users;
  },
};

