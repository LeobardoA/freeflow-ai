import { useGenerationStore } from "@/components/contexts/GenerationStore";
import { ThemedText } from "@/components/ThemedText";
import { Sampler } from "@/constants/API_CONSTANTS";
import localization from "@/constants/languages";
import useThemeColors from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

const SamplerPicker = () => {
  const sampler = useGenerationStore((state) => state.sampler);
    const colors = useThemeColors();

  return (
    <View>
      <ThemedText>{localization.samplerMethod}</ThemedText>
      <Picker
        mode="dropdown"
        selectedValue={sampler}
        onValueChange={(itemValue) =>
          useGenerationStore.setState({ sampler: itemValue })
        }
        dropdownIconColor={colors.secondaryColor}
      >
        {Object.entries(Sampler).map(([value, label]) => (
          <Picker.Item key={value} label={label} value={label} color={colors.textColor} style={{backgroundColor:colors.cardsColor}} />
        ))}
      </Picker>
    </View>
  );
};

export default SamplerPicker;
