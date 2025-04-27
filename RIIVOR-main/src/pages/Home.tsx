import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const backgroundImages = [
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
  "https://images.unsplash.com/photo-1516762689617-e1cffcef479d",
  "/4.jpeg",
  "/1.jpeg"
];

const products = [
  {
    id: 1,
    name: "RIIVOR The DEVIL Arrives",
    price: 1299,
    images: [
      "/hod.jpeg",
      "/hod-1.jpeg",
      "/hod-2.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium quality with unique design."
  },
  {
    id: 2,
    name: "RIIVOR The Forever HOODIE",
    price: 1199,
    images: [
      "/forever.jpeg",
      "/forever-1.jpeg",
      "/forever-2.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic comfort meets modern style in this essential RIIVOR Hoodie."
  },
  {
    id: 3,
    name: "RIIVOR The BLOOM",
    price: 1399,
    images: [
      "/boom.jpeg",
      "/boom-1.jpeg",
      "/boom-2.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "A vibrant and eye-catching design that stands out."
  },
  {
    id: 4,
    name: "RIIVOR Today's SOUL",
    price: 1299,
    images: [
      "/2.jpeg",
      "/2-1.jpeg",
      "/2-2.jpeg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "A stylish and comfortable Hoodie for everyday wear."
  }
];

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  return (
    <div className="space-y-12">
      <div className="relative h-[600px] overflow-hidden">
        {/* Current Image */}
        <img
          src={backgroundImages[currentImageIndex]}
          alt="Hero"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Next Image (preloaded) */}
        <img
          src={backgroundImages[nextImageIndex]}
          alt="Hero Next"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setNextImageIndex((index + 1) % backgroundImages.length);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              const newCurrentIndex = (currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length;
              setCurrentImageIndex(newCurrentIndex);
              setNextImageIndex((newCurrentIndex + 1) % backgroundImages.length);
              setIsTransitioning(false);
            }, 500);
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setCurrentImageIndex(nextImageIndex);
              setNextImageIndex((nextImageIndex + 1) % backgroundImages.length);
              setIsTransitioning(false);
            }, 500);
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Overlay with content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to RIIVOR</h1>
            <p className="text-xl mb-8 animate-fade-in-delay">Uplift Your Fashion</p>
            <Link
              to="/products"
              className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition animate-fade-in-delay-2"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <ProductGrid products={products} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/mens-collection" className="relative h-[400px] group cursor-pointer">
          <img
            src="/menColl.jpeg"
            alt="Men's Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Men's Collection</span>
          </div>
        </Link>
        <Link to="/new-arrivals" className="relative h-[400px] group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2"
            alt="New Arrivals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition flex items-center justify-center">
            <span className="text-white text-2xl font-bold">New Arrivals</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;