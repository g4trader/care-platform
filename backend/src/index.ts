import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import caregiversRouter from "./routes/caregivers.routes";
import coursesRouter from "./routes/courses.routes";
import clientRequestsRouter from "./routes/clientRequests.routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "care-platform-backend" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Rotas da API
app.use("/api/auth", authRouter);
app.use("/api/caregivers", caregiversRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/client-requests", clientRequestsRouter);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
