// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware'); // Importamos nuestro "guardia"

// Ruta para obtener todos los productos - PÚBLICA
// GET /api/products
router.get('/', productController.getAllProducts);

// Ruta para crear un nuevo producto - PROTEGIDA
// POST /api/products
// Observa cómo ponemos el authMiddleware antes del controlador.
// ¡Él decidirá si la solicitud puede pasar o no!
router.post('/', authMiddleware, productController.createProduct);

// La ruta para obtener un producto por su ID. El ':' indica que es un parámetro dinámico.
router.get('/:id', productController.getProductById);

module.exports = router;
