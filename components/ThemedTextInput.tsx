import { useState } from "react";
import useThemeColor from "@/hooks/useThemeColor";
import { TextInput, type TextInputProps, StyleSheet } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  activeBorderColor?: string ; // Nuevo prop para el color de borde activo
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  activeBorderColor,
  ...rest
}: ThemedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "ti_textColor"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "ti_backgroundColor"
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "ti_borderColor"
  );
  const focusedBorderColor = useThemeColor(
    { light: activeBorderColor, dark: activeBorderColor },
    "primaryColor"
  ); // Usa el color primario cuando esté activo por defecto
  const textDecorationColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "ti_textPlaceHolderColor"
  );

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
