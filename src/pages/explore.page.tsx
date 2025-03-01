import React, { useState } from 'react';
import { ArtworkCard } from '../components/ArtworkCard';
import { FilterSidebar } from '../components/FilterSidebar';

// Mock data type - adjust based on your actual data structure
interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  supportAmount: number;
  category: string;
  description: string;
}

const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    supportRange: 'all',
    description: '',
    sortBy: 'newest'
  });

  // Mock data - using Pexels free stock images
  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Abstract Harmony',
      artist: 'Jane Doe',
      imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg',
      supportAmount: 299,
      category: 'abstract',
      description: 'A vibrant exploration of color and emotion, expressing the harmony of chaos and order.'
    },
    {
      id: '2',
      title: 'Urban Landscape',
      artist: 'John Smith',
      imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
      supportAmount: 450,
      category: 'cityscape',
      description: 'A contemporary view of city life, capturing the energy and rhythm of urban spaces.'
    },
    {
      id: '3',
      title: 'Serene Nature',
      artist: 'Emily Chen',
      imageUrl: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
      supportAmount: 375,
      category: 'landscape',
      description: `An intimate portrayal of nature's tranquility, inspired by traditional landscape techniques.`
    },
    {
      id: '4',
      title: 'Modern Minimalism',
      artist: 'Michael Brown',
      imageUrl: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg',
      supportAmount: 525,
      category: 'minimal',
      description: 'A minimalist approach to form and space, reflecting on simplicity and essence.'
    },
    {
      id: '5',
      title: 'Vibrant Dreams',
      artist: 'Sarah Wilson',
      imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg',
      supportAmount: 399,
      category: 'abstract',
      description: `A dreamlike journey through color and form, expressing the artist's inner visions.`
    },
    {
      id: '6',
      title: 'Ocean Waves',
      artist: 'David Lee',
      imageUrl: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg',
      supportAmount: 450,
      category: 'seascape',
      description: 'A powerful representation of ocean movements, celebrating the majesty of water.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Artworks</h1>
        
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Grid of Artworks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 