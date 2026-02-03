import { useState } from "react";
import { Button, TextField, IconButton, Radio } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";
import "./createQuiz.css";

type Question = {
  statement: string;
  options: string[];
  correctAnswer: number;
};

export default function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [xpReward, setXpReward] = useState(50);
  const [minimumScore, setMinimumScore] = useState(1);

  const [questions, setQuestions] = useState<Question[]>([
    {
      statement: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  function syncMinimumScore(total: number) {
    setMinimumScore((prev) => (prev > total ? total : prev));
  }

  function addQuestion() {
    const updated = [
      ...questions,
      {
        statement: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ];
    setQuestions(updated);
    syncMinimumScore(updated.length);
  }

  function removeQuestion(index: number) {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    syncMinimumScore(updated.length);
  }

  function updateQuestion(index: number, field: keyof Question, value: any) {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  }

  function updateOption(qIndex: number, oIndex: number, value: string) {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  }

  function validateQuiz() {
    if (!title) return "Title is required";
    if (questions.length === 0) return "Add at least one question";
    if (minimumScore > questions.length)
      return "Minimum correct answers cannot exceed number of questions";

    for (const q of questions) {
      if (!q.statement) return "All questions need a statement";
      if (q.options.some((o) => !o)) return "All options must be filled";
    }

    return null;
  }

  async function handleSubmit() {
    const error = validateQuiz();
    if (error) {
      alert(error);
      return;
    }

    try {
      await api.post("/quizzes", {
        title,
        xpReward,
        minimumScore,
        questions,
      });

      navigate("/");
    } catch (err) {
      alert("Failed to create quiz");
    }
  }

  return (
    <>
      <Header />

      <div className="create-quiz-page">
        <h1>Create Quiz</h1>

        <div className="create-quiz-form">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="XP Reward"
            type="number"
            value={xpReward}
            onChange={(e) => setXpReward(Number(e.target.value))}
          />

          <TextField
            label="Minimum Correct Answers"
            type="number"
            value={minimumScore}
            onChange={(e) => setMinimumScore(Number(e.target.value))}
            helperText={`Max: ${questions.length}`}
          />

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="question-card"
            >
              <div className="question-header">
                <h3>Question {qIndex + 1}</h3>

                {questions.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </div>

              <TextField
                label="Statement"
                value={q.statement}
                onChange={(e) =>
                  updateQuestion(qIndex, "statement", e.target.value)
                }
                fullWidth
              />

              {q.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Radio
                    checked={q.correctAnswer === oIndex}
                    onChange={() =>
                      updateQuestion(qIndex, "correctAnswer", oIndex)
                    }
                  />

                  <TextField
                    label={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      updateOption(qIndex, oIndex, e.target.value)
                    }
                    fullWidth
                  />
                </div>
              ))}
            </div>
          ))}

          <Button
            startIcon={<Add />}
            variant="outlined"
            sx={{ borderRadius: "999px" }}
            onClick={addQuestion}
          >
            Add Question
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: "999px" }}
            onClick={handleSubmit}
          >
            Create Quiz
          </Button>
        </div>
      </div>
    </>
  );
}
