interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: number;
  category: string;
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
        <p className="text-gray-600">{artwork.artist}</p>
        <p className="text-gray-900 font-medium mt-2">${artwork.price}</p>
      </div>
    </div>
  );
}; 