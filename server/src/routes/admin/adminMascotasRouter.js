const express = require("express");
const router = express.Router()
const upload = require("../../middlewares/imageMiddleware")
const { create, update } = require("../../controllers/adminControllers/adminMascotasController");

/* Agrega mascota */
router.post("/", upload.single("foto"),create)

/* Edita datos de mascota */
router.put("/:id", upload.single("foto"),update)

/* Elimina datos de mascota */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;