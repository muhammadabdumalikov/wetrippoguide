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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

const SignUpScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual sign up logic
      console.log('Sign up:', {name, email, password});
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Sign up failed. Please try again.');
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
            <Text style={styles.welcomeText}>Create Account</Text>
            <Text style={styles.subtitleText}>
              Sign up to get started with your account
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              leftIcon={
                <Icon name="person" size={24} color={theme.colors.primary} />
              }
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholderTextColor={theme.colors.textSecondary}
              leftIconContainerStyle={styles.inputIcon}
            />

            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              leftIcon={
                <Icon name="email" size={24} color={theme.colors.primary} />
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
                <Icon name="lock" size={24} color={theme.colors.primary} />
              }
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholderTextColor={theme.colors.textSecondary}
              leftIconContainerStyle={styles.inputIcon}
            />

            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              leftIcon={
                <Icon name="lock" size={24} color={theme.colors.primary} />
              }
              inputContainerStyle={styles.input}
              inputStyle={styles.inputText}
              placeholderTextColor={theme.colors.textSecondary}
              leftIconContainerStyle={styles.inputIcon}
            />
          </View>

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>Sign In</Text>
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
  signInText: {
    color: theme.colors.primary,
    ...theme.typography.body,
    fontWeight: '600',
  },
});

export default SignUpScreen;
