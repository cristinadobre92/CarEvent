import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event } from '../types/event';

interface FavoritesState {
  favorites: Event[];
  isLoading: boolean;
  loadFavorites: () => Promise<void>;
  addFavorite: (event: Event) => Promise<void>;
  removeFavorite: (eventId: string) => Promise<void>;
  isFavorite: (eventId: string) => boolean;
}

const FAVORITES_STORAGE_KEY = '@favorites';

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,

  loadFavorites: async () => {
    try {
      set({ isLoading: true });
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJson) {
        const favorites = JSON.parse(favoritesJson);
        set({ favorites, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      set({ isLoading: false });
    }
  },

  addFavorite: async (event: Event) => {
    try {
      const newFavorites = [...get().favorites, event];
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  removeFavorite: async (eventId: string) => {
    try {
      const newFavorites = get().favorites.filter(fav => fav.id !== eventId);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  isFavorite: (eventId: string) => {
    return get().favorites.some(fav => fav.id === eventId);
  },
}));
