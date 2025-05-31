import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, Card, Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../theme/theme';
import {LineChart, BarChart} from 'react-native-chart-kit';

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => (
  <Card containerStyle={styles.statCard}>
    <View style={styles.statContent}>
      <View style={styles.statIconContainer}>
        <Icon name={icon} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.statTextContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  </Card>
);

const TimeFilter = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (filter: string) => void;
}) => (
  <View style={styles.filterContainer}>
    {['Today', 'Week', 'Month', 'Year'].map(filter => (
      <Button
        key={filter}
        title={filter}
        type={selected === filter ? 'solid' : 'outline'}
        buttonStyle={[
          styles.filterButton,
          selected === filter && styles.filterButtonActive,
        ]}
        titleStyle={[
          styles.filterButtonText,
          selected === filter && styles.filterButtonTextActive,
        ]}
        onPress={() => onSelect(filter)}
      />
    ))}
  </View>
);

const HomeScreen = () => {
  const [timeFilter, setTimeFilter] = useState('Week');
  const screenWidth = Dimensions.get('window').width;

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [2000, 4500, 2800, 8000, 9900, 4300, 5000],
      },
    ],
  };

  const bookingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => theme.colors.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <TimeFilter selected={timeFilter} onSelect={setTimeFilter} />

        <View style={styles.statsContainer}>
          <StatCard title="Total Users" value="1,234" icon="people" />
          <StatCard title="Active Tours" value="56" icon="map" />
          <StatCard title="Revenue" value="$12,345" icon="attach-money" />
          <StatCard title="Bookings" value="89" icon="event" />
        </View>

        <Card containerStyle={styles.chartCard}>
          <Card.Title style={styles.cardTitle}>Revenue Overview</Card.Title>
          <LineChart
            data={revenueData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card>

        <Card containerStyle={styles.chartCard}>
          <Card.Title style={styles.cardTitle}>Bookings Overview</Card.Title>
          <BarChart
            data={bookingsData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
          />
        </Card>

        <Card containerStyle={styles.recentActivityCard}>
          <Card.Title style={styles.cardTitle}>Recent Activity</Card.Title>
          <View style={styles.activityList}>
            {[1, 2, 3].map(item => (
              <View key={item} style={styles.activityItem}>
                <Icon
                  name="notifications"
                  size={20}
                  color={theme.colors.primary}
                />
                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityTitle}>New booking received</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
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
    padding: theme.spacing.lg,
  },
  welcomeText: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  dateText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filterButton: {
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  filterButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: theme.colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.sm,
  },
  statCard: {
    width: '45%',
    margin: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  statTitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  chartCard: {
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  chart: {
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  recentActivityCard: {
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  activityList: {
    marginTop: theme.spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  activityTextContainer: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  activityTitle: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  activityTime: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
});

export default HomeScreen;
