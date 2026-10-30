require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const manejadorErrores = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Documentación Swagger
try {
    const documentacion = YAML.load('./swagger.yaml');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentacion));
} catch (error) {
    console.log('No se pudo cargar swagger.yaml', error.message);
}

// Endpoint de estado
app.get('/', (req, res) => {
    res.json({ estado: 'API Biblioteca activa y en línea 🚀', fecha: new Date() });
});

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/libros', require('./routes/libros'));

// Middleware centralizado de errores
app.use(manejadorErrores);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor de producción escuchando en el puerto ${PUERTO}`);
});