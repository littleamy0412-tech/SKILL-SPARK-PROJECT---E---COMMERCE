import en from "./assets/data/translations/en.json";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: { translation: en },
    },
});

export default i18next;
