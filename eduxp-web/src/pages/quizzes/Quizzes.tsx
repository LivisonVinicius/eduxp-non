import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../components/Header";
import { api } from "../../services/api";
import "./quizzes.css";

type Quiz = {
  id: string;
  title: string;
  xpReward: number;
};

type UserProfile = {
  name: string;
  xp: number;
};

type User = {
  role: "STUDENT" | "TEACHER";
};

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const isStudent = user?.role === "STUDENT";
  const isTeacher = user?.role === "TEACHER";

  useEffect(() => {
    async function loadData() {
      try {
        const quizzesRes = await api.get("/quizzes");
        setQuizzes(quizzesRes.data);

        if (isStudent) {
          const userRes = await api.get("/users/me");
          setProfile(userRes.data);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [isStudent]);

  return (
    <>
      <Header />

      <div className="quizzes-page">
        <div className="quizzes-header">
          <h1>Available Quizzes</h1>

          {isTeacher && (
            <Button
              variant="contained"
              sx={{ borderRadius: "999px", textTransform: "none" }}
              onClick={() => navigate("/create-quiz")}
            >
              Create Quiz
            </Button>
          )}
        </div>

        {/* XP + Nome → apenas STUDENT */}
        {isStudent && profile && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              marginBottom: "16px",
              background: "#f5f5f5",
              borderRadius: "12px",
            }}
          >
            <strong>{profile.name}</strong>
            <span>XP: {profile.xp}</span>
          </div>
        )}

        {loading && <p>Loading quizzes...</p>}

        {!loading && quizzes.length === 0 && <p>No quizzes available.</p>}

        <div className="quizzes-grid">
          {quizzes.map((quiz) => (
            <div
              className="quiz-card"
              key={quiz.id}
            >
              <div>
                <h3>{quiz.title}</h3>
                <small>{quiz.xpReward} XP</small>
              </div>

              {isStudent && (
                <Button
                  variant="contained"
                  sx={{ mt: 2, borderRadius: "999px", textTransform: "none" }}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  Start Quiz
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
