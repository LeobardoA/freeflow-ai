import React from "react";

import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useThemeColors from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  const themeColor = useThemeColors();

  return (
    <Stack
      screenOptions={{
        header: ({ navigation, route }) => (
          <SafeAreaView>
            <StatusBar backgroundColor={themeColor.cardsColor} />
            <ThemedView
              style={{
                flexDirection: "row",
                padding: 10,
                elevation: 2,
              }}
            >
              {route.name === "gallery" ? (
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 10,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="arrow-back"
                      size={22}
                      color={themeColor.textColor}
                    />
                  </TouchableOpacity>
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
              ) : (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
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
                  <TouchableOpacity
                    onPress={() => {
                      router.navigate("/gallery");
                    }}
                  >
                    <MaterialIcons
                      name="photo-library"
                      size={22}
                      color={themeColor.textColor}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ThemedView>
          </SafeAreaView>
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="gallery" />
    </Stack>
  );
}
