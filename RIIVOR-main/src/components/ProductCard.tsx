import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentImageIndex === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">₹{product.price}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Size
          </label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-md ${
                  selectedSize === size
                    ? 'bg-black text-white'
                    : 'border border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Add to Cart
          </button>
          <Link
            to="/products"
            className="w-full bg-white text-black border border-black py-2 rounded-md hover:bg-gray-100 transition text-center"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 