const express = require("express");
const router = express.Router();
const testimonioController = require("../../controllers/adminControllers/adminTestimoniosController");
const { handleMulterErrors, singleUpload } = require('../../middlewares/imageMiddleware')
const upload = require('../../middlewares/multerTestimonios')
const testimoniosValidator = require("../../validations/testimoniosValidator");

/* Agrega testimonio con imagen */
router.post("/", upload.single('foto'), handleMulterErrors, testimonioController.crearTestimonio);

/* Edita datos de testimonio (con imagen opcional) */
router.put("/:id", upload.single('foto'), handleMulterErrors, testimonioController.actualizarTestimonio);

/* Elimina datos de testimonio */
router.delete("/:id", testimonioController.eliminarTestimonio);

module.exports = router;