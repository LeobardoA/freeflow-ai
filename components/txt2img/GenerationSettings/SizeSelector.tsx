import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import CustomSize from "./CustomSize";
import SizeButton from "./SizeButton";

const SizeSelector = () => {
  const [selectedButton, setSelectedButton] = useState<number>(0);
  const baseModel = useGenerationStore((state) => state.extra_baseModel);

  const handlePress = (index: number) => {
    setSelectedButton(index);
    let x: number, y: number;
    switch (index) {
      case 0:
        if (baseModel === "SD 1.5") {
          x = 512;
          y = 512;
        } else {
          x = 1024;
          y = 1024;
        }
        useGenerationStore.setState({ width: x, height: y });
        break;
      case 1:
        if (baseModel === "SD 1.5") {
          x = 512;
          y = 768;
        } else {
          x = 832;
          y = 1216;
        }
        useGenerationStore.setState({ width: x, height: y });
        break;
      case 2:
        if (baseModel === "SD 1.5") {
          x = 768;
          y = 512;
        } else {
          x = 1216;
          y = 832;
        }
        useGenerationStore.setState({ width: x, height: y });
        break;
    }
  };

  useEffect(() => {
    if (selectedButton < 3) {
      handlePress(selectedButton);
    }
  }, [baseModel]);

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
            onPress={handlePress}
            index={index}
            baseModel={baseModel}
          />
        ))}
      </View>
      {selectedButton === 3 ? <CustomSize /> : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
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
