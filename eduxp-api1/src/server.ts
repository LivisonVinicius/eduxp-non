import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth";
import quizzRoutes from "./routes/quizzes";
import usersRoutes from "./routes/users";
import rankingRoutes from "./routes/rankings";

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

// 🔹 rotas
app.use("/auth", authRoutes);
app.use("/quizzes", quizzRoutes);
app.use("/users", usersRoutes);
app.use("/ranking", rankingRoutes);

app.listen(3333, () => {
  console.log("🚀 API running on http://localhost:3333");
});
