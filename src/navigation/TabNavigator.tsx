import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { EventsScreen } from '../screens/EventsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { Header } from '../components/navigation/Header';
import { colors } from '../theme/colors';

export type TabParamList = {
  Events: undefined;
  Favorites: undefined;
};

export const TabNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Events' | 'Favorites'>('Events');

  return (
    <View style={styles.container}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={styles.content}>
        {activeTab === 'Events' ? <EventsScreen /> : <FavoritesScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
