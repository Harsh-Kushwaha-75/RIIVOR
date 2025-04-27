import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems, cartCount, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <nav className="bg-black shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <img src="/logo1.jpeg" alt="RIIVOR Logo 1" className="h-12 w-auto mr-2 object-contain" />
              <img src="/logo.jpeg" alt="RIIVOR Logo" className="h-12 w-auto object-contain" />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/mens-collection" className="text-white hover:text-gray-300">Men's Collection</Link>
            <Link to="/new-arrivals" className="text-white hover:text-gray-300">New Arrivals</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <Search className="h-6 w-6" />
            </button>
            <Link to="/login" className="text-white hover:text-gray-300">
              <User className="h-6 w-6" />
            </Link>
            <button className="text-white hover:text-gray-300 relative" onClick={toggleCart}>
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shopping Cart ({cartCount})</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500">Size: {item.size}</p>
                        <p className="text-gray-500">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <div className="mt-4">
                    <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;