import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locals/en/translation.json';
import esTranslation from './locals/es/translation.json';
import hiTranslation from './locals/hi/translation.json';


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation not found
    interpolation: {
      escapeValue: false, // react already safeguards from XSS
    },
  });

export default i18n;