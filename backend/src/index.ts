import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "care-platform-backend" });
});

// placeholder para futuras rotas: auth, caregivers, marketplace, etc.
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
