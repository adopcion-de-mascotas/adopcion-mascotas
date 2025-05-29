const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env

function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = payload; // Guarda los datos decodificados
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = verificarToken;
