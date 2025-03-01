import React from 'react';
// import CartProvider  from '../hooks/useCart';
// import  WishlistProvider  from '../hooks/useWishlist';
// import  AuthProvider from '../hooks/useAuth';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <AuthProvider>
    //   <CartProvider>
    //     <WishlistProvider>
    <div>
        {children}
    </div>
    //     </WishlistProvider>
    //   </CartProvider>
    // </AuthProvider>
  );
}; 