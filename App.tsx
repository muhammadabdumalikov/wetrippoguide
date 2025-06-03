/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LanguageProvider} from './src/localization/LanguageContext';
import {ContentLanguageProvider} from './src/localization/ContentLanguageContext';
import {AuthProvider} from './src/context/AuthContext';
import './src/localization/i18n';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <ContentLanguageProvider>
            <AppNavigator />
          </ContentLanguageProvider>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
