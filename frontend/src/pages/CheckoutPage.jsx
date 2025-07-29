// src/pages/CheckoutPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderData = {
      items: cartItems,
      totalAmount: cartTotal,
    };

    try {
      const response = await orderService.create(orderData, token);
      clearCart();
      navigate(`/order-confirmation/${response.data.orderId}`);
    } catch (error) {
      alert('Hubo un error al procesar tu orden. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Confirmar Compra</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tus Productos</h2>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${new Intl.NumberFormat('es-CL').format(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t my-4"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${new Intl.NumberFormat('es-CL').format(cartTotal)}</span>
        </div>
        <button 
          onClick={handleCheckout}
          className="mt-6 w-full bg-yellow-500 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Pagar y Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;