const express = require("express");
const { list, getOne } = require("../controllers/testimoniosController");
const router = express.Router()

/* Lista las testimonios */
router.get("/", list)

/* Datos de una testimonio */
router.get("/:id", getOne)


module.exports = router;