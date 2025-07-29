// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { productService } from '../services/api'; // Importamos el servicio de productos
import ProductCard from '../components/ProductCard'; // Importamos el componente de tarjeta

const HomePage = () => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para saber si la página está cargando
  const [loading, setLoading] = useState(true);
  // Estado para manejar cualquier error que ocurra
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta por primera vez
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Llamamos a la función de nuestro servicio para obtener los productos
        const response = await productService.getAll();
        setProducts(response.data);
      } catch (err) {
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Si está cargando, mostramos un mensaje
  if (loading) {
    return <div className="text-center p-10"><p>Cargando productos...</p></div>;
  }

  // Si hay un error, mostramos el error
  if (error) {
    return <div className="text-center p-10 text-red-500"><p>{error}</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Mapeamos el array de productos y renderizamos una ProductCard por cada uno */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;