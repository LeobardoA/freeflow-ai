import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Picker } from "@react-native-picker/picker";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { useGenerationStore } from "../contexts/GenerationStore";
import { createTxt2imgData, text2img } from "../api/demo";
import { ThemedView } from "../ThemedView";

const GenerateButton = () => {
  const themeColor = useThemeColors();

  const count = useGenerationStore((state) => state.count);

  const data = useGenerationStore();

  const generateImage = async () => {
    console.log("Generating Images...");
    const generationData = createTxt2imgData();

    // Usando optional chaining correctamente
    generationData.stages[0].inputInitialize!.seed = data.seed;
    generationData.stages[0].inputInitialize!.count = data.count;
    generationData.stages[1].diffusion!.width = data.width;
    generationData.stages[1].diffusion!.height = data.height;
    generationData.stages[1].diffusion!.prompts[0].text = data.positivePrompt;
    generationData.stages[1].diffusion!.negativePrompts![0].text =
      data.negativePrompt;
    generationData.stages[1].diffusion!.sdModel = data.sdModel;
    generationData.stages[1].diffusion!.sampler = data.sampler;
    generationData.stages[1].diffusion!.cfgScale = data.cfgScale;
    generationData.stages[1].diffusion!.steps = data.steps;

    // console.log(JSON.stringify(generationData, null, 4));
    await text2img(generationData);
  };

  return (
    <ThemedView
      style={[styles.content, { borderTopColor: themeColor.borderColor }]}
    >
      <View style={styles.header}>
        <Picker
          mode="dropdown"
          style={styles.dropdown}
          selectedValue={count}
          onValueChange={(value) =>
            useGenerationStore.setState({ count: value })
          }
        >
          <Picker.Item
            label="1"
            value={1}
            color={themeColor.textColor}
            style={{ backgroundColor: themeColor.cardsColor }}
          />
          <Picker.Item
            label="2"
            value={2}
            color={themeColor.textColor}
            style={{ backgroundColor: themeColor.cardsColor }}
          />
          <Picker.Item
            label="4"
            value={4}
            color={themeColor.textColor}
            style={{ backgroundColor: themeColor.cardsColor }}
          />
        </Picker>
        <TouchableOpacity
          style={[
            styles.generateBtn,
            { backgroundColor: themeColor.secondaryColor },
          ]}
          onPress={generateImage}
        >
          <ThemedText>{localization.generate}</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default GenerateButton;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    borderTopWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: 100,
    height: 25,
    overflow: "hidden",
    borderRadius: 10,
  },
  generateBtn: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 10
  },
});
