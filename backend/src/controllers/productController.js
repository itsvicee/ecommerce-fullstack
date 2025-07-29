// src/controllers/productController.js
const db = require('../db');

// Obtener todos los productos (ruta pública)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener un solo producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const product = await db.query('SELECT * FROM products WHERE id = $1', [id]);

    if (product.rows.length === 0) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    res.json(product.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

// Crear un nuevo producto (ruta protegida)
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  try {
    const newProduct = await db.query(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, imageUrl]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};
