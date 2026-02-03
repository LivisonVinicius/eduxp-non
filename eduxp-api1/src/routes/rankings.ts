import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /ranking
 * Lista alunos ordenados por XP
 */
router.get("/", async (req, res) => {
  try {
    const ranking = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
      orderBy: {
        xp: "desc",
      },
      select: {
        id: true,
        name: true,
        xp: true,
      },
    });

    res.json(
      ranking.map((u) => ({
        id: u.id,
        name: u.name,
        score: u.xp,
      })),
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to load ranking" });
  }
});

export default router;
