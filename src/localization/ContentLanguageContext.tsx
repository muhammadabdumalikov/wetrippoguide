import React, {createContext, useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {setString, getString, remove} from '../storage/mmkv';

type ContentLanguage = 'en' | 'uz' | 'ru';

interface ContentLanguageContextType {
  contentLanguage: ContentLanguage;
  setContentLanguage: (lang: ContentLanguage) => void;
}

const ContentLanguageContext = createContext<
  ContentLanguageContextType | undefined
>(undefined);

export const ContentLanguageProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {i18n} = useTranslation();
  const [contentLanguage, setContentLanguageState] =
    useState<ContentLanguage>('en');

  useEffect(() => {
    const initializeLanguage = () => {
      try {
        // Clear any saved content language
        remove('contentLanguage');
        // Force English as default
        setContentLanguageState('en');
        setString('contentLanguage', 'en');
      } catch (error) {
        console.error('Error initializing content language:', error);
      }
    };

    initializeLanguage();
  }, []);

  const setContentLanguage = (lang: ContentLanguage) => {
    try {
      setString('contentLanguage', lang);
      setContentLanguageState(lang);
    } catch (error) {
      console.error('Error setting content language:', error);
    }
  };

  return (
    <ContentLanguageContext.Provider
      value={{contentLanguage, setContentLanguage}}>
      {children}
    </ContentLanguageContext.Provider>
  );
};

export const useContentLanguage = () => {
  const context = useContext(ContentLanguageContext);
  if (context === undefined) {
    throw new Error(
      'useContentLanguage must be used within a ContentLanguageProvider',
    );
  }
  return context;
};
