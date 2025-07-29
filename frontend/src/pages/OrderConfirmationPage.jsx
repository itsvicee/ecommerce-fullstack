// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-600 mb-4">¡Gracias por tu compra!</h1>
      <p className="text-lg text-gray-700">Tu orden ha sido procesada exitosamente.</p>
      <p className="text-gray-600 mt-2">Tu número de orden es: <span className="font-semibold">{orderId}</span></p>
      <Link to="/" className="mt-8 inline-block px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition">
        Volver a la Tienda
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;