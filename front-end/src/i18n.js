import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./assets/translations/en.json";
import es from "./assets/translations/es.json";
import fr from "./assets/translations/fr.json";
import de from "./assets/translations/de.json";
import zhCN from "./assets/translations/zh-CN.json";
import zhTW from "./assets/translations/zh-TW.json";
import ja from "./assets/translations/ja.json";
import ko from "./assets/translations/ko.json";
import ar from "./assets/translations/ar.json";
import pt from "./assets/translations/pt.json";
import ru from "./assets/translations/ru.json";
import hi from "./assets/translations/hi.json";
import he from "./assets/translations/he.json";

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    "zh-CN": { translation: zhCN },
    "zh-TW": { translation: zhTW },
    ja: { translation: ja },
    ko: { translation: ko },
    ar: { translation: ar },
    pt: { translation: pt },
    ru: { translation: ru },
    hi: { translation: hi },
    he: { translation: he },
  },
});
