const express = require('express');
const router = express.Router();
const personalidadController = require('../../controllers/adminControllers/adminPersonalidadesController');

router.get("/", personalidadController.getAll);
router.get('/:id', personalidadController.getById);
router.post('/', personalidadController.create);
router.put('/:id', personalidadController.update);
router.delete('/:id', personalidadController.delete);

module.exports = router;