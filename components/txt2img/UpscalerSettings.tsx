import React, { useEffect } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useGenerationStore } from "../contexts/GenerationStore";

const UpscalerSettings = () => {
  const [isActive, setIsActive] = React.useState(false);

  const toggleSwitch = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      useGenerationStore.setState({
        image_to_upscaler: {
          hr_upscaler: "4x-AnimeSharp",
          hr_scale: 2,
          hr_second_pass_steps: 25,
          denoising_strength: 0.3,
        },
      });
    } else {
      useGenerationStore.setState({ image_to_upscaler: undefined });
    }
  }, [isActive]);

  return (
    <ThemedView style={styles.content}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText style={{ fontWeight: "bold" }}>Upscaler</ThemedText>
        <Switch onValueChange={toggleSwitch} value={isActive} />
      </View>
    </ThemedView>
  );
};

export default UpscalerSettings;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
  },
});
