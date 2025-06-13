const express = require('express');
const router = express.Router();
const personalidadController = require('../../controllers/adminControllers/adminPersonalidadesController');
const personalidadValidator = require('../../validations/personalidadValidator');

router.get("/", personalidadController.getAll);
router.get('/:id', personalidadController.getById);
router.post('/', personalidadValidator, personalidadController.create);
router.put('/:id', personalidadValidator, personalidadController.update);
router.delete('/:id', personalidadController.delete);

module.exports = router;