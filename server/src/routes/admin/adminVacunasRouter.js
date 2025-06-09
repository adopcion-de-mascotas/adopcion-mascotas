const express = require('express');
const router = express.Router();
const vacunaController = require('../../controllers/adminControllers/adminVacunasController');
const vacunasValidator = require('../../validations/vacunasValidator');

// Obtener todas las vacunas (con opción de búsqueda)
router.get('/', vacunaController.getAll);

// Crear nueva vacuna
router.post('/', vacunasValidator, vacunaController.create);

module.exports = router;