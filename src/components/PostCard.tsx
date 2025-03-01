import React from 'react';
import { FiThumbsUp, FiMessageSquare, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  timestamp,
  likes,
  comments,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center mb-4">
        <Link to={`/artist/${author.id}`}>
          <img
            src={author.image}
            alt={author.name}
            className="w-12 h-12 rounded-full mr-4"
          />
        </Link>
        <div>
          <Link to={`/artist/${author.id}`}>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
          </Link>
          <div className="flex items-center text-sm text-gray-500">
            <span>{timestamp}</span>
            <span className="mx-2">•</span>
            <span className="text-purple-600">{category}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{content}</p>
      
      <div className="flex items-center justify-between text-gray-500">
        <button className="flex items-center hover:text-purple-600">
          <FiThumbsUp className="mr-2" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center hover:text-purple-600">
          <FiMessageSquare className="mr-2" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center hover:text-purple-600">
          <FiShare2 className="mr-2" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard; 