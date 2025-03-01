import React from 'react';
import { FiUsers, FiTarget, FiHeart, FiGlobe } from 'react-icons/fi';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      bio: 'Art enthusiast with 15+ years of experience in African art curation.',
    },
    {
      name: 'Michael Kagame',
      role: 'Head of Artist Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      bio: 'Former gallery owner and passionate advocate for African artists.',
    },
    {
      name: 'Amara Okafor',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      bio: 'Award-winning designer with a focus on digital art and traditional crafts.',
    },
  ];

  const values = [
    {
      icon: <FiHeart className="h-6 w-6" />,
      title: 'Authenticity',
      description: 'We celebrate and preserve genuine African artistic traditions.',
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: 'Community',
      description: 'Building bridges between artists, collectors, and art enthusiasts.',
    },
    {
      icon: <FiTarget className="h-6 w-6" />,
      title: 'Innovation',
      description: 'Embracing technology to showcase African art globally.',
    },
    {
      icon: <FiGlobe className="h-6 w-6" />,
      title: 'Sustainability',
      description: 'Supporting fair trade and ethical art practices.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg"
            alt="African Art"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Connecting African artists with global art lovers through a digital marketplace
              that celebrates creativity, culture, and community.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to empower African artists by providing them with a global
              platform to showcase their work, while making authentic African art accessible
              to collectors worldwide. Through technology and community, we're bridging
              cultural gaps and creating opportunities for artistic expression.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  {value.icon}
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">{value.title}</h3>
                <p className="mt-2 text-base text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet the passionate individuals behind our mission.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <img
                    className="mx-auto h-40 w-40 rounded-full object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-indigo-600">{member.role}</p>
                  <p className="mt-2 text-base text-gray-500">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 