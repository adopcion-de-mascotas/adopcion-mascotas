const express = require("express");
const router = express.Router();
const testimonioController = require("../../controllers/adminControllers/adminTestimoniosController");
const upload = require("../../middlewares/multerTestimonios");

/* Agrega testimonio con imagen */
router.post("/", upload.single('foto'), testimonioController.crearTestimonio);

/* Edita datos de testimonio (con imagen opcional) */
router.put("/:id", upload.single('foto'), testimonioController.actualizarTestimonio);

/* Elimina datos de testimonio */
router.delete("/:id", testimonioController.eliminarTestimonio);

module.exports = router;