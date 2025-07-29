// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError('No se pudo cargar el producto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} ha sido añadido al carrito!`);
    }
  };

  if (loading) return <div className="text-center p-10"><p>Cargando...</p></div>;
  if (error) return <div className="text-center p-10 text-red-500"><p>{error}</p></div>;
  if (!product) return <div className="text-center p-10"><p>Producto no encontrado.</p></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna de la Imagen */}
        <div>
          <img 
            src={product.image_url || 'https://placehold.co/600x400/2d3748/ffffff?text=Producto'} 
            alt={`Imagen de ${product.name}`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Columna de la Información */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-3xl text-gray-700 mb-4">${new Intl.NumberFormat('es-CL').format(product.price)}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">Stock disponible: {product.stock}</p>
            <button 
              onClick={handleAddToCart}
              className="w-full px-6 py-3 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
