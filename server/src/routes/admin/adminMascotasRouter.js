const express = require("express");
const { create } = require("../../controllers/adminControllers/adminMascotasController");
const router = express.Router()

/* Agrega mascota */
router.post("/", create)

/* Edita datos de mascota */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de mascota */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;