import { Router } from "express";
import { usersService } from "../services/usersService";
import { UserRole } from "../models/User";

const router = Router();

router.post("/login", (req, res) => {
  const { role, name } = req.body;

  if (!role || !name) {
    return res.status(400).json({ error: "role e name são obrigatórios" });
  }

  if (role !== "caregiver" && role !== "client") {
    return res.status(400).json({ error: "role deve ser 'caregiver' ou 'client'" });
  }

  const user = usersService.create(name, role as UserRole);

  res.json({
    userId: user.id,
    role: user.role,
    name: user.name,
  });
});

router.post("/google-mock", (req, res) => {
  const user = usersService.create("Google User (mock)", null);

  res.json({
    userId: user.id,
    role: null,
    name: user.name,
  });
});

router.post("/set-role", (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ error: "userId e role são obrigatórios" });
  }

  if (role !== "caregiver" && role !== "client") {
    return res.status(400).json({ error: "role deve ser 'caregiver' ou 'client'" });
  }

  const user = usersService.updateRole(userId, role as UserRole);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  res.json({
    userId: user.id,
    role: user.role,
    name: user.name,
  });
});

export default router;

