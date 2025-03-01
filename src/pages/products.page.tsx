import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  image: string;
  supportAmount: number;
  artist: string;
  category: string;
  rating: number;
  createdAt: Date;
  story: string;
  impact: string;
}

const BrowseProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data with Pexels images
  const products: Product[] = [
    { 
      id: '1',
      title: 'Abstract Dreams',
      image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg',
      supportAmount: 299,
      artist: 'Maria Chen',
      category: 'Paintings',
      rating: 4.8,
      createdAt: new Date('2025-01-15'),
      story: 'Inspired by the vibrant markets of Kigali',
      impact: 'Supports local art education programs'
    },
    { 
      id: '2',
      title: 'Wooden Sculpture',
      image: 'https://images.pexels.com/photos/5708072/pexels-photo-5708072.jpeg',
      supportAmount: 450,
      artist: 'Sam Johnson',
      category: 'Sculptures',
      rating: 4.5,
      createdAt: new Date('2025-02-01'),
      story: 'Created using traditional woodcarving techniques',
      impact: 'Helps preserve traditional craftsmanship'
    },
    { id: '3', title: 'Handcrafted Vase', image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg', supportAmount: 120, artist: 'Emma Patel', category: 'Crafts', rating: 4.9, createdAt: new Date('2025-01-20'), story: '', impact: '' },
    { id: '4', title: 'Mountain Landscape', image: 'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg', supportAmount: 350, artist: 'John Lewis', category: 'Paintings', rating: 4.7, createdAt: new Date('2025-02-10'), story: '', impact: '' },
    { id: '5', title: 'Ceramic Bowl Set', image: 'https://images.pexels.com/photos/2148215/pexels-photo-2148215.jpeg', supportAmount: 180, artist: 'Emma Patel', category: 'Crafts', rating: 4.6, createdAt: new Date('2025-01-25'), story: '', impact: '' },
    { id: '6', title: 'Portrait Study', image: 'https://images.pexels.com/photos/2911545/pexels-photo-2911545.jpeg', supportAmount: 275, artist: 'Maria Chen', category: 'Paintings', rating: 4.9, createdAt: new Date('2025-02-05'), story: '', impact: '' },
    { id: '7', title: 'Nature Photography', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg', supportAmount: 320, artist: 'John Lewis', category: 'Photography', rating: 4.8, createdAt: new Date('2025-02-12'), story: '', impact: '' },
    { id: '8', title: 'Limited Edition Print', image: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg', supportAmount: 150, artist: 'Sarah Miller', category: 'Prints', rating: 4.4, createdAt: new Date('2025-01-30'), story: '', impact: '' },
    { id: '9', title: 'Metal Wall Art', image: 'https://images.pexels.com/photos/1002721/pexels-photo-1002721.jpeg', supportAmount: 410, artist: 'Sam Johnson', category: 'Sculptures', rating: 4.7, createdAt: new Date('2025-02-03'), story: '', impact: '' },
  ];

  const categories = ['Paintings', 'Sculptures', 'Crafts', 'Photography', 'Prints'];
  const artists = Array.from(new Set(products.map(p => p.artist)));

  // Filter products
  const filteredProducts = products.filter(product => {
    return (
      (searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (product.supportAmount >= priceRange[0] && product.supportAmount <= priceRange[1])
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'popular':
        return b.rating - a.rating;
      case 'priceHighToLow':
        return b.supportAmount - a.supportAmount;
      case 'priceLowToHigh':
        return a.supportAmount - b.supportAmount;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getSortLabel = (sortValue: string): string => {
    switch (sortValue) {
      case 'newest': return 'Newest';
      case 'popular': return 'Most Popular';
      case 'priceHighToLow': return 'Price: High to Low';
      case 'priceLowToHigh': return 'Price: Low to High';
      default: return 'Sort By';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Artworks</h1>
        
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search artworks or artists"
              className="w-full pl-4 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-3 text-gray-500" size={20} />
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-white border rounded-lg px-4 py-2 hover:bg-gray-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span>Filters</span>
                <ChevronDown size={16} />
              </button>
              
              {/* Filter dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-24 border rounded-md px-2 py-1"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-24 border rounded-md px-2 py-1"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="mr-2"
                          />
                          <label htmlFor={`category-${category}`}>{category}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Artists</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {artists.map((artist) => (
                        <div key={artist} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`artist-${artist}`}
                            className="mr-2"
                          />
                          <label htmlFor={`artist-${artist}`}>{artist}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-white border rounded-lg px-4 py-2 hover:bg-gray-50"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <span>Sort: {getSortLabel(sortBy)}</span>
                <ChevronDown size={16} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('newest');
                        setShowSortDropdown(false);
                      }}
                    >
                      Newest
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('popular');
                        setShowSortDropdown(false);
                      }}
                    >
                      Most Popular
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('priceHighToLow');
                        setShowSortDropdown(false);
                      }}
                    >
                      Price: High to Low
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSortBy('priceLowToHigh');
                        setShowSortDropdown(false);
                      }}
                    >
                      Price: Low to High
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-l pl-4 flex space-x-2">
              <button 
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="mb-8">
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <Filter size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No artworks found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
                    <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                    <p className="text-gray-600 mb-2">by {product.artist}</p>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{product.rating}</span>
                      <span className="bg-gray-200 px-2 py-1 ml-auto rounded text-xs">{product.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.supportAmount}</span>
                      <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col md:flex-row">
                  <img src={product.image} alt={product.title} className="w-full md:w-48 h-48 object-cover rounded-lg" />
                  <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{product.title}</h3>
                        <p className="text-gray-600 mb-2">by {product.artist}</p>
                      </div>
                      <button className="p-2 text-gray-500 hover:text-black transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{product.rating}</span>
                      <span className="bg-gray-200 px-2 py-1 ml-4 rounded text-xs">{product.category}</span>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {product.story}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-bold text-xl">${product.supportAmount}</span>
                      <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center">
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button 
                className={`px-4 py-2 rounded-l-md border border-r-0 bg-white hover:bg-gray-50 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : ''}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  className={`px-4 py-2 border border-r-0 ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={`px-4 py-2 rounded-r-md border bg-white hover:bg-gray-50 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : ''}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProductsPage;