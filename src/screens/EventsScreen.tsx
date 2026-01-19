import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { EventCard } from '../components/events/EventCard';
import { scrapedEvents } from '../utils/scrapedData';
import { colors } from '../theme/colors';

export const EventsScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const uniqueLocations = useMemo(() => {
    const locations = Array.from(new Set(scrapedEvents.map(event => event.location)));
    return locations.sort();
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = Array.from(new Set(scrapedEvents.map(event => event.category)));
    return categories.sort();
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = scrapedEvents;

    if (selectedDate) {
      filtered = filtered.filter(event => event.date === selectedDate);
    }

    if (selectedLocation) {
      filtered = filtered.filter(event => event.location === selectedLocation);
    }

    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Sort by date: most recent (earliest date) at the top
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }, [selectedDate, selectedLocation, selectedCategory]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryPicker(false);
  };

  const clearFilter = () => {
    setSelectedDate(null);
    setSelectedLocation(null);
    setSelectedCategory(null);
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  const clearLocationFilter = () => {
    setSelectedLocation(null);
  };

  const clearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Events</Text>
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.calendarButtonText}>📅 Filter by Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setShowLocationPicker(true)}
          >
            <Text style={styles.locationButtonText}>📍 Filter by Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => setShowCategoryPicker(true)}
          >
            <Text style={styles.categoryButtonText}>🏷️ Filter by Type</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Filters Display */}
      {(selectedDate || selectedLocation || selectedCategory) && (
        <View style={styles.filterBanner}>
          <View style={styles.filterContainer}>
            {selectedDate && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  📅 {formatDisplayDate(selectedDate)}
                </Text>
                <TouchableOpacity onPress={clearDateFilter}>
                  <Text style={styles.filterChipClose}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedLocation && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  📍 {selectedLocation}
                </Text>
                <TouchableOpacity onPress={clearLocationFilter}>
                  <Text style={styles.filterChipClose}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedCategory && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  🏷️ {getCategoryLabel(selectedCategory)}
                </Text>
                <TouchableOpacity onPress={clearCategoryFilter}>
                  <Text style={styles.filterChipClose}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={clearFilter}>
            <Text style={styles.clearAllButton}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Events List */}
      <ScrollView style={styles.scrollView}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No events found with the selected filters
            </Text>
            <TouchableOpacity onPress={clearFilter} style={styles.showAllButton}>
              <Text style={styles.showAllButtonText}>Show All Events</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              markedDates={
                selectedDate
                  ? {
                      [selectedDate]: {
                        selected: true,
                        selectedColor: colors.text,
                      },
                    }
                  : {}
              }
              theme={{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.text,
                selectedDayTextColor: colors.background,
                todayTextColor: colors.accent,
                dayTextColor: colors.text,
                textDisabledColor: colors.textMuted,
                arrowColor: colors.text,
                monthTextColor: colors.text,
                indicatorColor: colors.text,
                textDayFontWeight: '400',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '500',
                textDayFontSize: 15,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.locationList}>
              {uniqueLocations.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[
                    styles.locationItem,
                    selectedLocation === location && styles.locationItemSelected,
                  ]}
                  onPress={() => handleLocationSelect(location)}
                >
                  <Text
                    style={[
                      styles.locationItemText,
                      selectedLocation === location && styles.locationItemTextSelected,
                    ]}
                  >
                    {location}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Category Picker Modal */}
      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Event Type</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.categoryList}>
              {uniqueCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category && styles.categoryItemSelected,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text
                    style={[
                      styles.categoryItemText,
                      selectedCategory === category && styles.categoryItemTextSelected,
                    ]}
                  >
                    {getCategoryLabel(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    marginBottom: isMobile ? 12 : 24,
    letterSpacing: -1,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    gap: isMobile ? 8 : 12,
    flexWrap: 'wrap',
  },
  calendarButton: {
    backgroundColor: colors.text,
    paddingVertical: isMobile ? 8 : 12,
    paddingHorizontal: isMobile ? 16 : 24,
    borderRadius: isMobile ? 20 : 24,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: colors.background,
    fontSize: isMobile ? 13 : 15,
    fontWeight: '600',
  },
  locationButton: {
    backgroundColor: colors.text,
    paddingVertical: isMobile ? 8 : 12,
    paddingHorizontal: isMobile ? 16 : 24,
    borderRadius: isMobile ? 20 : 24,
    alignItems: 'center',
  },
  locationButtonText: {
    color: colors.background,
    fontSize: isMobile ? 13 : 15,
    fontWeight: '600',
  },
  categoryButton: {
    backgroundColor: colors.text,
    paddingVertical: isMobile ? 8 : 12,
    paddingHorizontal: isMobile ? 16 : 24,
    borderRadius: isMobile ? 20 : 24,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: colors.background,
    fontSize: isMobile ? 13 : 15,
    fontWeight: '600',
  },
  filterBanner: {
    backgroundColor: colors.surface,
    paddingHorizontal: isMobile ? 12 : 24,
    paddingVertical: isMobile ? 10 : 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: isMobile ? 6 : 8,
    flexWrap: 'wrap',
    flex: 1,
    marginRight: isMobile ? 8 : 12,
  },
  filterChip: {
    backgroundColor: colors.background,
    paddingHorizontal: isMobile ? 10 : 12,
    paddingVertical: isMobile ? 6 : 8,
    borderRadius: isMobile ? 14 : 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: isMobile ? 6 : 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipText: {
    color: colors.text,
    fontSize: isMobile ? 12 : 13,
    fontWeight: '500',
  },
  filterChipClose: {
    color: colors.textSecondary,
    fontSize: isMobile ? 13 : 14,
    fontWeight: '600',
  },
  clearAllButton: {
    color: colors.text,
    fontSize: isMobile ? 13 : 14,
    fontWeight: '600',
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
  emptyStateText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  showAllButton: {
    backgroundColor: colors.text,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  showAllButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  modalClose: {
    fontSize: 28,
    color: colors.textSecondary,
    fontWeight: '300',
  },
  locationList: {
    maxHeight: 400,
  },
  locationItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  locationItemSelected: {
    backgroundColor: colors.background,
  },
  locationItemText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
  },
  locationItemTextSelected: {
    fontWeight: '600',
  },
  categoryList: {
    maxHeight: 400,
  },
  categoryItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryItemSelected: {
    backgroundColor: colors.background,
  },
  categoryItemText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '400',
  },
  categoryItemTextSelected: {
    fontWeight: '600',
  },
});
