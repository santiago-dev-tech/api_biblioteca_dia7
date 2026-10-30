const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrar = async (req, res, next) => {
    const { nombre, correo, clave } = req.body;
    if (!nombre || !correo || !clave) return res.status(400).json({ mensaje: 'Campos incompletos' });

    try {
        const claveEncriptada = await bcrypt.hash(clave, 10);
        await pool.execute('INSERT INTO usuarios (nombre, correo, clave) VALUES (?, ?, ?)', [nombre, correo, claveEncriptada]);
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { correo, clave } = req.body;
    try {
        const [usuarios] = await pool.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (usuarios.length === 0) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

        const usuario = usuarios[0];
        const claveValida = await bcrypt.compare(clave, usuario.clave);
        if (!claveValida) return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET || 'secreto_temporal',
            { expiresIn: '2h' }
        );

        res.json({ mensaje: 'Autenticación exitosa', token });
    } catch (error) {
        next(error);
    }
};

module.exports = { registrar, login };