import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, Avatar, ListItem} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {useAuth} from '../../context/AuthContext';
import Switch from '../../components/Switch';
import {useState} from 'react';

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {logout} = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // The AppNavigator will automatically show SignIn screen
            // when isAuthenticated becomes false
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar
            size={100}
            rounded
            icon={{name: 'person', type: 'material'}}
            containerStyle={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.role}>Administrator</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <ListItem containerStyle={styles.listItem} key="email">
            <Icon name="email" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Email
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                john.doe@example.com
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          <ListItem containerStyle={styles.listItem} key="phone">
            <Icon name="phone" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Phone
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                +1 234 567 890
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              activeColor={theme.colors.secondary}
              inActiveColor={theme.colors.lightGray}
              handleOnChange={() => setNotificationsEnabled(prev => !prev)}
              isActive={notificationsEnabled}
            />
          </View>

          <ListItem
            containerStyle={styles.listItem}
            onPress={() => navigation.navigate('Security')}
            key="security">
            <Icon name="security" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Security
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>

          <ListItem
            containerStyle={styles.listItem}
            onPress={() => navigation.navigate('Language')}
            key="language">
            <Icon name="language" size={24} color={theme.colors.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>
                Language
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={theme.colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  role: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.errorLight,
    borderRadius: theme.borderRadius.md,
  },
  logoutText: {
    ...theme.typography.body,
    color: theme.colors.error,
    marginLeft: theme.spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  settingLabel: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
});

export default ProfileScreen;
