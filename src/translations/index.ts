import { en } from "./en";
import { ptBR } from "./pt-BR";

export type Language = "en" | "pt-BR";

export const translations = {
  en,
  "pt-BR": ptBR,
};

export const languageNames = {
  en: "English",
  "pt-BR": "Português",
};

export const languageFlags = {
  en: "🇺🇸",
  "pt-BR": "🇧🇷",
};
