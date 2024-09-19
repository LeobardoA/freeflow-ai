import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import useThemeColors from "@/hooks/useThemeColor";
import localization from "@/constants/languages";
import { useNumericDebouncer } from "@/hooks/useNumericDebouncer";

const CustomSize = () => {
  const themeColor = useThemeColors();

  // Inicializamos los valores desde el store directamente
  const initialWidth = useGenerationStore((state) => state.width);
  const initialHeight = useGenerationStore((state) => state.height);

  // Manejamos estados locales y sus correspondientes versiones para el TextInput
  const [localWidth, setLocalWidth] = useState<number>(initialWidth);
  const [width, setWidth] = useState<string>("" + initialWidth);
  const [localHeight, setLocalHeight] = useState<number>(initialHeight);
  const [height, setHeight] = useState<string>("" + initialHeight);

  // Debounced values
  const debouncedWidth = useNumericDebouncer(localWidth);
  const debouncedHeight = useNumericDebouncer(localHeight);

  // Solo actualizamos el estado global cuando el valor ha sido debounced
  useEffect(() => {
    useGenerationStore.setState({ width: debouncedWidth });
  }, [debouncedWidth]);

  useEffect(() => {
    useGenerationStore.setState({ height: debouncedHeight });
  }, [debouncedHeight]);

  // Handlers para cambios en los inputs
  const handleWidthChange = (text: string) => {
    if (!isNaN(Number(text))) {
      setLocalWidth(Number(text) || 1);
      setWidth(text);
    } else {
      setWidth("");
    }
  };

  const handleHeightChange = (text: string) => {
    if (!isNaN(Number(text))) {
      setLocalHeight(Number(text) || 1);
      setHeight(text);
    } else {
      setHeight("");
    }
  };

  return (
    <View style={styles.content}>
      {/* WIDTH */}
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
            onValueChange={(value) => handleWidthChange(value.toString())}
            step={1}
            value={localWidth}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={width}
            onChangeText={handleWidthChange}
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
            onValueChange={(value) => handleHeightChange(value.toString())}
            step={1}
            value={localHeight}
          />
          <ThemedTextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={height}
            onChangeText={handleHeightChange}
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
