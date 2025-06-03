const express = require('express');
const router = express.Router();
const saludController = require('../../controllers/adminControllers/adminSaludController');

// CRUD básico
router.post('/', saludController.create);
router.put('/:id', saludController.update);
router.delete('/:id', saludController.delete);

// Gestión de vacunas
router.post('/:id/vacunas', saludController.addVacunas);

module.exports = router;