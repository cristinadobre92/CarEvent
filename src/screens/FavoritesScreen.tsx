import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { EventCard } from '../components/events/EventCard';
import { useFavoritesStore } from '../store/favoritesStore';
import { colors } from '../theme/colors';

export const FavoritesScreen: React.FC = () => {
  const { favorites, loadFavorites, isLoading } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Sort favorites by date: most recent (earliest date) at the top
  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }, [favorites]);

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>My Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} {favorites.length === 1 ? 'event' : 'events'} saved
        </Text>
      </View>

      {/* Favorites List */}
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Loading favorites...</Text>
          </View>
        ) : sortedFavorites.length > 0 ? (
          sortedFavorites.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyStateText}>No favorite events yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Tap the heart icon on any event to save it here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');
const isMobile = screenWidth < 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  toolbar: {
    backgroundColor: colors.background,
    paddingHorizontal: isMobile ? 16 : 24,
    paddingVertical: isMobile ? 16 : 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  toolbarTitle: {
    fontSize: isMobile ? 28 : 48,
    fontWeight: '400',
    color: colors.text,
    marginBottom: isMobile ? 8 : 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: isMobile ? 14 : 16,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 24,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
