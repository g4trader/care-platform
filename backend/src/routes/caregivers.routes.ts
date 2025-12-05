import { Router } from "express";
import { caregiversService } from "../services/caregiversService";
import { CareType } from "../models/Caregiver";

const router = Router();

// Middleware simples para extrair userId do header (fake auth)
const getUserId = (req: any): string | null => {
  return req.headers["x-user-id"] || null;
};

// GET /api/caregivers - Listar cuidadores com filtros opcionais
router.get("/", (req, res) => {
  const careType = req.query.careType as CareType | undefined;
  const city = req.query.city as string | undefined;

  const caregivers = caregiversService.getAll({ careType, city });
  res.json(caregivers);
});

// GET /api/caregivers/:id - Obter detalhes de um cuidador
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const caregiver = caregiversService.findById(id);

  if (!caregiver) {
    return res.status(404).json({ error: "Cuidador não encontrado" });
  }

  res.json(caregiver);
});

// POST /api/caregivers - Criar ou atualizar perfil do cuidador
router.post("/", (req, res) => {
  const userId = getUserId(req);

  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { bio, careTypes, location, priceRange } = req.body;

  if (!bio || !careTypes || !location || !priceRange) {
    return res.status(400).json({
      error: "Campos obrigatórios: bio, careTypes, location, priceRange",
    });
  }

  // Verificar se já existe perfil
  const existing = caregiversService.findByUserId(userId);

  if (existing) {
    // Atualizar
    const updated = caregiversService.update(existing.id, {
      bio,
      careTypes,
      location,
      priceRange,
    });
    return res.json(updated);
  } else {
    // Criar novo
    const caregiver = caregiversService.create({
      userId,
      bio,
      careTypes,
      location,
      priceRange,
      certifications: [],
      rating: 0,
    });
    return res.json(caregiver);
  }
});

export default router;

