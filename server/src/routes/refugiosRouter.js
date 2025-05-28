const express = require("express");
const { list, getOne } = require("../controllers/refugiosController");
const router = express.Router()

/* Lista las refugio */
router.get("/", list)

/* Datos de un refugio */
router.get("/:id", getOne)


module.exports = router;