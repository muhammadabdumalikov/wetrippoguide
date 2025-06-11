import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, Pressable} from 'react-native';
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

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - theme.spacing.lg * 2;

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
  console.log(tours);
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ongoing Tours</Text>
      </View>

      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      ) : isError ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Error loading tours.</Text>
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
          ListEmptyComponent={<Text>No ongoing tours found.</Text>}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.3,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 18,
    backgroundColor: '#fff',
  },
  tourInfo: {
    marginBottom: 16,
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: '#8A8A8A',
    fontSize: 14,
    fontWeight: '400',
  },
  title: {
    color: '#222',
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'left',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    gap: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 15,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  perPerson: {
    color: '#8A8A8A',
    fontSize: 14,
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: theme.spacing.md,
    width: CARD_WIDTH,
  },
  infoBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  infoBadgeText: {
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default HomeScreen;
