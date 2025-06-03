import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setString, getString } from '../storage/mmkv';
import en from './translations/en.json';
import uz from './translations/uz.json';
import ru from './translations/ru.json';

const resources = {
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
};

// Initialize i18n with default language
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

// Function to change language
export const changeLanguage = async (language: 'en' | 'uz' | 'ru') => {
  try {
    setString('appLanguage', language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Function to get current language
export const getCurrentLanguage = async (): Promise<'en' | 'uz' | 'ru'> => {
  try {
    const language = getString('appLanguage');
    return (language as 'en' | 'uz' | 'ru') || 'en';
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en';
  }
};

export default i18n;
