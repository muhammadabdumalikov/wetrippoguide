import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingScreen from '../components/LoadingScreen';
import MainNavigator from './MainNavigator';
import {useAuth} from '../context/AuthContext';
import {RootStackParamList} from './types';
import {navigationRef} from './navigationRef';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import SecurityScreen from '../screens/settings/SecurityScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import LanguageSettingsScreen from '../screens/settings/LanguageSettingsScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import CreateTourScreen from '../screens/main/CreateTourScreen';
import EditTourScreen from '../screens/main/EditTourScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isLoading, isAuthenticated} = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Security" component={SecurityScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen
              name="LanguageSettings"
              component={LanguageSettingsScreen}
            />
            <Stack.Screen name="CreateTour" component={CreateTourScreen} />
            <Stack.Screen name="EditTour" component={EditTourScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
