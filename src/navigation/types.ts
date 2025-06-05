import { NavigatorScreenParams } from '@react-navigation/native';
import { SettingsStackParamList } from './types';
import { MainStackParamList } from './types';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
  SignIn: undefined;
  SignUp: undefined;
  Notifications: undefined;
  Security: undefined;
  Language: undefined;
  LanguageSettings: undefined;
  CreateTour: undefined;
};

export type SettingsStackParamList = {
  Notifications: undefined;
  Security: undefined;
  Language: undefined;
  LanguageSettings: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
}; 