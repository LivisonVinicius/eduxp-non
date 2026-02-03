import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // garante que existe um professor
  const teacher = await prisma.user.upsert({
    where: { email: "teacher@eduxp.com" },
    update: {},
    create: {
      name: "Teacher",
      email: "teacher@eduxp.com",
      password: "123456", // depois você faz hash
      role: "TEACHER",
      xp: 0,
    },
  });

  const quiz = await prisma.quiz.create({
    data: {
      title: "Math Basics",
      minimumScore: 2,
      xpReward: 50,
      createdById: teacher.id,

      questions: {
        create: [
          {
            statement: "2 + 2 = ?",
            options: JSON.stringify(["3", "4", "5"]),
            correctAnswer: 1,
          },
          {
            statement: "5 * 2 = ?",
            options: JSON.stringify(["10", "7", "8"]),
            correctAnswer: 0,
          },
          {
            statement: "10 / 2 = ?",
            options: JSON.stringify(["2", "4", "5"]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  console.log("✅ Seed created:", quiz.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
