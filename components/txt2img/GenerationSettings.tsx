import localization from "@/constants/languages";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import SamplerPicker from "./GenerationSettings/SamplerPicker";
import SizeSelector from "./GenerationSettings/SizeSelector";
import StepsCFG from "./GenerationSettings/StepsCFG";
import { ThemedTextInput } from "../ThemedTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useGenerationStore } from "../contexts/GenerationStore";
import useThemeColors from "@/hooks/useThemeColor";

const GenerationSettings = () => {
  const seed = useGenerationStore((state) => state.seed);

  const changeSeed = (text: string) => {
    useGenerationStore.setState({ seed: text });
  };

  const themeColor = useThemeColors();

  return (
    <ThemedView style={styles.content}>
      <ThemedText style={{ fontWeight: "bold" }}>
        {localization.settings}
      </ThemedText>
      <SizeSelector />
      <SamplerPicker />
      <StepsCFG />
      <ThemedText>{localization.seed}:</ThemedText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: 10,
        }}
      >
        <ThemedTextInput
          style={styles.seedInput}
          value={seed}
          inputMode="numeric"
          onChangeText={changeSeed}
        />
        <TouchableOpacity onPress={() => changeSeed("-1")}>
          <Ionicons name="dice" size={25} color={themeColor.textColor} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default GenerationSettings;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
  },
  seedInput: {
    flex: 1,
  },
});
