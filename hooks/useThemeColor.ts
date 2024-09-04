import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return Colors[colorScheme === "light" ? "light" : "dark"];
};

export default useThemeColors;