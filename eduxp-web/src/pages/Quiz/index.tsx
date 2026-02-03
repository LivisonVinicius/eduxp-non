import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../../components/Header";
import { api } from "../../services/api";
import "./quiz.css";

type Question = {
  id: string;
  statement: string;
  options: string[];
  correctAnswer: number;
};

type Quiz = {
  id: string;
  title: string;
  minimumScore: number;
  questions: Question[];
};

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [passed, setPassed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!id) return;

    api.get(`/quizzes/${id}`).then((res) => {
      setQuiz(res.data);
    });
  }, [id]);

  function handleAnswer(optionIndex: number) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = optionIndex;
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < quiz!.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishQuiz(updatedAnswers);
    }
  }

  function finishQuiz(finalAnswers: number[]) {
    let correct = 0;

    quiz!.questions.forEach((question, index) => {
      if (question.correctAnswer === finalAnswers[index]) {
        correct++;
      }
    });

    const didPass = correct >= quiz!.minimumScore;

    setCorrectCount(correct);
    setPassed(didPass);
    setFinished(true);

    // depois conecta com API (ranking / xp)
    // api.post("/quizzes/submit", { quizId: quiz!.id, correct });
  }

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];

  return (
    <>
      <Header />

      <div className="quiz-page">
        {!finished ? (
          <div className="quiz-card">
            <h2>{quiz.title}</h2>

            <p className="quiz-progress">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>

            <h3>{question.statement}</h3>

            <div className="quiz-options">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            {passed ? (
              <>
                <h2>🎉 Congratulations!</h2>
                <p>
                  You got {correctCount} out of {quiz.questions.length} correct.
                </p>

                <Button
                  variant="contained"
                  sx={{ mt: 2, borderRadius: "999px" }}
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </>
            ) : (
              <>
                <h2>😕 Try Again</h2>
                <p>
                  You got {correctCount} out of {quiz.questions.length} correct.
                </p>
                <p>Minimum required: {quiz.minimumScore}</p>

                <Button
                  variant="contained"
                  sx={{ mt: 2, borderRadius: "999px" }}
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setFinished(false);
                    setPassed(null);
                  }}
                >
                  Retry Quiz
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
