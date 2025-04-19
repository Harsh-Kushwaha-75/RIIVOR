import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Welcome to RIIVOR</h1>
            <p className="text-xl mb-8">Discover Your Style</p>
            <Link
              to="/products"
              className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27"
              alt="Men's Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Men's Collection</span>
            </div>
          </div>
          <div className="relative h-[400px] group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2"
              alt="New Arrivals"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
              <span className="text-white text-2xl font-bold">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;