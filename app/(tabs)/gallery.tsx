import { checkModelData } from "@/components/api/demo";
import { DB_NewModelData } from "@/components/sqlite/ModelsData";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import useThemeColors from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const gallery = () => {
  const themeColors = useThemeColors();

  const [modelId, setModelId] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [baseModel, setBaseModel] = useState<string>();
  const [modelType, setModelType] = useState<string>();
  const [projectName, setProjectName] = useState<string>();
  const [triggerWords, setTriggerWords] = useState<string>();

  const [images, setImages] = useState<string[]>([]);

  const [groupedImages, setGrouped] = useState<string[][]>([]);

  useEffect(() => {
    if (images) {
      const grouped = [];
      for (let i = 0; i < images.length; i += 2) {
        grouped.push(images.slice(i, i + 2));
      }
      setGrouped(grouped);
    }
  }, [images]);

  const handleModelSearch = async () => {
    if (modelId) {
      setIsLoading(true);
      console.log("Buscando modelo...");
      const data = await checkModelData(modelId);
      setId(data.id);
      setName(data.name);
      setDesc(data.description);
      setBaseModel(data.baseModel);
      setModelType(data.modelType);
      setProjectName(data.projectName);
      setTriggerWords(data.triggerWords);
      setImages(data.showcaseImageUrls);
      setIsLoading(false);
    }
  };

  const handleNewModel = async () => {
    if (
      baseModel &&
      selectedImage &&
      modelType &&
      name &&
      projectName &&
      id
    ) {
      console.log("Cargando modelo...");
      await DB_NewModelData({
        baseModel,
        desc,
        imagePath: selectedImage,
        modelType,
        name,
        projectName,
        triggerWords,
        uniqueId: id,
      });
    } else {
      Alert.alert("Error", "Faltan datos por completar");
    }
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <ThemedView
        style={styles.content}
        darkColor={Colors.dark.backgroundColor}
        lightColor={Colors.light.backgroundColor}
      >
        <ScrollView>
          <View style={{ rowGap: 20 }}>
            <ThemedView style={styles.container}>
              <ThemedText>Ingresa la url del modelo:</ThemedText>
              <ThemedTextInput value={modelId} onChangeText={setModelId} />
              <Button
                title={isLoading ? "Cargando..." : "Buscar"}
                onPress={handleModelSearch}
                color={themeColors.primaryColor}
                disabled={isLoading}
              />
            </ThemedView>

            <ThemedView style={styles.container}>
              <ThemedText>Modelo:</ThemedText>
              <ThemedTextInput editable={false} placeholder="ID" value={id} />
              <ThemedTextInput
                editable={false}
                placeholder="Name"
                value={name}
              />
              <ThemedTextInput
                editable={false}
                placeholder="Description"
                value={desc}
              />
              <ThemedTextInput
                editable={false}
                placeholder="Base Model"
                value={baseModel}
              />
              <ThemedTextInput
                editable={false}
                placeholder="Model Type"
                value={modelType}
              />
              <ThemedTextInput
                editable={false}
                placeholder="Project Name"
                value={projectName}
              />
              <ThemedTextInput
                editable={false}
                placeholder="TriggerWords"
                value={triggerWords}
              />
              <ThemedText>Imagenes:</ThemedText>
              <View style={{ alignItems: "center" }}>
                <FlatList
                  horizontal
                  pagingEnabled
                  data={groupedImages}
                  keyExtractor={(item, index) => item.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.imagesContainer}>
                      {item.map((image, index) => (
                        <TouchableOpacity
                          onPress={() => setSelectedImage(image)}
                        >
                          <Image
                            source={{ uri: image }}
                            style={[
                              styles.image,
                              selectedImage === image
                                ? styles.selectedImage
                                : {},
                            ]}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  style={[
                    styles.flatList,
                    {
                      borderColor: themeColors.borderColor,
                      backgroundColor: themeColors.backgroundColor,
                    },
                  ]}
                />
              </View>
            </ThemedView>
          </View>
        </ScrollView>
      </ThemedView>
      <ThemedView
        style={{
          width: "100%",
          borderTopWidth: 1,
          borderColor: themeColors.borderColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleNewModel}
          style={{
            width: "90%",
            height: 45,
            backgroundColor: themeColors.primaryColor,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <ThemedText>Cargar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
};

export default gallery;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  container: {
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
  },
  flatList: {
    width: 325,
    height: 275,
    borderRadius: 10,
    borderWidth: 1,
  },
  imagesContainer: {
    width: 325,
    height: 275,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 225,
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: Colors.dark.primaryColor,
  },
});
