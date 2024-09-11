import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createTxt2imgData, text2img } from "../api/demo";
import { useGenerationStore } from "../contexts/GenerationStore";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import GeneratedImageModal from "./GeneratedImageModal";

const GenerateButton = () => {
  const themeColor = useThemeColors();
  const count = useGenerationStore((state) => state.count);
  const progressMessage = useGenerationStore(
    (state) => state.extra_progressMessage
  );
  const data = useGenerationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [imgUrl, setImgUrl] = useState<any>("");

  const handleGenerate = async () => {
    setIsLoading(true);
    console.log("Generating Images...");
    const generationData = createTxt2imgData();

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
    generationData.stages[1].diffusion!.lora = data.lora;
    if (data.image_to_upscaler !== undefined) {
      generationData.stages[2] = {
        type: "IMAGE_TO_UPSCALER",
        image_to_upscaler: data.image_to_upscaler,
      };
    }

    // console.log(JSON.stringify(generationData, null, 2));
    const result = await text2img(generationData);
    // console.log("SE OBTUVO EL RESULTADO", JSON.stringify(result, null, 2));
    setImgUrl(result);
    setIsLoading(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          onPress={handleGenerate}
          disabled={isLoading}
        >
          <ThemedText>
            {isLoading
              ? localization.loadingResource + "..."
              : localization.generate}
          </ThemedText>
        </TouchableOpacity>
      </View>
      {progressMessage && (
        <ThemedText style={{ fontSize: 10 }}>{progressMessage}</ThemedText>
      )}
      <GeneratedImageModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        imgUrl={imgUrl}
      />
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
    marginHorizontal: 10,
  },
});
