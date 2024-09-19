import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import localization from "@/constants/languages";
import { useNumericDebouncer } from "@/hooks/useNumericDebouncer";
import useThemeColors from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const StepsCFG = () => {
  const themeColor = useThemeColors();

  const [localSteps, setLocalSteps] = useState<number>(25);
  const [steps, setSteps] = useState<string>(""+localSteps);
  const [localCFG, setLocalCFG] = useState<number>(7);
  const [cfg, setCFG] = useState<string>(""+localCFG);

  const debouncedSteps = useNumericDebouncer(localSteps);
  const debouncedCFG = useNumericDebouncer(localCFG);

  useEffect(() => {
    useGenerationStore.setState({ steps: debouncedSteps });
  }, [debouncedSteps]);

  useEffect(() => {
    useGenerationStore.setState({ cfgScale: debouncedCFG });
  }, [debouncedCFG]);

  const handleStepsChange = (text: string) => {
    if (!isNaN(Number(text))) {
      if (Number(text) === 0) {
        setLocalSteps(5);
        setSteps(text);
      } else {
        setLocalSteps(Number(text));
        setSteps(text);
      }
    } else {
      setSteps("");
      setLocalSteps(5);
    }
  };

  const handleCFGChange = (text: string) => {
    if (!isNaN(Number(text))) {
      if (Number(text) === 0) {
        setLocalCFG(1);
        setCFG(text);
      } else {
        setLocalCFG(Number(text));
        setCFG(text);
      }
    } else {
      setCFG("");
      setLocalCFG(1);
    }
  };

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
            onValueChange={(value) => handleStepsChange(value.toString())}
            step={1}
            value={localSteps} // Actualiza con el estado local
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={steps}
            onChangeText={handleStepsChange}
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
        <ThemedText>{localization.cfgScale}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={30}
            onValueChange={(value) => handleCFGChange(value.toString())}
            step={1}
            value={localCFG} // Actualiza con el estado local
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={cfg}
            onChangeText={handleCFGChange}
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
