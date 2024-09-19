import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { createTxt2imgData, text2img } from "../api/demo";
import { useGenerationStore } from "../contexts/GenerationStore";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import GeneratedImageModal from "./GeneratedImageModal";
import { MaterialIcons } from "@expo/vector-icons";

const GenerateButton = () => {
  const themeColor = useThemeColors();
  const count = useGenerationStore((state) => state.count);
  const data = useGenerationStore();
  const { steps, width, height, image_to_upscaler } = useGenerationStore(
    (state) => ({
      steps: state.steps,
      width: state.width,
      height: state.height,
      image_to_upscaler: state.image_to_upscaler,
    })
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState<any>("");

  const progressMessage = useGenerationStore(
    (state) => state.extra_progressMessage
  );

  const MODEL_FACTOR = 1;

  // Consolidamos los cálculos de costos en una función para evitar duplicar lógica
  const calculateCosts = () => {
    const baseCost = MODEL_FACTOR * count * (Math.ceil(steps / 5) / 5);

    let upscalerCost = 0;
    if (image_to_upscaler) {
      const { hr_second_pass_steps, hr_scale } = image_to_upscaler;
      const scaledWidth = width * hr_scale;
      const scaledHeight = height * hr_scale;
      const imageAreaInMB = (scaledWidth * scaledHeight) / 1024 / 1024;
      const roundedImageArea = Math.ceil(imageAreaInMB * 2) / 2;

      upscalerCost =
        MODEL_FACTOR *
        count *
        (Math.ceil(hr_second_pass_steps / 5) / 5) *
        roundedImageArea;
    }

    return baseCost + upscalerCost;
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    console.log("Generating Images...");

    try {
      const generationData = createTxt2imgData();
      generationData.stages[0].inputInitialize!.seed = data.seed;
      generationData.stages[0].inputInitialize!.count = count;
      generationData.stages[1].diffusion!.width = width;
      generationData.stages[1].diffusion!.height = height;
      generationData.stages[1].diffusion!.prompts[0].text = data.positivePrompt;
      generationData.stages[1].diffusion!.negativePrompts![0].text =
        data.negativePrompt;
      generationData.stages[1].diffusion!.sdModel = data.sdModel;
      generationData.stages[1].diffusion!.sampler = data.sampler;
      generationData.stages[1].diffusion!.cfgScale = data.cfgScale;
      generationData.stages[1].diffusion!.steps = steps;
      generationData.stages[1].diffusion!.lora = data.lora;

      if (image_to_upscaler !== undefined) {
        generationData.stages[2] = {
          type: "IMAGE_TO_UPSCALER",
          image_to_upscaler,
        };
      }

      const result = await text2img(generationData, totalCredits);
      setImgUrl(result);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
      setIsModalVisible(true);
    }
  };

  // Actualizamos los créditos al montar o cambiar datos relevantes
  const totalCredits = useMemo(
    () => calculateCosts(),
    [steps, width, height, image_to_upscaler, count]
  );
  const handleCountChange = (value: number) => {
    useGenerationStore.setState({ count: value });
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
          onValueChange={handleCountChange}
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
              : localization.generate + ":"}
          </ThemedText>
          <MaterialIcons name="bolt" size={20} color={themeColor.accentColor} />
          <ThemedText>{totalCredits}</ThemedText>
        </TouchableOpacity>
      </View>
      {progressMessage && (
        <ScrollView
          style={{ width: "100%", height: 80 }}
        >
          <ThemedText style={{ fontSize: 12 }}>
            {progressMessage}
          </ThemedText>
        </ScrollView>
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
    flexDirection: "row",
  },
});
