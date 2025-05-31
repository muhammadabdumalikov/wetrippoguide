import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type SettingsStackParamList = {
  Notifications: undefined;
  Security: undefined;
  Language: undefined;
}; 