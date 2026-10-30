const express = require('express');
const { listar } = require('../controllers/librosController');
const router = express.Router();

router.get('/', listar);

module.exports = router;