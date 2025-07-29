// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); 

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenimos la navegación al hacer clic en el botón
    e.stopPropagation(); // Detenemos la propagación para no activar el Link del contenedor
    addToCart(product);
    alert(`${product.name} ha sido añadido al carrito!`); // Usaremos una notificación mejor más adelante
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
        <img 
          src={product.image_url || 'https://placehold.co/600x400/2d3748/ffffff?text=Producto'} 
          alt={`Imagen de ${product.name}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-1">${new Intl.NumberFormat('es-CL').format(product.price)}</p>
          <div className="mt-auto pt-4">
            <button 
              onClick={handleAddToCart} 
              className="w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;