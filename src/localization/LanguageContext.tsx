import React, {createContext, useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {getCurrentLanguage, changeLanguage} from './i18n';

type Language = 'en' | 'uz' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {i18n} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await getCurrentLanguage();
      setCurrentLanguage(savedLanguage);
      await i18n.changeLanguage(savedLanguage);
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{currentLanguage, setLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
