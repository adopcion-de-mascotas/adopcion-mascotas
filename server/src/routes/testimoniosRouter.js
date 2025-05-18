const express = require("express");
const router = express.Router()

/* Lista las testimonios */
router.get("/", (req, res) => res.json("Lista de testimonios"))

/* Datos de una testimonio */
router.get("/:id", (req, res) => res.json("Datos de una testimonio"))


module.exports = router;