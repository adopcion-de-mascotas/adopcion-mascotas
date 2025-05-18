const express = require("express");
const router = express.Router()

/* Lista las noticias */
router.get("/", (req, res) => res.json("Lista de noticias"))

/* Datos de una noticia */
router.get("/:id",(req, res) => res.json("Datos de una noticia"))


module.exports = router;