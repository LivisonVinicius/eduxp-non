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
 * GET /quizzes
 */
router.get("/", async (req, res) => {
  try {
    const { userId, role } = getAuth(req);

    if (role === "TEACHER") {
      const quizzes = await prisma.quiz.findMany({
        where: { createdById: userId },
        include: { questions: true },
      });

      return res.json(
        quizzes.map((q) => ({
          ...q,
          questions: q.questions.map((qs) => ({
            ...qs,
            options: JSON.parse(qs.options),
          })),
        })),
      );
    }

    // STUDENT
    const completed = await prisma.quizResult.findMany({
      where: { userId },
      select: { quizId: true },
    });

    const completedIds = completed.map((r) => r.quizId);

    const quizzes = await prisma.quiz.findMany({
      where: {
        id: { notIn: completedIds },
      },
      include: { questions: true },
    });

    res.json(
      quizzes.map((q) => ({
        ...q,
        questions: q.questions.map((qs) => ({
          ...qs,
          options: JSON.parse(qs.options),
        })),
      })),
    );
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

/**
 * GET /quizzes/:id
 */
router.get("/:id", async (req, res) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.id },
    include: { questions: true },
  });

  if (!quiz) {
    return res.status(404).json({ error: "Quiz not found" });
  }

  res.json({
    ...quiz,
    questions: quiz.questions.map((q) => ({
      ...q,
      options: JSON.parse(q.options),
    })),
  });
});

/**
 * POST /quizzes (TEACHER only)
 */
router.post("/", async (req, res) => {
  try {
    const { userId, role } = getAuth(req);

    if (role !== "TEACHER") {
      return res
        .status(403)
        .json({ error: "Only teachers can create quizzes" });
    }

    const { title, minimumScore, xpReward, questions } = req.body;

    if (!title || !questions?.length || xpReward == null) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        minimumScore,
        xpReward,
        createdById: userId,
        questions: {
          create: questions.map((q: any) => ({
            statement: q.statement,
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
          })),
        },
      },
      include: { questions: true },
    });

    res.status(201).json({
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: JSON.parse(q.options),
      })),
    });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

/**
 * POST /quizzes/:id/submit
 */
router.post("/:id/submit", async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const { correct } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const passed = correct >= quiz.minimumScore;

    await prisma.quizResult.create({
      data: {
        quizId: quiz.id,
        userId,
        score: correct,
        passed,
      },
    });

    if (passed) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: {
            increment: quiz.xpReward,
          },
        },
      });
    }

    res.json({
      passed,
      earnedXp: passed ? quiz.xpReward : 0,
      totalCorrect: correct,
    });
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
