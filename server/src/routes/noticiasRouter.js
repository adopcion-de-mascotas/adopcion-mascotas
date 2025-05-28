const express = require("express");
const { list, getOne } = require("../controllers/noticiasController");
const router = express.Router()

/* Lista las noticias */
router.get("/", list)

/* Datos de una noticia */
router.get("/:id", getOne)


module.exports = router;