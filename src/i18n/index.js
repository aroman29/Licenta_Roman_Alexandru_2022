import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';

export const translate = (key, values = {}) => i18n.t(key, values);

const init = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
      },
      lng: 'en', // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },
    });
};

export default init;
