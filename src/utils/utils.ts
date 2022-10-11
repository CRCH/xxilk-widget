import { Language } from "../global.types";

export const useTranslation = (lang: Language) => 
  (key: string) => {
    console.log(key, lang)
    // TODO: return translation util based on lang setting
  }