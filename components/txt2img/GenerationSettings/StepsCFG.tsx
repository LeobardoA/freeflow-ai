import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";

const StepsCFG = () => {
  const themeColor = useThemeColors();

  const steps = useGenerationStore((state) => state.steps);
  const cfgScale = useGenerationStore((state) => state.cfgScale);

  // Estados locales para manejar el slider instantáneamente
  const [localSteps, setLocalSteps] = useState(steps);
  const [localCfgScale, setLocalCfgScale] = useState(cfgScale);

  // Refs para los timeouts del debouncer
  const stepsTimeout = useRef(null);
  const cfgScaleTimeout = useRef<number | null>(null);

  // Debouncer para el valor de 'steps'
  const handleStepsChange = (value: number) => {
    setLocalSteps(value);

    if (stepsTimeout.current) {
      clearTimeout(stepsTimeout.current);
    }

    // Actualiza el contexto después de un pequeño retraso
    stepsTimeout.current = setTimeout(() => {
      useGenerationStore.setState({ steps: value });
    }, 300); // 300ms de debounce
  };

  // Debouncer para el valor de 'cfgScale'
  const handleCfgScaleChange = (value: number) => {
    setLocalCfgScale(value);

    if (cfgScaleTimeout.current) {
      clearTimeout(cfgScaleTimeout.current);
    }

    // Actualiza el contexto después de un pequeño retraso
    cfgScaleTimeout.current = setTimeout(() => {
      useGenerationStore.setState({ cfgScale: value });
    }, 300); // 300ms de debounce
  };

  // Sincroniza el estado local con el del contexto cuando cambie
  useEffect(() => {
    setLocalSteps(steps);
  }, [steps]);

  useEffect(() => {
    setLocalCfgScale(cfgScale);
  }, [cfgScale]);

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
            onValueChange={handleStepsChange}
            step={1}
            value={localSteps} // Actualiza con el estado local
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + localSteps} // Actualiza con el estado local
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
        <ThemedText>{localization.cfgScale}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={30}
            onValueChange={handleCfgScaleChange}
            step={1}
            value={localCfgScale} // Actualiza con el estado local
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + localCfgScale} // Actualiza con el estado local
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
