const express = require('express');
const router = express.Router();
const saludController = require('../../controllers/adminControllers/adminSaludController');

const saludValidator = require('../../validations/saludValidator');

// CRUD básico
router.post('/', saludValidator, saludController.create);
router.put('/:id', saludController.update);
router.delete('/:id', saludController.delete);

// Gestión de vacunas
router.post('/:id/vacunas', saludController.addVacunas);

module.exports = router;