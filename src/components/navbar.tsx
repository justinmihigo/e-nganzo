import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const user:any = [];
  const logout = () => {}
  const cartItems:any  = []

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Navigate to search results page with the query
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        (transparent && !isScrolled) 
          ? 'bg-transparent text-white' 
          : 'bg-white text-gray-900 shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/src/assets/enganzo full.png" 
              alt="e-nganzo" 
              className="h-10 w-auto" 
            />
            <span className="ml-2 text-xl font-bold">e-nganzo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-purple-500 ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`hover:text-purple-500 ${location.pathname === '/explore' ? 'font-bold' : ''}`}
            >
              Explore
            </Link>
            <Link 
              to="/community" 
              className={`hover:text-purple-500 ${location.pathname === '/community' ? 'font-bold' : ''}`}
            >
              Community
            </Link>
            <Link 
              to="/events" 
              className={`hover:text-purple-500 ${location.pathname === '/events' ? 'font-bold' : ''}`}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-purple-500 ${location.pathname === '/about' ? 'font-bold' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-purple-500 ${location.pathname === '/contact' ? 'font-bold' : ''}`}
            >
              Contact
            </Link>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search artworks, NFTs, artists..."
              className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 text-gray-500 hover:text-purple-500"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <Link to="/cart" className="relative">
              <ShoppingCart 
                size={24} 
                className="hover:text-purple-500" 
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link> */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-purple-500">
                  <User size={24} />
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 top-10 w-48 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/my-orders" 
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    My Orders
                  </Link>
                  {user.role === 'artist' && (
                    <Link 
                      to="/artist-dashboard" 
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Artist Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hover:text-purple-500"
              >
                Login
              </Link>
            )}
            <Link 
              to="/register" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 hover:text-purple-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-md">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Search artworks, NFTs, artists..."
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-2 text-gray-500 hover:text-purple-500"
            >
              <Search size={18} />
            </button>
          </form>

          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`hover:text-purple-500 ${location.pathname === '/' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`hover:text-purple-500 ${location.pathname === '/explore' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/community" 
              className={`hover:text-purple-500 ${location.pathname === '/community' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/events" 
              className={`hover:text-purple-500 ${location.pathname === '/events' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-purple-500 ${location.pathname === '/about' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-purple-500 ${location.pathname === '/contact' ? 'font-bold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="border-t pt-3">
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="block py-2 hover:text-purple-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/my-orders" 
                    className="block py-2 hover:text-purple-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user.role === 'artist' && (
                    <Link 
                      to="/artist-dashboard" 
                      className="block py-2 hover:text-purple-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Artist Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 hover:text-purple-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 hover:text-purple-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 hover:text-purple-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
              <Link 
                to="/cart" 
                className="flex items-center py-2 hover:text-purple-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <span className="ml-2 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;