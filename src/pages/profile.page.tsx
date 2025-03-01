import React, { useState } from 'react';
import { FiEdit2, FiSettings, FiPackage, FiHeart, FiGrid, FiUser, FiDollarSign, FiUsers } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'artist' | 'admin' | 'customer';
  avatar?: string;
  bio?: string;
  country?: string;
  joinedDate: Date;
  portfolioLink?: string;
}

interface ArtistStats {
  totalArtworks: number;
  totalSales: number;
  followers: number;
  rating: number;
}

interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeListings: number;
}

const ProfilePage: React.FC = () => {
  // This would come from your auth context
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'artist',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Contemporary artist specializing in abstract African art',
    country: 'Rwanda',
    joinedDate: new Date('2024-01-01'),
    portfolioLink: 'https://portfolio.example.com'
  };

  const [activeTab, setActiveTab] = useState('profile');

  const artistStats: ArtistStats = {
    totalArtworks: 24,
    totalSales: 156,
    followers: 1200,
    rating: 4.8
  };

  const adminStats: AdminStats = {
    totalUsers: 1500,
    totalOrders: 2800,
    totalRevenue: 125000,
    activeListings: 450
  };

  const renderArtistDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Artworks</p>
            <h3 className="text-2xl font-bold">{artistStats.totalArtworks}</h3>
          </div>
          <FiGrid className="text-purple-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-bold">{artistStats.totalSales}</h3>
          </div>
          <FiDollarSign className="text-green-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Followers</p>
            <h3 className="text-2xl font-bold">{artistStats.followers}</h3>
          </div>
          <FiUsers className="text-blue-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Rating</p>
            <h3 className="text-2xl font-bold">{artistStats.rating}/5</h3>
          </div>
          <FiHeart className="text-red-500 text-2xl" />
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{adminStats.totalUsers}</h3>
          </div>
          <FiUsers className="text-blue-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold">{adminStats.totalOrders}</h3>
          </div>
          <FiPackage className="text-purple-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Revenue</p>
            <h3 className="text-2xl font-bold">${adminStats.totalRevenue}</h3>
          </div>
          <FiDollarSign className="text-green-500 text-2xl" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Active Listings</p>
            <h3 className="text-2xl font-bold">{adminStats.activeListings}</h3>
          </div>
          <FiGrid className="text-orange-500 text-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{mockUser.name}</h1>
              <p className="text-gray-600 mb-2">{mockUser.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
                </span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                  {mockUser.country}
                </span>
              </div>
            </div>
            <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <FiEdit2 className="inline-block mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="inline-block mr-2" />
              Profile
            </button>
            {mockUser.role === 'artist' && (
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'artworks'
                    ? 'border-b-2 border-purple-500 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('artworks')}
              >
                <FiGrid className="inline-block mr-2" />
                Artworks
              </button>
            )}
            <button
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <FiSettings className="inline-block mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Role-specific Dashboard */}
        {mockUser.role === 'artist' && renderArtistDashboard()}
        {mockUser.role === 'admin' && renderAdminDashboard()}

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{mockUser.bio}</p>
              {mockUser.role === 'artist' && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Portfolio</h3>
                  <a
                    href={mockUser.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    View Portfolio →
                  </a>
                </div>
              )}
            </div>
          )}
          {activeTab === 'artworks' && mockUser.role === 'artist' && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Artworks</h2>
              {/* Add artwork grid here */}
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              {/* Add settings form here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 