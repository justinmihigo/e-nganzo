import React from 'react';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    image: string;
  };
  type: 'Exhibition' | 'Workshop' | 'Live Stream' | 'Performance';
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  image,
  date,
  time,
  location,
  organizer,
  type
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600 mb-4">
          {type}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <FiCalendar className="mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-2" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center pt-4 border-t">
          <img 
            src={organizer.image} 
            alt={organizer.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="text-sm text-gray-600">Organized by <span className="font-medium">{organizer.name}</span></span>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 