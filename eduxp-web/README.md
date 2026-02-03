📗 README — Frontend (Web)
EduXP Web

Aplicação web da plataforma EduXP, focada em gamificação do aprendizado através de quizzes e sistema de XP.

🧠 Visão Geral

O frontend permite:

Login como Student ou Teacher

Professores criarem quizzes

Alunos responderem quizzes

Visualizar XP e ranking

🏗️ Tecnologias

React

TypeScript

Vite

Material UI (MUI)

React Router

Axios

📂 Estrutura de Pastas
src/
├─ pages/
│ ├─ quizzes/
│ ├─ quiz/
│ ├─ createQuiz/
│ ├─ rankings/
├─ components/
│ └─ Header
├─ services/
│ └─ api.ts

🔐 Autenticação

Autenticação simplificada baseada em localStorage:

{
"id": "uuid",
"name": "User",
"role": "STUDENT"
}

Headers enviados automaticamente via Axios:

x-user-id
x-user-role

🧩 Funcionalidades
Student

Ver quizzes disponíveis

Responder quizzes

Ganhar XP

Ver ranking

Teacher

Criar quizzes

Ver quizzes criados

Não responde quizzes

🖥️ Telas Principais

Lista de quizzes

Criar quiz (Teacher)

Resolver quiz (Student)

Ranking

Header com XP do aluno

🚀 Rodando o Projeto
1️⃣ Instalar dependências
npm install

2️⃣ Rodar projeto
npm run dev

⚠️ Observações Importantes

Professores não veem botão “Start Quiz”

XP aparece apenas para alunos

Dados dependem da API rodando
