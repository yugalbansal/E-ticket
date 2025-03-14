// import { create } from 'zustand';
// import { auth } from '../services/api';

// interface Ticket {
//   id: string;
//   eventId: string;
//   type: string;
//   quantity: number;
//   totalPrice: number;
//   purchaseDate: string;
//   event: {
//     title: string;
//     date: string;
//     time: string;
//     venue: string;
//     image: string;
//   };
// }

// interface User {
//   id: string;
//   address?: string;
//   email?: string;
//   name: string;
//   role: 'user' | 'admin' | 'organizer';
//   tickets: Ticket[];
// }

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (userData: User) => void;
//   logout: () => void;
//   addTicket: (ticket: Ticket) => Promise<void>;
// }

// // Mock passwords - in a real app, these would be properly hashed and stored securely
// const ADMIN_PASSWORD = 'admin123';
// const ORGANIZER_PASSWORD = 'organizer123';

// export const validateAdminPassword = (password: string) => password === ADMIN_PASSWORD;
// export const validateOrganizerPassword = (password: string) => password === ORGANIZER_PASSWORD;

// export const useAuthStore = create<AuthState>()((set) => ({
//   user: null,
//   isAuthenticated: false,
//   login: async (userData) => {
//     // Store the token in localStorage
//     if (userData.id) {
//       localStorage.setItem('token', userData.id);
//     }
//     set({ user: userData, isAuthenticated: true });
//   },
//   logout: () => {
//     localStorage.removeItem('token');
//     set({ user: null, isAuthenticated: false });
//   },
//   addTicket: async (ticket) => {
//     try {
//       // Save ticket to backend
//       await auth.addTicket(ticket);
      
//       // Update local state
//       set((state) => ({
//         user: state.user
//           ? {
//               ...state.user,
//               tickets: [...(state.user.tickets || []), ticket],
//             }
//           : null,
//       }));
//     } catch (error) {
//       console.error('Failed to add ticket:', error);
//       throw error;
//     }
//   },
// }));

import { create } from 'zustand';
import { auth } from '../services/api';

interface Ticket {
  id: string;
  eventId: string;
  type: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  event: {
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
  };
}

interface User {
  id: string;
  address?: string;
  email?: string;
  name: string;
  role: 'user' | 'admin' | 'organizer';
  tickets: Ticket[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  addTicket: (ticket: Ticket) => Promise<void>;
}

// Mock passwords - in a real app, these would be properly hashed and stored securely
const ADMIN_PASSWORD = 'admin123';
const ORGANIZER_PASSWORD = 'organizer123';

export const validateAdminPassword = (password: string) => password === ADMIN_PASSWORD;
export const validateOrganizerPassword = (password: string) => password === ORGANIZER_PASSWORD;

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (userData) => {
    // Store the token in localStorage
    if (userData.id) {
      localStorage.setItem('token', userData.id);
    }
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  addTicket: async (ticket) => {
    try {
      console.log('Saving ticket:', ticket); // ✅ Debug log
      
      // ✅ Try saving to the backend
      try {
        await auth.addTicket(ticket);
      } catch (error) {
        console.warn('Backend error, saving locally instead.');
      }

      // ✅ Update local state (ensures tickets show up)
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              tickets: [...(state.user.tickets || []), ticket],
            }
          : null,
      }));

      console.log('Updated user tickets:', get().user?.tickets); // ✅ Debug log

    } catch (error) {
      console.error('Failed to add ticket:', error);
      throw error;
    }
  },
}));
