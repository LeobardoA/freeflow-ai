import { ModelDataProps } from "@/components/sqlite/ModelsData";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import localization from "@/constants/languages";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface ModelSelectorProps {
  data: ModelDataProps;
  onClose: (id: string, base: string) => void;
}

const ModelSelector = ({ data, onClose }: ModelSelectorProps) => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      style={[
        styles.content,
        {
          borderColor:
            Colors[colorScheme === "light" ? "light" : "dark"].borderColor,
        },
      ]}
    >
      {/* IMAGE CONTAINER */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.imagePath }} style={styles.image} />
      </View>
      {/* TITLE */}
      <View style={styles.metaContainer}>
        <ThemedText numberOfLines={1} style={styles.title}>
          {data.projectName}
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.btnSelect,
            {
              borderColor:
                Colors[colorScheme === "light" ? "light" : "dark"].borderColor,
            },
          ]}
          onPress={() => {
            onClose(data.uniqueId, data.baseModel);
          }}
        >
          <ThemedText style={{ fontSize: 12 }}>
            {localization.select}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default ModelSelector;

const styles = StyleSheet.create({
  content: {
    width: 150,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  metaContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    flex: 1,
  },
  title: {
    width: "90%",
    textAlign: "center",
    fontSize: 12,
  },
  btnSelect: {
    borderWidth: 1,
    width: "90%",
    paddingVertical: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
