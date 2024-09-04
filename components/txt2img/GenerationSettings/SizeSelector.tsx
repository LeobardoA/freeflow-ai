import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import CustomSize from "./CustomSize";
import SizeButton from "./SizeButton";

const SizeSelector = () => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const baseModel = useGenerationStore((state) => state.extra_baseModel);

  const handlePress = (index: number) => {
    setSelectedButton(index);
  };

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.btnsContainer,
          {
            borderColor:
              Colors[colorScheme === "light" ? "light" : "dark"].borderColor,
          },
        ]}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SizeButton
            key={index}
            isFocused={selectedButton === index}
            onPress={() => handlePress(index)}
            index={index}
            baseModel={baseModel}
          />
        ))}
      </View>
      {selectedButton === 3 ? (
        <CustomSize />
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10
  },
  btnsContainer: {
    width: "100%",
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
});

export default SizeSelector;
