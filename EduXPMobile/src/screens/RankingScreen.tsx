import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const RANKING = [
  { id: "1", name: "Maria Santos", level: 5, xp: 1200 },
  { id: "2", name: "João Silva", level: 4, xp: 980 },
  { id: "3", name: "Pedro Costa", level: 4, xp: 950 },
  { id: "4", name: "Ana Oliveira", level: 3, xp: 750 },
  { id: "5", name: "Carlos Lima", level: 3, xp: 720 },
];

export default function RankingScreen() {
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.level}>Nível {item.level}</Text>
      </View>
      <Text style={styles.xp}>{item.xp} XP</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking Top 5</Text>

      <FlatList
        data={RANKING}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A6FA5",
    width: 40,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  level: {
    fontSize: 14,
    color: "#666",
  },
  xp: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9800",
  },
});
