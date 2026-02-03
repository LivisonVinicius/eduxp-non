// src/pages/auth/Login.tsx
import { Button, TextField } from "@mui/material";
import "./auth.css";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img
            src={logo}
            alt="EduXP logo"
          />
          <strong className="auth-title">EduXP</strong>
          <span className="auth-subtitle">Learn. Play. Level Up.</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email")}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password")}
          />

          <div className="auth-actions">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                height: "46px",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Sign In
            </Button>
          </div>
        </form>

        <div className="auth-link">
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}
