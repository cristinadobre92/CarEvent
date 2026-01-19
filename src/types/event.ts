export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  imageUrl?: string;
  url?: string; // Link to the original event page
  category: 'concert' | 'sports' | 'conference' | 'workshop' | 'other';
}
