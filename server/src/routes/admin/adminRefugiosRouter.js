const express = require('express');
const router = express.Router();
const refugioController = require('../../controllers/adminControllers/adminRefugiosController');
const { singleUpload, handleMulterErrors } = require("../../middlewares/refugioMiddleware")
const refugioValidator = require('../../validations/refugioValidator');


router.post('/', singleUpload, handleMulterErrors, refugioController.create);
router.put('/:id', singleUpload, handleMulterErrors, refugioValidator, refugioController.update);
router.delete('/:id', refugioController.delete);


// Nuevas rutas GET
router.get('/', refugioController.getAll);       // Obtener todos los refugios
router.get('/:id', refugioController.getById);   // Obtener refugio por ID

module.exports = router;