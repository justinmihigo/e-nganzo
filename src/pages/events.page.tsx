import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import CategoryFilter from '../components/CategoryFilter';

const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'Exhibition',
    'Workshop',
    'Live Stream',
    'Performance'
  ];

  // Sample events data - would come from API
  const events = [
    {
      id: '1',
      title: 'Contemporary African Art Exhibition',
      image: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg',
      date: 'March 15, 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Kigali Art Gallery',
      organizer: {
        name: 'Marie Uwase',
        image: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg'
      },
      type: 'Exhibition' as const
    },
    {
      id: '2',
      title: 'Digital Art Workshop',
      image: 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg',
      date: 'March 20, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Creative Hub Kigali',
      organizer: {
        name: 'Jean Paul Mugisha',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
      },
      type: 'Workshop' as const
    },
    {
      id: '3',
      title: 'Live Music Performance',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      date: 'March 25, 2024',
      time: '7:00 PM - 10:00 PM',
      location: 'Kigali Cultural Center',
      organizer: {
        name: 'Grace Ingabire',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      type: 'Performance' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events & Exhibitions</h1>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Create Event
          </button>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage; 