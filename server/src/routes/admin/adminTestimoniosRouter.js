const express = require("express");
const router = express.Router();
const testimonioController = require("../../controllers/adminControllers/adminTestimoniosController");
const { handleMulterErrors, singleUpload } = require('../../middlewares/imageMiddleware')
const testimoniosValidator = require("../../validations/testimoniosValidator");

/* Agrega testimonio con imagen */
router.post("/", testimoniosValidator, singleUpload, handleMulterErrors, testimonioController.crearTestimonio);

/* Edita datos de testimonio (con imagen opcional) */
router.put("/:id", testimoniosValidator, handleMulterErrors, testimonioController.actualizarTestimonio);

/* Elimina datos de testimonio */
router.delete("/:id", testimonioController.eliminarTestimonio);

module.exports = router;