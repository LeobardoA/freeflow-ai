import React from "react";

import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <SafeAreaView>
            <ThemedView
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                paddingLeft: 10,
              }}
            >
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
            </ThemedView>
          </SafeAreaView>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
