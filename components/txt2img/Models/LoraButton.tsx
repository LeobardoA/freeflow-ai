import { useGenerationStore } from "@/components/contexts/GenerationStore";
import {
    DB_GetAllLorasData,
  DB_GetAllModelsData,
  ModelDataProps,
} from "@/components/sqlite/ModelsData";
import { ThemedText } from "@/components/ThemedText";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LoraPicker from "./LoraPicker";

const LoraButton = () => {
  const themeColor = useThemeColors();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lorasData, setLorasData] = useState<ModelDataProps[] | null>(null);

  const onLoraPressed = () => {
    const data = DB_GetAllLorasData();
    setLorasData(data);
    setIsModalVisible(true);
  };

  const closeModal = (id: string) => {
    setIsModalVisible(false);
    if (id !== "0") {
      console.log("Adding Lora Model");
      useGenerationStore.setState({
        lora: { items: [{ loraModel: id, weight: "0.8" }] },
      });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onLoraPressed}>
        <View style={[styles.content, { borderColor: themeColor.borderColor }]}>
          <ThemedText>{localization.add} LoRA</ThemedText>
        </View>
      </TouchableOpacity>
      <LoraPicker
        onClose={closeModal}
        data={lorasData}
        isVisible={isModalVisible}
      />
    </>
  );
};

export default LoraButton;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
