import React, { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useEventStore } from '../store/eventStore';

const CATEGORIES = ['All', 'Concerts', 'Comedy', 'Sports', 'Theater', 'Festivals'];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
 // Mock event data - replace with actual API call
 const featuredEvents = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'The biggest music festival of the year',
    date: '2024-07-15',
    time: '14:00',
    venue: 'Central Park, NY',
    category: 'festival',
    price: {
      general: 99,
      vip: 299,
      earlyBird: 79,
    },
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
    category: 'comedy',
    price: {
      general: 49,
      vip: 99,
    },
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
    category: 'sports',
    price: {
      general: 199,
      vip: 499,
      group: 179,
    },
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
    category: 'theater',
    price: {
      general: 129,
      vip: 299,
      earlyBird: 99,
    },
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf',
    organizer: 'Broadway Productions',
    status: 'upcoming',
  },
];


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { events } = useEventStore();
  const navigate = useNavigate();

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => 
        event.category === selectedCategory.toLowerCase().slice(0, -1)
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Discover Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-indigo-100">
              Book tickets for the most exciting events near you
            </p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-lg p-2 border border-white/20">
                <Search className="w-5 h-5 text-white/70 ml-2" />
                <input
                  type="text"
                  placeholder="Search events, venues, or artists..."
                  className="w-full px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none"
                />
                <button className="flex items-center space-x-1 bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </motion.div>

            <motion.button
              className="mt-8 inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
              onClick={() => navigate('/events')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse All Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="flex items-center justify-center space-x-4 mb-12 overflow-x-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow'
              }`}
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={fadeIn}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
