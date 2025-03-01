import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiArrowLeft, FiMapPin, FiPackage, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  artist: {
    id: string;
    name: string;
    location: string;
    profileImage: string;
    rating: number;
  };
  stockQuantity: number;
  shipping: string;
  dimensions: string;
  weight: string;
  materials: string[];
  rating: number;
  reviews: {
    id: string;
    user: {
      name: string;
      profileImage: string;
    };
    rating: number;
    comment: string;
    date: string;
  }[];
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace with actual API call
        const mockProduct: Product = {
          id: productId || '1',
          name: 'Traditional Rwandan Handwoven Basket',
          price: 125.99,
          description: `This exquisitely crafted basket is a masterpiece of Rwandan artistic tradition. Each basket is meticulously hand-woven using locally sourced natural fibers, showcasing the remarkable skill passed down through generations. The intricate geometric patterns symbolize peace, hope, and unity - core values in Rwandan culture.

          Known as "Agaseke" in Rwanda, these decorative baskets were traditionally used to store precious items or given as wedding gifts. Today, they represent both cultural heritage and Rwanda's path toward economic empowerment through artistry.

          Each purchase directly supports the artisan community in rural Rwanda, providing sustainable income and preserving cultural traditions. The basket's vibrant colors come from natural vegetable dyes, making each piece environmentally friendly as well as beautiful.

          Display this stunning piece as a standalone art object or use it as a distinctive container for small treasures in your home.`,
          category: 'Traditional Crafts',
          images: [
            'https://images.squarespace-cdn.com/content/v1/5ce6d339a8ffbf0001a8fb20/1558723446531-9KQOP5NPKW1JM1DWQPC5/Sweet+Grass+Basket.jpg',
            'https://www.tradeaid.org.nz/wp-content/uploads/2016/04/rwanda-basket-bowl-large-natural.jpg',
            'https://cdn.shopify.com/s/files/1/0070/7032/files/global-goods-partners-woven-basket_480x480.jpg',
            'https://cdn.shopify.com/s/files/1/0162/5534/products/rwanda1_grande.jpg',
          ],
          artist: {
            id: 'artist1',
            name: 'Mukamana Claudine',
            location: 'Kigali, Rwanda',
            profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            rating: 4.9,
          },
          stockQuantity: 8,
          shipping: 'Worldwide • $15 standard shipping',
          dimensions: '12 x 12 x 8 inches',
          weight: '1.2 lbs',
          materials: ['Natural sisal fibers', 'Vegetable dyes', 'Sweet grass'],
          rating: 4.8,
          reviews: [
            {
              id: 'rev1',
              user: {
                name: 'Sarah Johnson',
                profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
              },
              rating: 5,
              comment: 'Absolutely beautiful basket! The craftsmanship is exquisite and the colors are even more vibrant than in the photos. Shipping was quick and it arrived well-packaged.',
              date: '2023-11-15',
            },
            {
              id: 'rev2',
              user: {
                name: 'Michael Chen',
                profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
              },
              rating: 4,
              comment: 'Excellent quality and beautiful design. This is now the centerpiece on my coffee table and I get compliments from every visitor. Wish it was slightly larger, but otherwise perfect.',
              date: '2023-10-28',
            },
            {
              id: 'rev3',
              user: {
                name: 'Emma Wilson',
                profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
              },
              rating: 5,
              comment: 'Such a meaningful purchase. The quality is outstanding and knowing it supports artisans makes it even more special.',
              date: '2023-10-15',
            }
          ]
        };

        setProduct(mockProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product && user) {
      const wishlistStatus = checkWishlist(product.id);
      setIsInWishlist(wishlistStatus);
    }
  }, [product, user, checkWishlist]);

  const handleQuantityChange = (value: number) => {
    if (product && value > 0 && value <= product.stockQuantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product || quantity <= 0 || quantity > product.stockQuantity) {
      return;
    }

    const cartItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.images[0],
      artist: product.artist.name,
      quantity: quantity
    };
    addToCart(cartItem, quantity);
  };

  const handleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product.id);
        setIsInWishlist(false);
      } else {
        addToWishlist({
          id: product.id,
          title: product.name,
          image: product.images[0],
          price: product.price,
          artist: product.artist.name,
          category: product.category
        });
        setIsInWishlist(true);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl text-indigo-600 mt-2">${product.price}</p>
          </div>

          {/* Artist Info */}
          <div className="flex items-center space-x-4">
            <img
              src={product.artist.profileImage}
              alt={product.artist.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-sm font-medium">{product.artist.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <FiMapPin className="mr-1" /> {product.artist.location}
              </p>
            </div>
          </div>

          <div className="border-t border-b py-4">
            <div className="prose max-w-none">{product.description}</div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiPackage className="text-gray-400" />
              <span className="text-sm text-gray-600">{product.shipping}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiAlertCircle className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {product.stockQuantity} items left in stock
              </span>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="rounded-md border-gray-300"
              >
                {Array.from(
                  { length: Math.min(10, product.stockQuantity) },
                  (_, i) => i + 1
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-md border ${
                  isInWishlist
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <FiHeart />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-md border border-gray-300 text-gray-600"
              >
                <FiShare2 />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.user.profileImage}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{review.user.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`${
                          index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        } fill-current`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;