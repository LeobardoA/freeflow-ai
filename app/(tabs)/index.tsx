import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Prompts from "@/components/txt2img/Prompts";
import { Colors } from "@/constants/Colors";
import localization from "@/constants/languages";
import { useEffect } from "react";
import Models from "@/components/txt2img/Models";
import { setupDatabase } from "@/components/sqlite/Txt2ImgRequests";

export default function HomeScreen() {
  useEffect(() => {
    setupDatabase();
  }, []);

  // const generateImage = async () => {
  //   text2img(createTxt2imgData());
  //   await DB_GetLastTxt2ImgRequests();
  // };

  console.log(localization.welcome);

  return (
    <ThemedView
      style={styles.content}
      darkColor={Colors.dark.backgroundColor}
      lightColor={Colors.light.backgroundColor}
    >
      <Prompts />
      <Models />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    rowGap: 20,
  },
});
