import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Event } from '../../types/event';
import { colors } from '../../theme/colors';
import { useFavoritesStore } from '../../store/favoritesStore';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(event.id);
  const [isTitlePressed, setIsTitlePressed] = React.useState(false);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  const handleTitlePress = async () => {
    if (event.url) {
      try {
        const supported = await Linking.canOpenURL(event.url);
        if (supported) {
          await Linking.openURL(event.url);
        } else {
          Alert.alert('Error', 'Cannot open this URL');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to open the event link');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: Event['category']) => {
    const categoryColors = {
      concert: '#9C27B0',
      sports: '#FF5722',
      conference: '#2196F3',
      workshop: '#4CAF50',
      other: '#9E9E9E',
    };
    return categoryColors[category];
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={handleTitlePress}
            onPressIn={() => setIsTitlePressed(true)}
            onPressOut={() => setIsTitlePressed(false)}
            disabled={!event.url}
          >
            <Text style={[
              styles.title,
              event.url && styles.titleClickable,
              isTitlePressed && styles.titlePressed
            ]}>
              {event.title}
            </Text>
          </TouchableOpacity>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>📅 {formatDate(event.date)}</Text>
        <Text style={styles.infoText}>📍 {event.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 24,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  titleClickable: {
    textDecorationLine: 'underline',
  },
  titlePressed: {
    color: '#4A2B7B',
    fontStyle: 'italic',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: colors.background,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  infoContainer: {
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});
