import useThemeColors from "@/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  activeBorderColor?: string; // Nuevo prop para el color de borde activo
};

export function ThemedTextInput({
  style,
  activeBorderColor,
  ...rest
}: ThemedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const colors = useThemeColors();

  const color = colors.ti_textColor;
  const backgroundColor = colors.ti_backgroundColor;
  const borderColor = colors.ti_borderColor;
  const focusedBorderColor = activeBorderColor
    ? activeBorderColor
    : colors.primaryColor;
  const textDecorationColor = colors.ti_textPlaceHolderColor;

  return (
    <TextInput
      style={[
        {
          color,
          backgroundColor,
          borderColor: isFocused ? focusedBorderColor : borderColor,
        },
        styles.default,
        style,
      ]}
      placeholderTextColor={textDecorationColor}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      multiline
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    maxHeight: 100,
  },
});
