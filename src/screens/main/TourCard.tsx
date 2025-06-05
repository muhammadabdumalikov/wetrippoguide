import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dayjs from 'dayjs';

const mainColor = '#febd2d';
const navyBlack = '#050544';
const ratingGreen = '#4CAF50';

export interface Tour {
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

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD.MM.YY HH:mm');
};

interface TourCardProps {
  tour: Tour;
  onPress?: () => void;
}

const TourCard: React.FC<TourCardProps> = ({tour, onPress}) => {
  const rating = 4.5; // Example static rating
  return (
    <>
      <Pressable style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image source={{uri: tour.image}} style={styles.cardImage} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{tour.title}</Text>
          <View style={styles.infoBadgesRow}>
            <View
              style={[styles.infoBadge, {backgroundColor: mainColor + '22'}]}>
              <AntDesign
                name="calendar"
                size={14}
                color={mainColor}
                style={{marginRight: 6}}
              />
              <Text style={[styles.infoBadgeText, {color: mainColor}]}>
                {formatDate(tour.startDate)}
              </Text>
            </View>
            <View
              style={[styles.infoBadge, {backgroundColor: mainColor + '22'}]}>
              <FontAwesome
                name="users"
                size={14}
                color={mainColor}
                style={{marginRight: 6}}
              />
              <Text style={[styles.infoBadgeText, {color: mainColor}]}>
                {tour.availableSpots} spots left
              </Text>
            </View>
          </View>
          <View style={styles.badgeRow}>
            <View style={[styles.ratingBadge, {backgroundColor: ratingGreen}]}>
              <AntDesign name="star" size={14} color="#fff" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <Text style={[styles.priceText, {color: navyBlack}]}>
              ${tour.price}
            </Text>
            <Text style={styles.perPerson}>/person</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 18,
    backgroundColor: '#fff',
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
    marginVertical: 16,
    width: '100%',
  },
});

export default TourCard;
