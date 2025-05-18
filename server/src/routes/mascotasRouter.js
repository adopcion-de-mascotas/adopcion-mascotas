const express = require("express");
const router = express.Router()

/* Lista las mascotas */
router.get("/", (req, res) => res.json("Lista de mascotas"))

/* Datos de una mascota */
router.get("/:id",(req, res) => res.json("Datos de una mascota"))


module.exports = router;