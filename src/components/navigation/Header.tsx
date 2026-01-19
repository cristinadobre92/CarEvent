import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../theme/colors';

interface HeaderProps {
  activeTab: 'Events' | 'Favorites';
  onTabChange: (tab: 'Events' | 'Favorites') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Brand */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>CarEvent</Text>
        </View>

        {/* Navigation Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onTabChange('Events')}
          >
            <Text style={[
              styles.menuText,
              activeTab === 'Events' && styles.menuTextActive
            ]}>
              Events
            </Text>
            {activeTab === 'Events' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onTabChange('Favorites')}
          >
            <Text style={[
              styles.menuText,
              activeTab === 'Favorites' && styles.menuTextActive
            ]}>
              Favorites
            </Text>
            {activeTab === 'Favorites' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  menuItem: {
    position: 'relative',
    paddingVertical: 4,
  },
  menuText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  menuTextActive: {
    color: colors.text,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.text,
  },
});
