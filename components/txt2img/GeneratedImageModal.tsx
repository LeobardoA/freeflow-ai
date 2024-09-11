import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useGenerationStore } from "../contexts/GenerationStore";

interface GeneratedImageProps {
  isVisible: boolean;
  imgUrl: any;
  onClose: () => void;
}

const GeneratedImageModal = ({
  isVisible,
  onClose,
  imgUrl,
}: GeneratedImageProps) => {
  const colorScheme = useColorScheme();

  const openImageInBrowser = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open URL");
    }
  };

  const findAttributeByName = (obj: any, key: any) => {
    // Si el objeto actual tiene la clave buscada, la devolvemos
    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }

    // Si el valor es un objeto, iteramos recursivamente
    for (let k in obj) {
      if (typeof obj[k] === "object" && obj[k] !== null) {
        const result: any = findAttributeByName(obj[k], key);
        if (result !== undefined) {
          return result;
        }
      }
    }

    return undefined; // Si no se encuentra, retornamos undefined
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={style.content}>
        <ThemedView
          style={[
            style.container,
            {
              borderColor:
                Colors[colorScheme === "light" ? "light" : "dark"].borderColor,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
            style={[
              style.closeButton,
              {
                borderColor:
                  Colors[colorScheme === "light" ? "light" : "dark"]
                    .borderColor,
                backgroundColor:
                  Colors[colorScheme === "light" ? "light" : "dark"].cardsColor,
              },
            ]}
          >
            <Ionicons
              name="close"
              size={22}
              color={
                Colors[colorScheme === "light" ? "light" : "dark"].textColor
              }
            />
          </TouchableOpacity>
          {imgUrl && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <FlatList
                data={imgUrl.successInfo.images}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => openImageInBrowser(item.url)}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{ width: 300, height: 450, marginHorizontal: 10 }}
                    />
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Remix"
                onPress={() => {
                  const seed = findAttributeByName(imgUrl, "Seed");
                  useGenerationStore.setState({ seed });
                  onClose();
                }}
              />
            </View>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
};

export default GeneratedImageModal;

const style = StyleSheet.create({
  content: {
    height: "100%",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "85%",
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 50,
  },
  closeButton: {
    borderWidth: 2,
    position: "absolute",
    right: -10,
    top: -10,
    padding: 5,
    borderRadius: 90,
    width: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
