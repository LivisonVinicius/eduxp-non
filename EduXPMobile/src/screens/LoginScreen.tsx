// src/screens/LoginScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduXP</Text>
      <Text style={styles.subtitle}>Gamified Education</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar (Demo)</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Para demo rápida, remova a verificação de login no AppNavigator
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A6FA5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#4A6FA5",
    fontWeight: "600",
  },
  note: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
