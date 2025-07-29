// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getAll();
        
        // --- ¡CORRECCIÓN CLAVE! ---
        // Verificamos si la respuesta es un array antes de actualizar el estado.
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          // Si no es un array, lo tratamos como un error.
          console.error("La API no devolvió un array de productos:", response.data);
          setProducts([]); // Nos aseguramos de que products siga siendo un array vacío.
        }

      } catch (err) {
        setError('No se pudieron cargar los productos. El servidor puede estar iniciándose. Inténtalo de nuevo en un momento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-10"><p>Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500"><p>{error}</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nuestros Productos</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay productos disponibles en este momento.</p>
      )}
    </div>
  );
};

export default HomePage;
