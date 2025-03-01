import React, { useState } from 'react';
import { Search, Filter, Clock, Heart, Wallet } from 'lucide-react';

interface NFT {
  id: string;
  title: string;
  image: string;
  price: number;
  priceInETH: number;
  artist: string;
  category: string;
  blockchain: 'Ethereum' | 'Solana' | 'Polygon';
  isAuction: boolean;
  auctionEndsAt?: Date;
  highestBid?: number;
  bids?: number;
}

const NFTMarketplacePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [showAuctionsOnly, setShowAuctionsOnly] = useState(false);
  const [showBuyNowOnly, setShowBuyNowOnly] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  // Sample data
  const nfts: NFT[] = [
    { 
      id: '1',
      title: 'Digital Universe #42',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      price: 2500,
      priceInETH: 0.85,
      artist: 'Alex Rivera',
      category: 'Digital Art',
      blockchain: 'Ethereum',
      isAuction: true,
      auctionEndsAt: new Date('2025-03-05T15:00:00'),
      highestBid: 0.85,
      bids: 12
    },
    { 
      id: '2',
      title: 'Cosmic Dreams',
      image: 'https://images.pexels.com/photos/3493777/pexels-photo-3493777.jpeg',
      price: 1200,
      priceInETH: 0.41,
      artist: 'Maria Chen',
      category: 'Abstract',
      blockchain: 'Polygon',
      isAuction: false
    },
    { 
      id: '3',
      title: 'Neon Future #07',
      image: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg',
      price: 3600,
      priceInETH: 1.2,
      artist: 'Alex Rivera',
      category: 'Photography',
      blockchain: 'Ethereum',
      isAuction: true,
      auctionEndsAt: new Date('2025-03-10T20:00:00'),
      highestBid: 1.2,
      bids: 7
    },
    { 
      id: '4',
      title: 'Abstract Thoughts',
      image: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg',
      price: 920,
      priceInETH: 0.32,
      artist: 'Sarah Wu',
      category: 'Abstract',
      blockchain: 'Solana',
      isAuction: false
    },
    { 
      id: '5',
      title: 'Future City',
      image: 'https://images.pexels.com/photos/5022847/pexels-photo-5022847.jpeg',
      price: 1800,
      priceInETH: 0.62,
      artist: 'James Peterson',
      category: 'Digital Art',
      blockchain: 'Polygon',
      isAuction: false
    },
    { 
      id: '6',
      title: 'Ethereal Being #03',
      image: 'https://images.pexels.com/photos/3685271/pexels-photo-3685271.jpeg',
      price: 4500,
      priceInETH: 1.55,
      artist: 'Maria Chen',
      category: 'Digital Art',
      blockchain: 'Ethereum',
      isAuction: true,
      auctionEndsAt: new Date('2025-03-15T12:00:00'),
      highestBid: 1.55,
      bids: 23
    },
  ];

  const categories = Array.from(new Set(nfts.map(nft => nft.category)));
  const blockchains = Array.from(new Set(nfts.map(nft => nft.blockchain)));
  
  // Filter NFTs
  const filteredNFTs = nfts.filter(nft => {
    return (
      (searchTerm === '' || 
        nft.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        nft.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(nft.category)) &&
      (selectedBlockchains.length === 0 || selectedBlockchains.includes(nft.blockchain)) &&
      ((!showAuctionsOnly && !showBuyNowOnly) || 
       (showAuctionsOnly && nft.isAuction) || 
       (showBuyNowOnly && !nft.isAuction))
    );
  });

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBlockchain = (blockchain: string) => {
    if (selectedBlockchains.includes(blockchain)) {
      setSelectedBlockchains(selectedBlockchains.filter(b => b !== blockchain));
    } else {
      setSelectedBlockchains([...selectedBlockchains, blockchain]);
    }
  };

  // Function to format time remaining
  const formatTimeRemaining = (endDate: Date): string => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">NFT Marketplace</h1>
          
          {!isWalletConnected ? (
            <button 
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg"
              onClick={() => setIsWalletConnected(true)}
            >
              <Wallet size={18} className="mr-2" />
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center bg-gray-800 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>0x7F5...E29a</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 bg-gray-800 rounded-xl p-6">
            <h2 className="font-bold text-xl mb-4">Filters</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="buy-now"
                    checked={showBuyNowOnly}
                    onChange={() => {
                      setShowBuyNowOnly(!showBuyNowOnly);
                      if (!showBuyNowOnly) setShowAuctionsOnly(false);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="buy-now">Buy Now</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auctions"
                    checked={showAuctionsOnly}
                    onChange={() => {
                      setShowAuctionsOnly(!showAuctionsOnly);
                      if (!showAuctionsOnly) setShowBuyNowOnly(false);
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="auctions">Auctions</label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
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
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Blockchain</h3>
              <div className="space-y-2">
                {blockchains.map(blockchain => (
                  <div key={blockchain} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`blockchain-${blockchain}`}
                      checked={selectedBlockchains.includes(blockchain)}
                      onChange={() => toggleBlockchain(blockchain)}
                      className="mr-2"
                    />
                    <label htmlFor={`blockchain-${blockchain}`}>{blockchain}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or artist..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {/* NFT Grid */}
            {filteredNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNFTs.map(nft => (
                  <div key={nft.id} className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
                      <button className="absolute top-3 right-3 bg-gray-900 bg-opacity-70 p-2 rounded-full">
                        <Heart size={18} className="text-gray-300 hover:text-red-500" />
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{nft.title}</h3>
                        <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                          {nft.blockchain}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">by {nft.artist}</p>
                      
                      {nft.isAuction ? (
                        <div className="mb-3">
                          <div className="flex items-center text-sm mb-1">
                            <Clock size={14} className="mr-1 text-indigo-400" />
                            <span className="text-indigo-400">{formatTimeRemaining(nft.auctionEndsAt!)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-400">Current bid</p>
                              <p className="font-bold">{nft.highestBid} ETH</p>
                              <p className="text-xs text-gray-400">${nft.price.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400">Bids</p>
                              <p className="font-medium">{nft.bids}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <p className="text-xs text-gray-400">Price</p>
                          <p className="font-bold">{nft.priceInETH} ETH</p>
                          <p className="text-xs text-gray-400">${nft.price.toLocaleString()}</p>
                        </div>
                      )}
                      
                      <button
                        className={`w-full py-2 rounded-lg font-medium ${
                          isWalletConnected 
                            ? 'bg-indigo-600 hover:bg-indigo-700' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isWalletConnected}
                      >
                        {nft.isAuction ? 'Place bid' : 'Buy now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Filter size={48} className="text-gray-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">No items found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplacePage;