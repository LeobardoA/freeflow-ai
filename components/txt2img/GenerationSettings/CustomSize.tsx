import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import useThemeColors from "@/hooks/useThemeColor";
import localization from "@/constants/languages";

const CustomSize = () => {
  const themeColor = useThemeColors();

  const width = useGenerationStore((state) => state.width);
  const height = useGenerationStore((state) => state.height);

  return (
    <View style={styles.content}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText>{localization.width}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={2000}
            onValueChange={(value) => {
              useGenerationStore.setState({ width: value });
            }}
            step={1}
            value={width}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + width}
            editable={false}
          />
        </View>
      </View>
      {/* HEIGHT */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText>{localization.height}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          <Slider
            style={styles.customSlider}
            thumbTintColor={themeColor.secondaryColor}
            minimumTrackTintColor={themeColor.secondaryColor}
            maximumTrackTintColor={themeColor.textColor}
            minimumValue={1}
            maximumValue={2000}
            onValueChange={(value) => {
              useGenerationStore.setState({ height: value });
            }}
            step={1}
            value={height}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={"" + height}
            editable={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    rowGap: 10,
  },
  customSlider: {
    width: "80%",
  },
  textInput: {
    width: 50,
    height: 30,
    textAlign: "center",
    fontSize: 12,
  },
});

export default CustomSize;
