import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SizeButtonProps {
  isFocused: boolean;
  onPress: (index: number) => void;
  index: number;
  baseModel: string;
}

const SizeButton = ({
  isFocused,
  onPress,
  index,
  baseModel,
}: SizeButtonProps) => {
  const themeColor = useThemeColors();

  let buttonText = "";
  let widthS = 0;
  let heightS = 0;
  if (baseModel === "SD 1.5") {
    switch (index) {
      case 0:
        buttonText = "512x512";
        widthS = 25;
        heightS = 25;
        break;
      case 1:
        buttonText = "512x768";
        widthS = 20;
        heightS = 30;
        break;
      case 2:
        buttonText = "768x512";
        widthS = 30;
        heightS = 20;
        break;
      case 3:
        buttonText = localization.custom; // Assuming localization.custom is a string
        break;
      default:
        buttonText = "";
    }
  } else {
    switch (index) {
      case 0:
        buttonText = "1024x1024";
        widthS = 25;
        heightS = 25;
        break;
      case 1:
        buttonText = "832x1216";
        widthS = 20;
        heightS = 30;
        break;
      case 2:
        buttonText = "1216x832";
        widthS = 30;
        heightS = 20;
        break;
      case 3:
        buttonText = localization.custom; // Assuming localization.custom is a string
        break;
      default:
        buttonText = "";
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(index);
      }}
      style={[
        styles.button,
        {
          borderLeftWidth: index > 0 ? 1 : 0,
          backgroundColor: isFocused ? themeColor.primaryColor : "transparent",
          borderColor: themeColor.borderColor,
        },
      ]}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          paddingVertical: "12%",
        }}
      >
        {index !== 3 ? (
          <View
            style={{
              width: widthS,
              height: heightS,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: isFocused ? "#000" : themeColor.textColor,
            }}
          />
        ) : (
          <FontAwesome name="sliders" size={25} color={themeColor.textColor} />
        )}
        <Text
          style={{
            color: isFocused ? "#FFF" : themeColor.textColor,
            fontSize: 12,
          }}
        >
          {buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SizeButton;
