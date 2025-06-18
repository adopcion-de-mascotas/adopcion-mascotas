const express = require('express');
const router = express.Router();
const refugioController = require('../../controllers/adminControllers/adminRefugiosController');
const { singleUpload, handleMulterErrors } = require("../../middlewares/imageMiddleware")
const refugioValidator = require('../../validations/refugioValidator');


router.post('/', singleUpload, handleMulterErrors, refugioController.create);
router.put('/:id', refugioValidator, singleUpload, handleMulterErrors, refugioController.update);
router.delete('/:id', refugioController.delete);

module.exports = router;