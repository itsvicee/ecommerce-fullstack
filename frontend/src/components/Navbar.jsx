// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoutAndCloseMenu = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-yellow-400">
              Tech<span className="text-white">Tienda</span>
            </Link>
          </div>

          {/* Menú de Escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="py-5 px-3 hover:text-yellow-400 transition duration-300">Tienda</Link>
            {user ? (
              <>
                <span className="py-5 px-3">Hola, {user.fullName || 'Usuario'}</span>
                <button onClick={logout} className="py-2 px-4 bg-red-500 hover:bg-red-400 rounded transition duration-300">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded transition duration-300">Login</Link>
                <Link to="/register" className="py-2 px-4 bg-yellow-400 text-gray-900 hover:bg-yellow-300 rounded font-semibold transition duration-300">Registro</Link>
              </>
            )}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Open Menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-700">Tienda</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-700">Carrito ({totalItems})</Link>
          <div className="border-t border-gray-700 my-2"></div>
          {user ? (
            <>
              <span className="block py-2 px-3 text-base font-medium">Hola, {user.fullName || 'Usuario'}</span>
              <button onClick={handleLogoutAndCloseMenu} className="w-full text-left block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-700">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-700">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 px-3 rounded-md text-base font-medium hover:bg-gray-700">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
