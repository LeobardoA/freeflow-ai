import { setupDatabase } from "@/components/sqlite/ModelsData";
import { ThemedView } from "@/components/ThemedView";
import GenerateButton from "@/components/txt2img/GenerateButton";
import GenerationSettings from "@/components/txt2img/GenerationSettings";
import Models from "@/components/txt2img/Models";
import Prompts from "@/components/txt2img/Prompts";
import UpscalerSettings from "@/components/txt2img/UpscalerSettings";
import { Colors } from "@/constants/Colors";
import useThemeColors from "@/hooks/useThemeColor";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const themeColor = useThemeColors();

  useEffect(() => {
    setupDatabase();
  }, []);

  return (
    <ThemedView
      style={styles.content}
      darkColor={Colors.dark.backgroundColor}
      lightColor={Colors.light.backgroundColor}
    >
      <ScrollView>
        <View style={{ rowGap: 20, padding: 10 }}>
          <Prompts />
          <Models />
          <GenerationSettings />
          <UpscalerSettings />
        </View>
      </ScrollView>
      <GenerateButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
