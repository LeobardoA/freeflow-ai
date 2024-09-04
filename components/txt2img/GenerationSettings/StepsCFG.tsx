import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, View } from "react-native";

const StepsCFG = () => {
  const themeColor = useThemeColors();

  const steps = useGenerationStore((state) => state.steps);
  const cfgScale = useGenerationStore((state) => state.cfgScale);

  return (
    <View style={styles.content}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ThemedText>{localization.steps}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={60}
            onValueChange={(value) => {
              useGenerationStore.setState({ steps: value });
            }}
            step={1}
            value={steps}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + steps}
            editable={false}
          />
        </View>
      </View>
      {/* CFG SCALE */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ThemedText>{localization.steps}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(value) => {
              useGenerationStore.setState({ cfgScale: value });
            }}
            step={1}
            value={cfgScale}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + cfgScale}
            editable={false}
          />
        </View>
      </View>
    </View>
  );
};

export default StepsCFG;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customSlider: {
    flex: 3,
  },
  textInput: {
    flex: 1,
    height: 30,
    textAlign: "center",
    fontSize: 12,
  },
});
