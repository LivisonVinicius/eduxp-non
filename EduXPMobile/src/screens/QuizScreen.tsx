// src/screens/QuizScreen.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const QUESTIONS = [
  {
    id: "1",
    text: "Quanto é 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
  {
    id: "2",
    text: "Qual a capital do Brasil?",
    options: ["Rio", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: 2,
  },
];

export default function QuizScreen() {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const question = QUESTIONS[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correct = newAnswers.filter(
        (ans, idx) => ans === QUESTIONS[idx].correctAnswer,
      ).length;
      const xpEarned = correct * 20;

      Alert.alert(
        "Quiz Concluído!",
        `Acertou ${correct} de ${QUESTIONS.length} questões!\nGanhou ${xpEarned} XP!`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Questão {currentQuestion + 1} de {QUESTIONS.length}
        </Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  progress: {
    fontSize: 16,
    color: "#666",
  },
  questionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    minHeight: 120,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  options: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4A6FA5",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
