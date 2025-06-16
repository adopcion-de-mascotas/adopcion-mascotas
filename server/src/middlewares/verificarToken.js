const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Aceptamos "Bearer" o "Beaber" por si el cliente se equivocó
    if (!authHeader || (!authHeader.startsWith("Bearer ") && !authHeader.startsWith("Beaber "))) {
        return res.status(401).json({ error: "Token no proporcionado o mal formado" });
    }

    // Extraemos el token sin importar si es Bearer o Beaber
    const token = authHeader.replace(/^(Bearer|Beaber)\s/, "");

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = verificarToken;
