import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import uk from './uk.json';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  resources: {
    en: en,
    uk: uk,
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});
i18n.fallbacks = true;
i18n.defaultLocale = 'en';

export default i18n;
