import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Switch, ListItem} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';

const NotificationItem = ({
  title,
  description,
  icon,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  icon: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => (
  <ListItem containerStyle={styles.listItem}>
    <Icon name={icon} size={24} color={theme.colors.primary} />
    <ListItem.Content>
      <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
      <ListItem.Subtitle style={styles.listItemSubtitle}>
        {description}
      </ListItem.Subtitle>
    </ListItem.Content>
    <Switch
      value={value}
      onValueChange={onValueChange}
      color={theme.colors.primary}
    />
  </ListItem>
);

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    booking: true,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          <NotificationItem
            title="Push Notifications"
            description="Receive notifications on your device"
            icon="notifications"
            value={notifications.push}
            onValueChange={() => handleToggle('push')}
          />
          <NotificationItem
            title="Email Notifications"
            description="Receive notifications via email"
            icon="email"
            value={notifications.email}
            onValueChange={() => handleToggle('email')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>
          <NotificationItem
            title="Booking Updates"
            description="Get notified about booking changes"
            icon="event"
            value={notifications.booking}
            onValueChange={() => handleToggle('booking')}
          />
          <NotificationItem
            title="Marketing"
            description="Receive marketing and promotional updates"
            icon="campaign"
            value={notifications.marketing}
            onValueChange={() => handleToggle('marketing')}
          />
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
});

export default NotificationsScreen;
