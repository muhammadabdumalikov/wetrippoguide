import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Text, Switch, ListItem, Button, Input} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

const SecurityScreen = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    // TODO: Implement password change logic
    Alert.alert('Success', 'Password changed successfully');
    setShowChangePassword(false);
    setPasswords({current: '', new: '', confirm: ''});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authentication</Text>
          <ListItem containerStyle={styles.listItem}>
            <Icon name="fingerprint" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Biometric Authentication
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                Use fingerprint or face ID to login
              </ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              color={theme.colors.primary}
            />
          </ListItem>

          <ListItem
            containerStyle={styles.listItem}
            onPress={() => setShowChangePassword(true)}>
            <Icon name="lock" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Change Password
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                Update your account password
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>

        {showChangePassword && (
          <View style={styles.passwordSection}>
            <Input
              placeholder="Current Password"
              secureTextEntry
              value={passwords.current}
              onChangeText={text =>
                setPasswords(prev => ({...prev, current: text}))
              }
              leftIcon={
                <Icon name="lock" size={24} color={theme.colors.primary} />
              }
            />
            <Input
              placeholder="New Password"
              secureTextEntry
              value={passwords.new}
              onChangeText={text =>
                setPasswords(prev => ({...prev, new: text}))
              }
              leftIcon={
                <Icon name="lock" size={24} color={theme.colors.primary} />
              }
            />
            <Input
              placeholder="Confirm New Password"
              secureTextEntry
              value={passwords.confirm}
              onChangeText={text =>
                setPasswords(prev => ({...prev, confirm: text}))
              }
              leftIcon={
                <Icon name="lock" size={24} color={theme.colors.primary} />
              }
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                type="outline"
                onPress={() => {
                  setShowChangePassword(false);
                  setPasswords({current: '', new: '', confirm: ''});
                }}
                buttonStyle={styles.button}
              />
              <Button
                title="Change Password"
                onPress={handlePasswordChange}
                buttonStyle={[styles.button, styles.primaryButton]}
              />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <ListItem containerStyle={styles.listItem}>
            <Icon name="visibility" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Activity Status
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                Show when you're active
              </ListItem.Subtitle>
            </ListItem.Content>
            <Switch value={true} color={theme.colors.primary} />
          </ListItem>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  listItem: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.sm,
  },
  listItemTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  listItemSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  passwordSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.cardBackground,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default SecurityScreen;
