import React, { useState } from 'react';
import { Search, Filter, Heart } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  image: string;
  price: number;
  artist: string;
  category: string;
  isNFT: boolean;
}
const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
  
    // Sample data
    const featuredArtworks: Artwork[] = [
      {
        id: '1',
        title: 'Abstract Dreams',
        image: 'https://images.pexels.com/photos/161154/stained-glass-spiral-circle-pattern-161154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 299,
        artist: 'Maria Chen',
        category: 'Paintings',
        isNFT: false,
      },
      {
        id: '2',
        title: 'Digital Universe',
        image: 'https://images.pexels.com/photos/10556474/pexels-photo-10556474.jpeg?auto=compress&cs=tinysrgb&w=1200',
        price: 0.5,
        artist: 'Alex Rivera',
        category: 'NFTs',
        isNFT: true,
      },
      {
        id: '3',
        title: 'Wooden Sculpture',
        image: 'https://images.pexels.com/photos/999283/pexels-photo-999283.jpeg',
        price: 450,
        artist: 'Sam Johnson',
        category: 'Sculptures',
        isNFT: false,
      },
      {
        id: '4',
        title: 'Handcrafted Vase',
        image: 'https://images.pexels.com/photos/8063877/pexels-photo-8063877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        price: 120,
        artist: 'Emma Patel',
        category: 'Crafts',
        isNFT: false,
      },
    ];
  
    const trendingArtists = [
      {
        id: '1',
        name: 'Maria Chen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        followers: 5482,
      },
      {
        id: '2',
        name: 'Alex Rivera',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
        followers: 3291,
      },
      {
        id: '3',
        name: 'Emma Patel',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        followers: 2845,
      },
    ];
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-black text-white">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.pexels.com/photos/673648/pexels-photo-673648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Art Marketplace"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 px-4 py-32 max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Discover, Collect & Sell Extraordinary Artwork</h1>
            <p className="text-xl mb-8">The premier marketplace for artists and collectors</p>
            <div className="flex items-center justify-center max-w-xl mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for artworks, NFTs, or artists"
                  className="w-full pl-4 pr-12 py-3 border-2 border-white rounded-full text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-4 text-white" size={20} />
              </div>
              <button className="ml-2 bg-black bg-opacity-20 p-3 rounded-full">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      
      {/* Featured Artworks */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Artworks & NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.map((artwork) => (
            <div key={artwork.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative">
                <img src={artwork.image} alt={artwork.title} className="w-full h-64 object-cover" />
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                  <Heart size={18} />
                </button>
                {artwork.isNFT && (
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    NFT
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{artwork.title}</h3>
                <p className="text-gray-600 mb-2">by {artwork.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {artwork.isNFT ? `${artwork.price} ETH` : `$${artwork.price}`}
                  </span>
                  <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800">
                    {artwork.isNFT ? 'Place Bid' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trending Artists */}
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Trending Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingArtists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg p-6 flex items-center shadow-md hover:shadow-xl transition-shadow">
              <img src={artist.avatar} alt={artist.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="ml-4">
                <h3 className="font-bold text-lg">{artist.name}</h3>
                <p className="text-gray-600">{artist.followers.toLocaleString()} followers</p>
              </div>
              <button className="ml-auto bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;