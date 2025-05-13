import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

const defaultLng = "es";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    lng: defaultLng, // if you're using a language detector, do not define the lng option
    fallbackLng: defaultLng,
    returnNull: false,

    //debug: true, // set to `true` to debug locally
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: `https://dev-hocolconnect.hocol.com.co/liquidaciones-mf/locales/{{lng}}/translation.json`,
      crossDomain: true,
    },
  });

export default i18n;
