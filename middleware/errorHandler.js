const manejadorErrores = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        mensaje: err.message || 'Error interno del servidor'
    });
};

module.exports = manejadorErrores;