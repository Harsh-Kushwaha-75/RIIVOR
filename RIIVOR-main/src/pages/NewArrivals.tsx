import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const newArrivals = [
  {
    id: 9,
    name: "RIIVOR Limited Edition T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 3.jpg",
      "/T-Shirt Image 3-1.jpg",
      "/T-Shirt Image 3-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Limited edition design featuring unique artistic elements."
  },
  {
    id: 10,
    name: "RIIVOR Special Collection T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 4.jpg",
      "/T-Shirt Image 4-1.jpg",
      "/T-Shirt Image 4-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Part of our special collection with exclusive patterns."
  },
  {
    id: 11,
    name: "RIIVOR Designer T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 5.jpg",
      "/T-Shirt Image 5-1.jpg",
      "/T-Shirt Image 5-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Designer collaboration bringing unique style to everyday wear."
  },
  {
    id: 12,
    name: "RIIVOR Exclusive T-Shirt",
    price: 999,
    images: [
      "/T-Shirt Image 6.jpg",
      "/T-Shirt Image 6-1.jpg",
      "/T-Shirt Image 6-2.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Exclusive design with premium quality materials."
  }
];

const NewArrivals = () => {
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
      <h1 className="text-4xl font-bold text-center mb-8">New Arrivals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;