import { create } from 'zustand';
import api from '../services/api';

export interface EventPrice {
  general: number;
  vip: number;
  earlyBird?: number;
  group?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'concert' | 'comedy' | 'sports' | 'theater' | 'festival';
  price: EventPrice;
  image: string;
  capacity: number;
  soldTickets: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  organizerId: string;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<Event, 'id' | 'soldTickets'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsByOrganizer: (organizerId: string) => Event[];
}

export const useEventStore = create<EventState>()((set, get) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/events');
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch events', loading: false });
    }
  },
  addEvent: async (eventData) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post('/events', eventData);
      set((state) => ({
        events: [...state.events, response.data],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add event', loading: false });
      throw error;
    }
  },
  updateEvent: async (id, updatedEvent) => {
    try {
      set({ loading: true, error: null });
      const response = await api.put(`/events/${id}`, updatedEvent);
      set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? response.data : event
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update event', loading: false });
      throw error;
    }
  },
  deleteEvent: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.delete(`/events/${id}`);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete event', loading: false });
      throw error;
    }
  },
  getEventsByOrganizer: (organizerId) => 
    get().events.filter((event) => event.organizerId === organizerId)
}));