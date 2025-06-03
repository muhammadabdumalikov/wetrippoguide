import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import LanguageSettingsScreen from '../screens/settings/LanguageSettingsScreen';
import {theme} from '../theme/theme';
import {useTranslation} from 'react-i18next';
import {SettingsStackParamList} from './types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          ...theme.typography.h3,
          color: theme.colors.text,
        },
      }}>
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: t('settings.notifications'),
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          title: t('settings.privacy'),
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          title: t('settings.language'),
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
        options={{
          title: t('settings.language'),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
