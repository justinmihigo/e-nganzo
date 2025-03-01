import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  artist: string;
  category: string;
}

const FavoritesPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: WishlistItem) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-2 text-gray-500">Save items you love for later</p>
            <Link
              to="/products"
              className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Browse Artworks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <FiHeart className="h-5 w-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 mb-2">by {item.artist}</p>
                  <div className="flex items-center mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800"
                    >
                      <FiShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 