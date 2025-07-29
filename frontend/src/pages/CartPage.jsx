// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQuantity, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">Tu carrito está vacío.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition">
            Ir a la Tienda
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna de Items del Carrito */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.id} className="p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img src={item.image_url || 'https://placehold.co/100x100/2d3748/ffffff?text=IMG'} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${new Intl.NumberFormat('es-CL').format(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">+</button>
                    </div>
                    <p className="font-semibold w-24 text-center sm:text-right">
                      ${new Intl.NumberFormat('es-CL').format(item.price * item.quantity)}
                    </p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Columna de Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Resumen de la Compra</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${new Intl.NumberFormat('es-CL').format(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${new Intl.NumberFormat('es-CL').format(cartTotal)}</span>
              </div>
              <Link to="/checkout" className="mt-6 block w-full text-center px-6 py-3 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"> 
              Proceder al Pago
            </Link>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
