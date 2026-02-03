import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import "./auth.css";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { register, handleSubmit, watch } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [role, setRole] = useState("student"); // mantido, mas não enviado

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: role.toUpperCase(), // "STUDENT" | "TEACHER"
      });

      navigate("/login");
    } catch (err) {
      alert("Error creating account");
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
            label="Full Name"
            margin="normal"
            {...register("name", { required: true })}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", { required: true })}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", { required: true })}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            error={!!confirmPassword && password !== confirmPassword}
            helperText={
              confirmPassword && password !== confirmPassword
                ? "Passwords do not match"
                : ""
            }
            {...register("confirmPassword", { required: true })}
          />

          <ToggleButtonGroup
            exclusive
            fullWidth
            value={role}
            onChange={(_, v) => v && setRole(v)}
            sx={{ mt: 2 }}
          >
            <ToggleButton value="student">Student</ToggleButton>
            <ToggleButton value="teacher">Teacher</ToggleButton>
          </ToggleButtonGroup>

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
              Register
            </Button>
          </div>
        </form>

        <div className="auth-link">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}
