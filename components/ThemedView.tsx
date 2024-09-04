import useThemeColor from "@/hooks/useThemeColor";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  type ViewProps,
} from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const themeColors = useThemeColor();
  const backgroundColor =
    lightColor || darkColor
      ? useColorScheme() === "light"
        ? lightColor || themeColors.cardsColor
        : darkColor || themeColors.cardsColor
      : themeColors.cardsColor;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
