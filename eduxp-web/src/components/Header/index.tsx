import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./header.css";

type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER";
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRankingsPage = location.pathname === "/rankings";

  const user: User | null = (() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  })();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="header">
      <div
        className="header-logo"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="EduXP"
        />
        <span>EduXP</span>
      </div>

      <div className="header-actions">
        {/* CREATE QUIZ — somente TEACHER */}
        {user?.role === "TEACHER" && (
          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              mr: 1,
            }}
            onClick={() => navigate("/quizzes/create")}
          >
            Create Quiz
          </Button>
        )}

        {!isRankingsPage && (
          <Button
            variant="outlined"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
            }}
            onClick={() => navigate("/rankings")}
          >
            Rankings
          </Button>
        )}

        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "999px",
            textTransform: "none",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
