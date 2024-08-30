import AsyncStorage from "@react-native-async-storage/async-storage";

export class GenerationPersistence {
  static seed: string;
  static count: number;
  static width: number;
  static height: number;
  static positivePrompt: string;
  static negativePrompt: string;
  static sdModel: string;
  static sdVae: string;
  static sampler: string;
  static steps: number;
  static cfgScale: number;
  static clipSkip: number;
  static etaNoise: number;

  static async loadFromStorage() {
    console.log("Loading prompts from persistence file...");
    try {
      const data = await AsyncStorage.getItem("generationPersistence");
      if (data !== null) {
        const parsedData = JSON.parse(data);
        Object.assign(GenerationPersistence, parsedData);
      }
    } catch (error) {
      console.error("Failed to load GenerationPersistence:", error);
    }
  }

  static async saveToStorage() {
    try {
      const data = JSON.stringify({
        seed: GenerationPersistence.seed,
        count: GenerationPersistence.count,
        width: GenerationPersistence.width,
        height: GenerationPersistence.height,
        positivePrompt: GenerationPersistence.positivePrompt,
        negativePrompt: GenerationPersistence.negativePrompt,
        sdModel: GenerationPersistence.sdModel,
        sdVae: GenerationPersistence.sdVae,
        sampler: GenerationPersistence.sampler,
        steps: GenerationPersistence.steps,
        cfgScale: GenerationPersistence.cfgScale,
        clipSkip: GenerationPersistence.clipSkip,
        etaNoise: GenerationPersistence.etaNoise,
      });
      await AsyncStorage.setItem("generationPersistence", data);
    } catch (error) {
      console.error("Failed to save GenerationPersistence:", error);
    }
  }
}
