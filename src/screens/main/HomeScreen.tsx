import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../../theme/theme';
import TourCard from './TourCard';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

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

const mockTours: Tour[] = [
  {
    id: '1',
    title: 'Summer Adventure in Bali',
    destination: 'Bali, Indonesia',
    startDate: '2024-06-15T14:30:00',
    endDate: '2024-06-22',
    totalSpots: 20,
    availableSpots: 5,
    price: 1299,
    status: 'ongoing',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
  },
  {
    id: '2',
    title: 'European Explorer',
    destination: 'Paris, France',
    startDate: '2024-07-01T09:00:00',
    endDate: '2024-07-10',
    totalSpots: 15,
    availableSpots: 3,
    price: 2499,
    status: 'ongoing',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ongoing Tours</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {mockTours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </ScrollView>

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
