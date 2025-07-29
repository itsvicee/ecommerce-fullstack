// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para crear una nueva orden (protegida)
// POST /api/orders
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
