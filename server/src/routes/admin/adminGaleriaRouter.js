const express = require('express');
const router = express.Router();
const galeriaController = require('../../controllers/adminControllers/adminGaleriaController');
const { multiUpload, handleMulterErrors } = require("../../middlewares/imageMiddleware");

// Obtener galería de mascota
router.get('/mascota/:mascotaId', galeriaController.getByMascota);

// Agregar foto a galería
router.post('/mascota/:mascotaId', multiUpload, handleMulterErrors, galeriaController.create);

// Eliminar foto
router.delete('/:id', galeriaController.delete);

module.exports = router;