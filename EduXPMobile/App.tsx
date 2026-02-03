// App.tsx
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  return <AppNavigator />;
}
