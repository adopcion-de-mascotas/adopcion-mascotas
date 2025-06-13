const express = require('express');
const router = express.Router();
const direccionController = require('../../controllers/adminControllers/adminDireccionesController');
const directionValidator = require('../../validations/directionValidator');

router.get("/", direccionController.getAll);
router.get("/:id", direccionController.getById);
router.post("/", directionValidator, direccionController.create);
router.put("/:id", direccionController.update);
router.delete("/:id", direccionController.delete);

/* Actualiza direccion de refugio */
router.put('/refugio/:refugioId', direccionController.updateDireccionRefugio);

module.exports = router;