// src/types.ts
export type User = {
  id: string;
  name: string;
  level: number;
  xp: number;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  xpReward: number;
  requiredLevel: number;
  isLocked: boolean;
};

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
};

export type RootStackParamList = {
  Home: undefined;
  Quiz: { quizId: string };
  Ranking: undefined;
  Login: undefined;
};
