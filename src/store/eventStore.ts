// import { create } from 'zustand';
// import api from '../services/api';

// export interface EventPrice {
//   general: number;
//   vip: number;
//   earlyBird?: number;
//   group?: number;
// }

// export interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   venue: string;
//   category: 'concert' | 'comedy' | 'sports' | 'theater' | 'festival';
//   price: EventPrice;
//   image: string;
//   capacity: number;
//   soldTickets: number;
//   status: 'upcoming' | 'ongoing' | 'completed';
//   organizerId: string;
// }

// interface EventState {
//   events: Event[];
//   loading: boolean;
//   error: string | null;
//   fetchEvents: () => Promise<void>;
//   addEvent: (event: Omit<Event, 'id' | 'soldTickets'>) => Promise<void>;
//   updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
//   deleteEvent: (id: string) => Promise<void>;
//   getEventsByOrganizer: (organizerId: string) => Event[];
// }

// export const useEventStore = create<EventState>()((set, get) => ({
//   events: [],
//   loading: false,
//   error: null,
//   fetchEvents: async () => {
//     try {
//       set({ loading: true, error: null });
//       const response = await api.get('/events');
//       set({ events: response.data, loading: false });
//     } catch (error) {
//       set({ error: 'Failed to fetch events', loading: false });
//     }
//   },
//   addEvent: async (eventData) => {
//     try {
//       set({ loading: true, error: null });
//       const response = await api.post('/events', eventData);
//       set((state) => ({
//         events: [...state.events, response.data],
//         loading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to add event', loading: false });
//       throw error;
//     }
//   },
//   updateEvent: async (id, updatedEvent) => {
//     try {
//       set({ loading: true, error: null });
//       const response = await api.put(`/events/${id}`, updatedEvent);
//       set((state) => ({
//         events: state.events.map((event) =>
//           event.id === id ? response.data : event
//         ),
//         loading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to update event', loading: false });
//       throw error;
//     }
//   },
//   deleteEvent: async (id) => {
//     try {
//       set({ loading: true, error: null });
//       await api.delete(`/events/${id}`);
//       set((state) => ({
//         events: state.events.filter((event) => event.id !== id),
//         loading: false
//       }));
//     } catch (error) {
//       set({ error: 'Failed to delete event', loading: false });
//       throw error;
//     }
//   },
//   getEventsByOrganizer: (organizerId) => 
//     get().events.filter((event) => event.organizerId === organizerId)
// }));

import { create } from 'zustand';

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
  category: 'Festivals' | 'Comedy' | 'Sports' | 'Theater';
  price: EventPrice;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  organizer: string;
}

// ✅ Updated event data as per your request
const featuredEvents: Event[] = [
  {
    id: '1',
    title: 'Cold Play',
    description: 'The biggest music festival of the year',
    date: '2025-07-15',
    time: '14:00',
    venue: 'Delhi, India',
    category: 'Festivals',
    price: { general: 1, vip: 2, earlyBird: 1 },
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    organizer: 'Festival Productions Inc.',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Stand-up Comedy Night',
    description: 'A night of laughter with top comedians',
    date: '2025-03-25',
    time: '20:00',
    venue: 'Chitkara University, Punjab',
    category: 'Comedy',
    price: { general: 0, vip: 2 },
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
    organizer: 'Laugh Factory',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'ICC MEN CHAMPIONSHIP',
    description: 'Experience the ultimate championship showdown',
    date: 'Currently Live',
    time: '19:30',
    venue: 'Pakistan',
    category: 'Sports',
    price: { general: 1, vip: 2, group: 1 },
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
    organizer: 'NBA Events',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Arjit Singh',
    description: 'A classic musical returns to Broadway',
    date: '2025-04-15',
    time: '19:00',
    venue: 'Chandigarh',
    category: 'Theater',
    price: { general: 1, vip: 2, earlyBird: 1 },
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
    organizer: 'Broadway Productions',
    status: 'upcoming',
  },
];

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
}

export const useEventStore = create<EventState>()((set) => ({
  events: featuredEvents, // ✅ Using updated mock data
  loading: false,
  error: null,

  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });

      // ✅ Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ events: featuredEvents, loading: false });

    } catch (error) {
      set({ error: 'Failed to fetch events', loading: false });
    }
  },
}));
