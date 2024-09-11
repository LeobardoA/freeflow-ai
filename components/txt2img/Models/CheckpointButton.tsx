import { useGenerationStore } from "@/components/contexts/GenerationStore";
import {
  DB_GetAllCheckpoints,
  DB_GetModelsDataByUniqueId,
  ModelDataProps,
} from "@/components/sqlite/ModelsData";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useThemeColors from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import CheckpointPicker from "./CheckpointPicker"; // Importa tu modal

const CheckpointButton = () => {
  const themeColor = useThemeColors();

  const sdModel = useGenerationStore((state) => state.sdModel);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modelName, setModelName] = useState("Undefined");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [checkpointsData, setCheckpointsData] = useState<
    ModelDataProps[] | null
  >(null);

  useEffect(() => {
    if (sdModel !== "") {
      try {
        console.log("recargando modelo");
        const data = DB_GetModelsDataByUniqueId(sdModel);
        if (data[0]) {
          setImage(data[0].imagePath);
          setModelName(data[0].projectName);
        }
      } catch (error) {
        console.error("An error has occurred while setting checkpoint");
      }
    }
  }, [sdModel]);

  const onCheckpointPressed = () => {
    const data = DB_GetAllCheckpoints();
    setCheckpointsData(data);
    setIsModalVisible(true);
  };

  const closeModal = (id: string, base: string) => {
    setIsModalVisible(false);
    if (id !== "0") {
      console.log("Changing Model");
      useGenerationStore.setState({ sdModel: id, extra_baseModel: base });
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onCheckpointPressed}>
        <ThemedView
          style={[styles.content, { borderColor: themeColor.borderColor }]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <Image
              source={{ uri: image ? image : undefined }}
              style={{
                backgroundColor: "#000",
                width: 60,
                height: 60,
                overflow: "hidden",
                borderRadius: 5,
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ThemedText
                adjustsFontSizeToFit
                numberOfLines={2}
                style={{ width: 220 }}
              >
                {modelName}
              </ThemedText>
              <FontAwesome
                name="angle-right"
                size={18}
                color={themeColor.textColor}
              />
            </View>
          </View>
        </ThemedView>
      </TouchableOpacity>

      {/* Agregar el modal aquí */}
      <CheckpointPicker
        isVisible={isModalVisible}
        onClose={closeModal}
        data={checkpointsData}
      />
    </>
  );
};

export default CheckpointButton;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
