const express = require('express');
const router = express.Router();
const vacunaController = require('../../controllers/adminControllers/adminVacunasController');

// Obtener todas las vacunas (con opción de búsqueda)
router.get('/', vacunaController.getAll);

// Crear nueva vacuna
router.post('/', vacunaController.create);

module.exports = router;