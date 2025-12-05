import { Router } from "express";
import { clientRequestsService } from "../services/clientRequestsService";
import { CareType } from "../models/Caregiver";

const router = Router();

// Middleware simples para extrair userId do header (fake auth)
const getUserId = (req: any): string | null => {
  return req.headers["x-user-id"] || null;
};

// GET /api/client-requests - Listar pedidos com filtros opcionais
router.get("/", (req, res) => {
  const clientId = req.query.clientId as string | undefined;
  const caregiverId = req.query.caregiverId as string | undefined;

  const requests = clientRequestsService.getAll({ clientId, caregiverId });
  res.json(requests);
});

// GET /api/client-requests/:id - Obter detalhes de um pedido
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const request = clientRequestsService.findById(id);

  if (!request) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  res.json(request);
});

// POST /api/client-requests - Criar um novo pedido de cuidado
router.post("/", (req, res) => {
  const clientId = getUserId(req);

  if (!clientId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { careType, schedule, location, details } = req.body;

  if (!careType || !schedule || !location || !details) {
    return res.status(400).json({
      error: "Campos obrigatórios: careType, schedule, location, details",
    });
  }

  const request = clientRequestsService.create({
    clientId,
    careType: careType as CareType,
    schedule,
    location,
    details,
  });

  res.status(201).json(request);
});

// POST /api/client-requests/:id/interest - Registrar interesse de um cuidador
router.post("/:id/interest", (req, res) => {
  const caregiverId = getUserId(req);

  if (!caregiverId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  const { id } = req.params;
  const request = clientRequestsService.addInterest(id, caregiverId);

  if (!request) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  res.json(request);
});

export default router;

