import { Router } from "express";
import { coursesService } from "../services/coursesService";

const router = Router();

// GET /api/courses - Listar todos os cursos
router.get("/", (_req, res) => {
  const courses = coursesService.getAll();
  res.json(courses);
});

// GET /api/courses/:id - Obter detalhes de um curso
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = coursesService.findById(id);

  if (!course) {
    return res.status(404).json({ error: "Curso não encontrado" });
  }

  res.json(course);
});

export default router;

