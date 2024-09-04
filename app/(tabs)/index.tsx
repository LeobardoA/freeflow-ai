import { ThemedView } from "@/components/ThemedView";
import GenerateButton from "@/components/txt2img/GenerateButton";
import GenerationSettings from "@/components/txt2img/GenerationSettings";
import Models from "@/components/txt2img/Models";
import Prompts from "@/components/txt2img/Prompts";
import { Colors } from "@/constants/Colors";
import localization from "@/constants/languages";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";

export default function HomeScreen() {
  console.log(localization.welcome);

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
