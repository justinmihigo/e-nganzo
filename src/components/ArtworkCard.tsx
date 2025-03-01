interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  supportAmount: number;
  category: string;
  description: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={artwork.imageUrl} 
        alt={artwork.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
        <p className="text-gray-600 mb-2">{artwork.artist}</p>
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">{artwork.description}</p>
        <div className="flex items-center">
          <span className="text-purple-600 font-medium">Support</span>
          <span className="text-gray-500 text-sm ml-2">(From {artwork.supportAmount.toLocaleString()} RWF)</span>
        </div>
      </div>
    </div>
  );
}; 