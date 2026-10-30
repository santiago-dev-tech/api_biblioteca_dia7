const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
    const encabezado = req.headers.authorization;
    if (!encabezado) return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido.' });

    const token = encabezado.split(' ')[1];
    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = autenticar;