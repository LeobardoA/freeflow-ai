import {
  ModelDataProps
} from "@/components/sqlite/ModelsData";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import ModelSelector from "./ModelSelector";

interface LoraPickerProps {
  isVisible: boolean;
  onClose: (id: string) => void;
  data: ModelDataProps[] | null;
}

const LoraPicker = ({
  isVisible,
  onClose,
  data,
}: LoraPickerProps) => {
  const colorScheme = useColorScheme();

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
              onClose("0");
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
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap", // Permite que los elementos se envuelvan en varias filas
                alignItems: "flex-start", // Alinea los elementos al inicio de la fila
                justifyContent: "space-evenly",
                rowGap: 25, // Espacio entre filas
              }}
            >
              {data?.map((modelData, key) => (
                <ModelSelector data={modelData} key={key} onClose={onClose} />
              ))}
            </View>
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
};

export default LoraPicker;

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
