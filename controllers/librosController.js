const pool = require('../config/db');

const listar = async (req, res, next) => {
    try {
        const [filas] = await pool.execute(`
            SELECT l.id, l.titulo, l.anio, l.disponible, a.nombre AS autor
            FROM libros l
            LEFT JOIN autores a ON l.autor_id = a.id
        `);
        res.json(filas);
    } catch (error) {
        next(error);
    }
};

module.exports = { listar };