📘 README — Backend (API)
EduXP API

API REST responsável por autenticação, gerenciamento de quizzes, submissão de respostas, sistema de XP e ranking de alunos.

🧠 Visão Geral

A EduXP API fornece toda a lógica de negócio da plataforma:

Controle de usuários (Student / Teacher)

Criação de quizzes por professores

Resolução de quizzes por alunos

Sistema de XP

Ranking global baseado em XP

🏗️ Tecnologias

Node.js

TypeScript

Express

Prisma ORM

PostgreSQL

ts-node

📂 Estrutura de Pastas
src/
├─ routes/
│ ├─ auth.ts
│ ├─ users.ts
│ ├─ quizzes.ts
│ ├─ ranking.ts
├─ prisma/
│ ├─ schema.prisma
│ └─ seed.ts
├─ server.ts

🗄️ Modelos Principais
User

id

name

email

role (STUDENT | TEACHER)

xp

Quiz

id

title

minimumScore

xpReward

createdById

Question

statement

options (JSON)

correctAnswer

QuizResult

score

passed

userId

quizId

🔐 Autenticação (mockada)

Por enquanto, a autenticação é feita via headers:

x-user-id: <user_id>
x-user-role: STUDENT | TEACHER

⚠️ Planejado substituir por JWT.

🚀 Rotas Principais
Quizzes
Método Rota Descrição
GET /quizzes Lista quizzes
POST /quizzes Criar quiz (Teacher)
GET /quizzes/:id Buscar quiz
POST /quizzes/:id/submit Submeter respostas
Users
Método Rota Descrição
GET /users/me Perfil do usuário
Ranking
Método Rota Descrição
GET /ranking Ranking global por XP
🧪 Rodando o Projeto
1️⃣ Instalar dependências
npm install

2️⃣ Configurar banco
npx prisma migrate dev

3️⃣ Rodar seed
npx prisma db seed

4️⃣ Iniciar API
npm run dev

🎯 Regras de Negócio

Apenas teachers criam quizzes

Alunos só veem quizzes não respondidos

XP só é concedido ao passar no quiz

Ranking considera apenas alunos
