import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../lib/supabase';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({});
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);

        const indices: { [key: number]: number } = {};
        const sizes: { [key: number]: string } = {};
        data.forEach((product: Product) => {
          indices[product.id] = 0;
          sizes[product.id] = '';
        });
        setCurrentImageIndices(indices);
        setSelectedSizes(sizes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const nextImage = (productId) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % (productId === 1 ? product.images.length : product2.images.length)
    }));
  };

  const prevImage = (productId) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + (productId === 1 ? product.images.length : product2.images.length)) % (productId === 1 ? product.images.length : product2.images.length)
    }));
  };

  const handleAddToCart = (product, selectedSize) => {
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

  const renderProduct = (product) => (
    <div key={product.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.images[currentImageIndices[product.id]]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => prevImage(product.id)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => nextImage(product.id)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="flex justify-center mt-4 space-x-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndices(prev => ({ ...prev, [product.id]: index }))}
              className={`w-3 h-3 rounded-full ${
                currentImageIndices[product.id] === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-2xl">₹{product.price}</p>
        <div>
          <h3 className="text-lg font-medium mb-2">Select Size</h3>
          <div className="flex space-x-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                className={`w-12 h-12 rounded-md border ${
                  selectedSizes[product.id] === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => handleAddToCart(product, selectedSizes[product.id])}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
        >
          Add to Cart
        </button>
        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {products.map((product) => renderProduct(product))}
    </div>
  );
};

export default Products;