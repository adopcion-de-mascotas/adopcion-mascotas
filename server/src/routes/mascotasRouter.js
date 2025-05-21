const express = require("express");
const { list, detail } = require("../controllers/mascotasController");
const router = express.Router()

/* Lista las mascotas */
router.get("/", list)

/* Datos de una mascota */
router.get("/:id", detail)


module.exports = router;