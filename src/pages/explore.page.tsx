import React, { useState } from 'react';
import { ArtworkCard } from '../components/ArtworkCard';
import { FilterSidebar } from '../components/FilterSidebar';

// Mock data type - adjust based on your actual data structure
interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: number;
  category: string;
}

const ExplorePage: React.FC = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });

  // Mock data - using Pexels free stock images
  const artworks: Artwork[] = [
    {
      id: '1',
      title: 'Abstract Harmony',
      artist: 'Jane Doe',
      imageUrl: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg',
      price: 299,
      category: 'abstract'
    },
    {
      id: '2',
      title: 'Urban Landscape',
      artist: 'John Smith',
      imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
      price: 450,
      category: 'cityscape'
    },
    {
      id: '3',
      title: 'Serene Nature',
      artist: 'Emily Chen',
      imageUrl: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
      price: 375,
      category: 'landscape'
    },
    {
      id: '4',
      title: 'Modern Minimalism',
      artist: 'Michael Brown',
      imageUrl: 'https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg',
      price: 525,
      category: 'minimal'
    },
    {
      id: '5',
      title: 'Vibrant Dreams',
      artist: 'Sarah Wilson',
      imageUrl: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg',
      price: 399,
      category: 'abstract'
    },
    {
      id: '6',
      title: 'Ocean Waves',
      artist: 'David Lee',
      imageUrl: 'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg',
      price: 450,
      category: 'seascape'
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