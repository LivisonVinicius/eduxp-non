// src/screens/HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

// Dados mockados - rápido!
const QUIZZES = [
  {
    id: "1",
    title: "Matemática Básica",
    description: "Operações simples",
    questionCount: 5,
    xpReward: 100,
    requiredLevel: 1,
    isLocked: false,
  },
  {
    id: "2",
    title: "Português",
    description: "Gramática e ortografia",
    questionCount: 8,
    xpReward: 150,
    requiredLevel: 2,
    isLocked: true,
  },
  {
    id: "3",
    title: "Ciências",
    description: "Conhecimentos gerais",
    questionCount: 6,
    xpReward: 120,
    requiredLevel: 1,
    isLocked: false,
  },
];

const USER = {
  id: "1",
  name: "João Silva",
  level: 2,
  xp: 450,
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleQuizPress = (quiz: any) => {
    if (quiz.isLocked) {
      Alert.alert("Bloqueado", `Precisa do nível ${quiz.requiredLevel}`);
    } else {
      navigation.navigate("Quiz", { quizId: quiz.id });
    }
  };

  const renderQuiz = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.quizCard, item.isLocked && styles.lockedCard]}
      onPress={() => handleQuizPress(item)}
    >
      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>{item.title}</Text>
        {item.isLocked && (
          <Ionicons
            name="lock-closed"
            size={20}
            color="#999"
          />
        )}
      </View>
      <Text style={styles.quizDesc}>{item.description}</Text>
      <View style={styles.quizFooter}>
        <Text style={styles.quizInfo}>{item.questionCount} questões</Text>
        <Text style={styles.quizXp}>{item.xpReward} XP</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header simples */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá, {USER.name}!</Text>
        <View style={styles.userInfo}>
          <Text style={styles.level}>Nível {USER.level}</Text>
          <Text style={styles.xp}>{USER.xp} XP</Text>
        </View>
      </View>

      {/* Quizzes */}
      <FlatList
        data={QUIZZES}
        renderItem={renderQuiz}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Botão ranking */}
      <TouchableOpacity
        style={styles.rankingButton}
        onPress={() => navigation.navigate("Ranking")}
      >
        <Ionicons
          name="trophy"
          size={24}
          color="#fff"
        />
        <Text style={styles.rankingText}>Ver Ranking</Text>
      </TouchableOpacity>
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
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 5,
  },
  level: {
    fontSize: 16,
    color: "#4A6FA5",
    marginRight: 15,
  },
  xp: {
    fontSize: 16,
    color: "#FF9800",
  },
  list: {
    paddingBottom: 20,
  },
  quizCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.7,
    backgroundColor: "#eee",
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  quizDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },
  quizFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quizInfo: {
    fontSize: 14,
    color: "#4A6FA5",
  },
  quizXp: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF9800",
  },
  rankingButton: {
    backgroundColor: "#4A6FA5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  rankingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
