import React from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../theme/theme';
import TourCard from './TourCard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {useQuery} from '@tanstack/react-query';
import {apiRequest} from '../../utils/api';
import LoadingScreen from '../../components/LoadingScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Tour {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalSpots: number;
  availableSpots: number;
  price: number;
  status: 'ongoing' | 'upcoming' | 'completed';
  image: string;
}

const fetchTours = async () => {
  const res = await apiRequest('/admin/tour/list', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      limit: 0,
      offset: 0,
      search: '',
      status: ['2'],
    }),
  });
  return res;
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['tours', 'ongoing'],
    queryFn: fetchTours,
  });

  let tours: Tour[] = [];
  if (data && Array.isArray(data.data)) {
    tours = data.data.map((item: any) => ({
      id: item.id,
      title: item.title?.en || item.title || '',
      destination: '',
      startDate: item.start_date,
      endDate: item.end_date,
      totalSpots: item.seats,
      availableSpots: item.available_seats ?? item.seats,
      price: Math.floor(Number(item.price)),
      status: 'ongoing',
      image:
        item.files?.find((f: any) => f.type === 'main')?.url ||
        (item.files?.[0]?.url ?? ''),
    }));
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ongoing Tours</Text>
      </View>

      {isLoading ? (
        <LoadingScreen />
      ) : isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading tours.</Text>
        </View>
      ) : (
        <FlatList
          data={tours}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContent}
          renderItem={({item}) => (
            <TourCard
              tour={item}
              onPress={() =>
                navigation.navigate('EditTour', {
                  tourId: item.id,
                  tour: item,
                })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No ongoing tours found.</Text>
            </View>
          }
        />
      )}

      <Pressable
        style={[styles.fab, {backgroundColor: theme.colors.primary}]}
        onPress={() => navigation.navigate('CreateTour')}>
        <Icon name="add" size={28} color={theme.colors.white} />
      </Pressable>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
