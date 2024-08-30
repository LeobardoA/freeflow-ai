import localization from "@/constants/languages";
import React from "react";
import {
  StyleSheet,
  useColorScheme
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import CheckpointButton from "./Models/CheckpointButton";

const Models = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.content}>
      <ThemedText>{localization.models}</ThemedText>
      <CheckpointButton/>
    </ThemedView>
  );
};

export default Models;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
  },
});
