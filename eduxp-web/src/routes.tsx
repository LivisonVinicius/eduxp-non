import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Quizzes from "./pages/quizzes/Quizzes";
import Rankings from "./pages/Rankings";
import QuizPage from "./pages/Quiz";
import CreateQuiz from "./pages/CreateQuiz";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/quizzes" />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/quizzes"
        element={<Quizzes />}
      />
      <Route
        path="/rankings"
        element={<Rankings />}
      />
      import QuizPage from "./pages/Quiz";
      <Route
        path="/quiz/:id"
        element={<QuizPage />}
      />
      <Route
        path="/create-quiz"
        element={<CreateQuiz />}
      />
    </Routes>
  );
}
