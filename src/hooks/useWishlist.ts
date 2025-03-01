import { useState } from 'react';

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  artist: string;
  category: string;
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      if (!prevItems.find(i => i.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}; 