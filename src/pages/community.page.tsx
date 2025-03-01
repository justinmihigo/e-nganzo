import React, { useState } from 'react';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';

const CommunityPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPost, setNewPost] = useState('');

  const categories = [
    'Discussion',
    'Questions',
    'Showcase',
    'Collaboration',
    'Events',
    'Resources'
  ];

  // Sample posts data - would come from API
  const posts = [
    {
      id: '1',
      author: {
        id: 'user1',
        name: 'Marie Uwase',
        image: 'https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg'
      },
      content: 'Looking for collaborators on a new exhibition project in Kigali...',
      timestamp: '2h ago',
      likes: 24,
      comments: 8,
      category: 'Collaboration'
    },
    // Add more sample posts
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    setNewPost('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Forum</h1>

        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, questions, or work..."
              className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Filters */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 