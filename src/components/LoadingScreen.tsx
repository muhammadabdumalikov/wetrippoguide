import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import {theme} from '../theme/theme';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({message = 'Loading...'}: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  message: {
    marginTop: theme.spacing.md,
    color: theme.colors.text,
    ...theme.typography.body,
  },
});

export default LoadingScreen;
