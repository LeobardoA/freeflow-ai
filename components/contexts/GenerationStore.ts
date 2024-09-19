import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface GenerationStore {
  seed: string;
  count: number;
  width: number;
  height: number;
  positivePrompt: string;
  negativePrompt: string;
  sdModel: string;
  sdVae: string;
  sampler: string;
  steps: number;
  cfgScale: number;
  clipSkip: number;
  etaNoise: number;
  extra_baseModel: string;
  lora?: {
    items: {
      loraModel: string;
      weight: string;
    }[];
  };
  image_to_upscaler?: {
    hr_upscaler: string;
    hr_scale: number;
    hr_second_pass_steps: number;
    denoising_strength: number;
  };
  remainingCredits: number;
  _hasHydrated: boolean;
  extra_progressMessage?:string;

  setHasHydrated: (state: boolean) => void;
}

export const useGenerationStore = create(
  persist<GenerationStore>(
    (set, get) => ({
      seed: "-1",
      count: 1,
      width: 512,
      height: 512,
      positivePrompt: "",
      negativePrompt: "",
      sdModel: "739597470335635446",
      sdVae: "Automatic",
      sampler: "Euler a",
      steps: 25,
      cfgScale: 7,
      clipSkip: 2,
      etaNoise: 3737,
      extra_baseModel: "Pony",
      remainingCredits: 762,
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "generation-persistence",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage(state) {
        return () => state.setHasHydrated(true);
      },
    }
  )
);
