import React, { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../ThemedText";
import localization from "@/constants/languages";
import { ThemedTextInput } from "../ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { GenerationPersistence } from "./Persistence";
import { Ionicons } from "@expo/vector-icons";

const Prompts = () => {
  const [loading, setLoading] = useState(true);
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");

  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      await GenerationPersistence.loadFromStorage();
      setPositivePrompt(GenerationPersistence.positivePrompt);
      setNegativePrompt(GenerationPersistence.negativePrompt);
      setLoading(false);
    };

    loadData();
  }, []);

  const handlePositivePromptChange = async (text: string) => {
    setPositivePrompt(text);
    GenerationPersistence.positivePrompt = text;
    await GenerationPersistence.saveToStorage();
  };

  const handleNegativePromptChange = async (text: string) => {
    setNegativePrompt(text);
    GenerationPersistence.negativePrompt = text;
    await GenerationPersistence.saveToStorage();
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.primaryColor} />;
  }

  return (
    <ThemedView style={styles.content}>
      <View>
        <View style={styles.titleContainer}>
          <ThemedText>{localization.positivePrompt}:</ThemedText>
          <TouchableOpacity
            onPress={() => {
              handlePositivePromptChange("");
            }}
          >
            <Ionicons
              name="trash"
              size={18}
              color={
                Colors[colorScheme === "light" ? "light" : "dark"].textColor
              }
            />
          </TouchableOpacity>
        </View>
        <ThemedTextInput
          placeholder={localization.positivePrompt}
          activeBorderColor={Colors.light.successColor}
          value={positivePrompt}
          onChangeText={handlePositivePromptChange}
        />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <ThemedText>{localization.negativePrompt}:</ThemedText>
          <TouchableOpacity
            onPress={() => {
              handleNegativePromptChange("");
            }}
          >
            <Ionicons
              name="trash"
              size={18}
              color={
                Colors[colorScheme === "light" ? "light" : "dark"].textColor
              }
            />
          </TouchableOpacity>
        </View>
        <ThemedTextInput
          placeholder={localization.negativePrompt}
          activeBorderColor={Colors.light.errorColor}
          value={negativePrompt}
          onChangeText={handleNegativePromptChange}
        />
      </View>
    </ThemedView>
  );
};

export default Prompts;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
