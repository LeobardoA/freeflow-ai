import { Colors } from "@/constants/Colors";
import localization from "@/constants/languages";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedTextInput } from "../ThemedTextInput";
import { ThemedView } from "../ThemedView";
import { useGenerationStore } from "../contexts/GenerationStore";
import useThemeColors from "@/hooks/useThemeColor";

const Prompts = () => {
  const positivePrompt = useGenerationStore((state) => state.positivePrompt);

  const negativePrompt = useGenerationStore((state) => state.negativePrompt);

  const handlePositivePromptChange = (text: string) => {
    useGenerationStore.setState({ positivePrompt: text });
  };

  const handleNegativePromptChange = (text: string) => {
    useGenerationStore.setState({ negativePrompt: text });
  };

  const themeColor = useThemeColors();

  return (
    <ThemedView style={styles.content}>
      <View>
        <View style={styles.titleContainer}>
          <ThemedText>{localization.positivePrompt}:</ThemedText>
          <TouchableOpacity onPress={() => handlePositivePromptChange("")}>
            <Ionicons name="trash" size={18} color={themeColor.textColor} />
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
          <TouchableOpacity onPress={() => handleNegativePromptChange("")}>
            <Ionicons name="trash" size={18} color={themeColor.textColor} />
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
