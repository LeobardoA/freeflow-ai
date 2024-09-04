import React from "react";

import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import useThemeColors from "@/hooks/useThemeColor";

export default function TabLayout() {
  const themeColor = useThemeColors();

  return (
    <Stack
      screenOptions={{
        header: () => (
          <SafeAreaView>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <ThemedText
                  style={{
                    fontSize: 22,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  FreeFlow{" "}
                </ThemedText>
                <Text
                  style={{
                    fontSize: 22,
                    color: Colors.dark.primaryColor,
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                >
                  AI
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons
                  name="photo-library"
                  size={22}
                  color={themeColor.textColor}
                />
              </TouchableOpacity>
            </ThemedView>
          </SafeAreaView>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
