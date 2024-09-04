import { useGenerationStore } from "@/components/contexts/GenerationStore";
import {
  DB_GetModelsDataByUniqueId
} from "@/components/sqlite/ModelsData";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import * as Progress from "react-native-progress";
import { GenerationPersistence } from "../Persistence";
import CheckpointPicker from "./CheckpointPicker";

const CheckpointButton = () => {
  const themeColor = useThemeColors();

  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modelName, setModelName] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openCheckpointDialog = async () => {
    setIsModalVisible(true);
  };

  const onNewCheckpoint = async (id: string) => {
    if (id === "0") {
      setIsModalVisible(false);
      return;
    }

    console.log("Model Selected: ", id);
    setIsLoading(true);

    try {
      const modelData = await DB_GetModelsDataByUniqueId(id);

      if (modelData && modelData.length > 0) {
        const { baseModel, imagePath, projectName } = modelData[0];

        GenerationPersistence.sdModel = id;
        GenerationPersistence.extra_baseModel = baseModel;

        useGenerationStore.setState({
          sdModel: id,
          extra_baseModel: baseModel,
        });

        setImage(imagePath);
        setModelName(projectName);
      }

      await GenerationPersistence.saveToStorage();
    } catch (error) {
      console.error("Error processing checkpoint:", error);
      // Aquí podrías manejar el error adecuadamente, como mostrar un mensaje al usuario
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await GenerationPersistence.loadFromStorage();
      const sdModel = GenerationPersistence.sdModel;
      useGenerationStore.setState({
        sdModel: GenerationPersistence.sdModel,
        extra_baseModel: GenerationPersistence.extra_baseModel,
      });

      if (sdModel) {
        const modelData = await DB_GetModelsDataByUniqueId(sdModel);

        if (modelData && modelData.length > 0) {
          setImage(modelData[0].imagePath);
          setModelName(modelData[0].projectName);
        }
      }

      setIsLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <ThemedView style={styles.content}>
        <ThemedText>{localization.loadingResource}</ThemedText>
        <Progress.Bar indeterminate style={{ width: "90%" }} />
      </ThemedView>
    );
  }

  return (
    <TouchableOpacity onPress={openCheckpointDialog}>
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
            source={{ uri: image }}
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
            <TouchableOpacity>
              <FontAwesome
                name="angle-right"
                size={18}
                color={themeColor.textColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CheckpointPicker
          isVisible={isModalVisible}
          onClose={onNewCheckpoint}
        />
      </ThemedView>
    </TouchableOpacity>
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
