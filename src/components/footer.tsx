import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';
import enganzo from '../assets/enganzo full.png'
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement subscription logic
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                src={enganzo}
                alt="e-nganzo" 
                className="h-10 w-auto" 
              />
              <span className="ml-2 text-xl font-bold">e-nganzo</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering African artists through digital innovation. 
              We connect talented creators with global audiences through our marketplace and NFT platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white">
                <FiInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-white">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-purple-500" />
                <span className="text-gray-400">Kigali, Rwanda</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-purple-500" />
                <a href="tel:+250123456789" className="text-gray-400 hover:text-white">
                  +250 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-purple-500" />
                <a href="mailto:info@e-nganzo.com" className="text-gray-400 hover:text-white">
                  info@e-nganzo.com
                </a>
              </li>
              <li className="flex items-center">
                <FaEthereum className="mr-3 text-purple-500" />
                <span className="text-gray-400 break-all">0x1a2b3c4d5e6f7g8h9i0j</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on new artworks, NFT drops, and exclusive offers.
            </p>
            <form onSubmit={subscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} e-nganzo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/shipping-policy" className="text-gray-500 hover:text-white text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;