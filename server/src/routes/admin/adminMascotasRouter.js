const express = require("express");
const router = express.Router()
const upload = require("../../middlewares/imageMiddleware")
const { create, update, remove } = require("../../controllers/adminControllers/adminMascotasController");

/* Agrega mascota */
router.post("/", upload.single("foto"), create)

/* Edita datos de mascota */
router.put("/:id", upload.single("foto"), update)

/* Elimina datos de mascota */
router.delete("/:id", remove)

/* Agrega mas fotos para la galeria */
router.post('/:id/fotos', (req, res) => res.json("galeria post"));

module.exports = router;