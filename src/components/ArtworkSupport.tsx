import React from 'react';
import { Heart, Users, Award } from 'lucide-react';

interface ArtworkSupportProps {
  supportAmount: number;
  artist: string;
  story: string;
  impact?: string;
}

const ArtworkSupport: React.FC<ArtworkSupportProps> = ({
  supportAmount,
  artist,
  story,
  impact
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="text-purple-500" size={20} />
          <span className="text-lg font-medium">Support {artist}</span>
        </div>
        <span className="text-2xl font-bold">${supportAmount}</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-600">{story}</p>
        {impact && (
          <div className="flex items-center space-x-2 text-green-600">
            <Users size={16} />
            <span className="text-sm">{impact}</span>
          </div>
        )}
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="text-purple-500" size={20} />
          <span className="font-medium">Your Support Includes:</span>
        </div>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>• Direct support to the artist</li>
          <li>• Certificate of authenticity</li>
          <li>• Story behind the artwork</li>
          <li>• Updates on artist's future works</li>
        </ul>
      </div>

      <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
        Support This Artist
      </button>
    </div>
  );
};

export default ArtworkSupport; 