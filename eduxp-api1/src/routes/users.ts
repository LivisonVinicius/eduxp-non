import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

function getAuth(req: any) {
  const userId = req.headers["x-user-id"] as string;
  const role = req.headers["x-user-role"] as "STUDENT" | "TEACHER";

  if (!userId || !role) {
    throw new Error("Unauthorized");
  }

  return { userId, role };
}

/**
 * GET /users/me
 * Retorna dados do usuário logado
 */
router.get("/me", async (req, res) => {
  try {
    const { userId, role } = getAuth(req);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        xp: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Se quiser esconder XP do teacher
    if (role === "TEACHER") {
      return res.json({
        id: user.id,
        name: user.name,
        role: user.role,
      });
    }

    // STUDENT
    res.json(user);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
