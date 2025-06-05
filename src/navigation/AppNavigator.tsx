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

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {isAuthenticated, checkAuthStatus} = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const init = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    init();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="CreateTour" component={CreateTourScreen} />
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
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
