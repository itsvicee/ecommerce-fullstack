// src/controllers/orderController.js
const db = require('../db');

exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user.id; // Obtenemos el ID del usuario del token (gracias al middleware)

  const client = await db.pool.connect(); // Usamos un cliente para manejar la transacción

  try {
    await client.query('BEGIN'); // Iniciamos una transacción

    // 1. Crear la orden en la tabla 'orders'
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [userId, totalAmount, 'completed']
    );
    const orderId = orderResult.rows[0].id;

    // 2. Insertar cada item en la tabla 'order_items' y actualizar el stock
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.id, item.quantity, item.price]
      );
      // Actualizamos el stock del producto
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.id]
      );
    }

    await client.query('COMMIT'); // Si todo fue bien, confirmamos los cambios
    res.status(201).json({ message: 'Orden creada exitosamente', orderId });

  } catch (error) {
    await client.query('ROLLBACK'); // Si algo falló, revertimos todo
    console.error('Error al crear la orden:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    client.release(); // Liberamos el cliente de la pool
  }
};