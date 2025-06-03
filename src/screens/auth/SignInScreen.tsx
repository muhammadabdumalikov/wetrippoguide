import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../../theme/theme';
import {authApi} from '../../services/api';
import {setItem, StorageKeys} from '../../utils/storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {useAuth} from '../../context/AuthContext';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const {checkAuthStatus} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email && !password) {
      Alert.alert(
        'Missing Information',
        'Please enter both login and password.',
        [{text: 'OK'}],
        {cancelable: true},
      );
      return false;
    }
    if (!email) {
      Alert.alert('Missing Login', 'Please enter your login.', [{text: 'OK'}], {
        cancelable: true,
      });
      return false;
    }
    if (!password) {
      Alert.alert(
        'Missing Password',
        'Please enter your password.',
        [{text: 'OK'}],
        {cancelable: true},
      );
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      if (response.accessToken) {
        await setItem(StorageKeys.ACCESS_TOKEN, response.accessToken);
        await setItem(StorageKeys.REFRESH_TOKEN, response.refreshToken);
        await checkAuthStatus(); // This will trigger the AppNavigator to show Main screen
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (error: any) {
      console.log('error', error);
      const errorMessage =
        error?.response?.data?.message ||
        'Unable to sign in. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.subtitleText}>
              Sign in to continue to your account
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Login"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="default"
              leftIcon={
                <AntDesign name="user" size={24} color={theme.colors.primary} />
              }
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholderTextColor={theme.colors.textSecondary}
              leftIconContainerStyle={styles.inputIcon}
            />

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon={
                <AntDesign name="lock" size={24} color={theme.colors.primary} />
              }
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholderTextColor={theme.colors.textSecondary}
              leftIconContainerStyle={styles.inputIcon}
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: theme.spacing.xl,
  },
  welcomeText: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitleText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 50,
    marginBottom: theme.spacing.md,
  },
  inputText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    ...theme.typography.caption,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 50,
    ...theme.shadows.small,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: theme.spacing.lg,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
  },
  signUpText: {
    color: theme.colors.primary,
    ...theme.typography.body,
    fontWeight: '600',
  },
});

export default SignInScreen;
