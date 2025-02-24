import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Concerts', 'Comedy', 'Sports', 'Theater', 'Festivals'];

// ✅ Mock event data (Temporary replacement for backend)
const featuredEvents = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'The biggest music festival of the year',
    date: '2024-07-15',
    time: '14:00',
    venue: 'Central Park, NY',
    category: 'Festivals',
    price: { general: 99, vip: 299, earlyBird: 79 },
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    organizer: 'Festival Productions Inc.',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Stand-up Comedy Night',
    description: 'A night of laughter with top comedians',
    date: '2024-03-25',
    time: '20:00',
    venue: 'Comedy Club, LA',
    category: 'Comedy',
    price: { general: 49, vip: 99 },
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca',
    organizer: 'Laugh Factory',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'NBA Finals 2024',
    description: 'Experience the ultimate basketball showdown',
    date: '2024-06-10',
    time: '19:30',
    venue: 'Madison Square Garden, NY',
    category: 'Sports',
    price: { general: 199, vip: 499, group: 179 },
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
    organizer: 'NBA Events',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Broadway Musical: The Phantom',
    description: 'A classic musical returns to Broadway',
    date: '2024-04-15',
    time: '19:00',
    venue: 'Broadway Theater, NY',
    category: 'Theater',
    price: { general: 129, vip: 299, earlyBird: 99 },
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
    organizer: 'Broadway Productions',
    status: 'upcoming',
  },
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ Correct category filtering
  const filteredEvents = selectedCategory === 'All'
    ? featuredEvents
    : featuredEvents.filter(event => event.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-50 rounded-lg p-2">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search events, venues, or artists..."
                className="w-full px-4 py-2 bg-transparent text-gray-900 focus:outline-none"
              />
              <button className="flex items-center space-x-1 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center space-x-4 mb-12 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg col-span-3">
              No events found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
