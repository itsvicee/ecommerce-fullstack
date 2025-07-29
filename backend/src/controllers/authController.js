// src/controllers/authController.js

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Función para registrar un nuevo usuario ---
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: 'Por favor, ingrese nombre, email y contraseña.' });
  }

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, full_name',
      [fullName, email, passwordHash]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// --- Función para iniciar sesión ---
exports.login = async (req, res) => {
  // 1. Extraemos email y contraseña del cuerpo de la solicitud
  const { email, password } = req.body;

  // 2. Validamos que los datos llegaron
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese email y contraseña.' });
  }

  try {
    // 3. Buscamos al usuario en la base de datos por su email
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    // 4. Si no encontramos al usuario, devolvemos un error
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas.' }); // Usamos un mensaje genérico por seguridad
    }

    const user = userResult.rows[0];

    // 5. Comparamos la contraseña enviada con la contraseña encriptada (hash) que tenemos en la BD
    const isMatch = await bcrypt.compare(password, user.password_hash);

    // 6. Si las contraseñas no coinciden, devolvemos el mismo error genérico
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 7. ¡Si todo es correcto, creamos un JSON Web Token (JWT)!
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name
      },
    };

    // 8. Firmamos el token con nuestra palabra secreta del .env y le damos una expiración
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // El token será válido por 1 hora
      (error, token) => {
        if (error) throw error;
        // 9. Enviamos el token al cliente
        res.json({ token });
      }
    );

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
