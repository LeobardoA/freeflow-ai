import { create } from "zustand";

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
}

export const useGenerationStore = create<GenerationStore>()((set) => ({
  seed: "-1",
  count: 1,
  width: 512,
  height: 512,
  positivePrompt: "",
  negativePrompt: "",
  sdModel: "",
  sdVae: "",
  sampler: "",
  steps: 25,
  cfgScale: 7,
  clipSkip: 2,
  etaNoise: 3737,
  extra_baseModel: "SD 1.5",
}));
