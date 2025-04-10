import { createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { translations, Language } from "../translations";

type LanguageContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => { },
    t: () => "",
});

export const LanguageProvider = ({ children }: { children: preact.ComponentChildren }) => {
    const selectedLanguage = localStorage.getItem("language") as Language;
    const [language, setLanguage] = useState<Language>(selectedLanguage || "en");

    const t = (key: string): string => {
        const keys = key.split(".");
        let result = translations[language];
        for (const k of keys) {
            if (typeof result !== "object" || result === null || !(k in result)) return key;
            result = (result as any)[k];
        }
        return typeof result === "string" ? result : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
