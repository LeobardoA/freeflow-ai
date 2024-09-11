import localization from "@/constants/languages";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import CheckpointButton from "./Models/CheckpointButton";
import LoraButton from "./Models/LoraButton";
import { useGenerationStore } from "../contexts/GenerationStore";
import useThemeColors from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import { DB_GetModelsDataByUniqueId } from "../sqlite/ModelsData";

const Models = () => {
  const themeColor = useThemeColors();

  const loras = useGenerationStore((state) => state.lora);

  const [imgLora, setImgLora] = useState<string | undefined>(undefined);
  const [loraModelName, setLoraModelName] = useState<string>("");

  useEffect(() => {
    if (loras?.items[0]) {
      try {
        const model = loras.items[0].loraModel;
        console.log("recargando modelo");
        const data = DB_GetModelsDataByUniqueId(model);
        if (data[0]) {
          setImgLora(data[0].imagePath);
          setLoraModelName(data[0].projectName);
        }
      } catch (error) {
        console.error("An error has occurred while setting checkpoint");
      }
    }
  }, [loras]);

  const deleteModel = () => {
    useGenerationStore.setState({ lora: { items: [] } });
  };

  return (
    <ThemedView style={styles.content}>
      <ThemedText style={{ fontWeight: "bold" }}>
        {localization.models}
      </ThemedText>
      <CheckpointButton />
      {loras?.items.map((lora, index) => (
        <ThemedView
          style={[styles.loraContent, { borderColor: themeColor.borderColor }]}
          key={index}
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
              source={{ uri: imgLora ? imgLora : undefined }}
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
                {loraModelName}
              </ThemedText>
              <TouchableOpacity onPress={deleteModel}>
                <FontAwesome
                  name="trash"
                  size={18}
                  color={themeColor.textColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      ))}
      <LoraButton />
    </ThemedView>
  );
};

export default Models;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
  },
  loraContent: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
