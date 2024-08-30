import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import localization from "@/constants/languages";
import { GenerationPersistence } from "../Persistence";
import { checkModelData } from "@/components/api/demo";

const CheckpointButton = () => {
  const colorScheme = useColorScheme();

  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [modelName, setModelName] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await GenerationPersistence.loadFromStorage();
      //   setPositivePrompt(GenerationPersistence.positivePrompt);
      //   setNegativePrompt(GenerationPersistence.negativePrompt);
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
    <TouchableOpacity onPress={()=>{checkModelData("620924092268277297")}}>
      <ThemedView style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <Image
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
            ></ThemedText>
            <TouchableOpacity>
              <FontAwesome
                name="angle-right"
                size={18}
                color={
                  Colors[colorScheme === "light" ? "light" : "dark"].textColor
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default CheckpointButton;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderColor: Colors.dark.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});
