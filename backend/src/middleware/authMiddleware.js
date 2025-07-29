// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Este es nuestro "guardia de seguridad"
module.exports = function(req, res, next) {
  // 1. Obtenemos el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // 2. Si no hay token, enviamos un error
  if (!token) {
    return res.status(401).json({ message: 'No hay token, autorización denegada.' });
  }

  // 3. El token usualmente viene como "Bearer <token>". Necesitamos quitar "Bearer ".
  const tokenOnly = token.split(' ')[1];
  if (!tokenOnly) {
    return res.status(401).json({ message: 'Formato de token inválido.' });
  }

  // 4. Verificamos el token usando nuestra palabra secreta
  try {
    const decoded = jwt.verify(tokenOnly, process.env.JWT_SECRET);

    // 5. Si el token es válido, el payload decodificado (con los datos del usuario) se añade a la solicitud
    req.user = decoded.user;

    // 6. Le decimos a la solicitud que puede continuar hacia la ruta principal
    next();
  } catch (error) {
    res.status(401).json({ message: 'El token no es válido.' });
  }
};