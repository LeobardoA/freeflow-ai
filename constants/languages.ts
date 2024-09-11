import * as Localization from "expo-localization";

interface LocalizationStrings {
  positivePrompt: string;
  negativePrompt: string;
  models: string;
  loadingResource: string;
  select: string;
  settings: string;
  custom: string;
  width: string;
  height: string;
  steps: string;
  samplerMethod: string;
  cfgScale: string;
  seed: string;
  generate: string;
  add: string;
}

const languages: Record<string, LocalizationStrings> = {
  en: require("@/constants/languages/en.json"),
  es: require("@/constants/languages/es.json"),
};

const currentLocale = Localization.getLocales()[0].languageCode as string;
console.log("Lenguaje detectado: " + currentLocale);
const localization = languages[currentLocale] || languages["en"];

export default localization;
