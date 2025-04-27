import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const mensCollection = [
  {
    id: 5,
    name: "RIIVOR The BLOODY SWORD",
    price: 999,
    images: [
      "/sword-1.jpeg",
      "/sword.jpeg",
      "/T-Shirt Image 5-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Classic comfort meets modern style in this essential RIIVOR t-shirt."
  },
  {
    id: 6,
    name: "RIIVOR Premium T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 6.jpg",
      "/T-Shirt Image 6-1.jpg",
      "/T-Shirt Image 6-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium quality cotton with a perfect fit for everyday wear."
  },
  {
    id: 7,
    name: "RIIVOR Comfort T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 1.jpg",
      "/T-Shirt Image 1-1.jpg",
      "/T-Shirt Image 1-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Ultra-soft fabric ensures all-day comfort and style."
  },
  {
    id: 8,
    name: "RIIVOR Modern T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 2.jpg",
      "/T-Shirt Image 2-1.jpg",
      "/T-Shirt Image 2-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Contemporary design meets exceptional quality in this modern piece."
  }
];

const MensCollection = () => {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = React.useState<{ [key: number]: string }>({});

  const handleAddToCart = (product: any) => {
    const selectedSize = selectedSizes[product.id];
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      ...product,
      size: selectedSize,
      quantity: 1
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Men's Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mensCollection.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MensCollection;