import { Colors } from "@/constants/Colors";
import localization from "@/constants/languages";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedView } from "../ThemedView";
import { GenerationPersistence } from "./Persistence";
import { useGenerationStore } from "../contexts/GenerationStore";

const Prompts = () => {
  const [loading, setLoading] = useState(true);

  const positivePrompt = useGenerationStore((state) => state.positivePrompt);
  const negativePrompt = useGenerationStore((state) => state.negativePrompt);

  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadData = async () => {
      await GenerationPersistence.loadFromStorage();
      useGenerationStore.setState({
        positivePrompt: GenerationPersistence.positivePrompt,
        negativePrompt: GenerationPersistence.negativePrompt,
      });
      setLoading(false);
    };

    loadData();
  }, []);

  const handlePositivePromptChange = async (text: string) => {
    useGenerationStore.setState({ positivePrompt: text });
    GenerationPersistence.positivePrompt = text;
    await GenerationPersistence.saveToStorage();
  };

  const handleNegativePromptChange = async (text: string) => {
    useGenerationStore.setState({ negativePrompt: text });
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
