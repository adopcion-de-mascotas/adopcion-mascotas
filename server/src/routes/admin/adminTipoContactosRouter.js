const express = require("express");
const { list } = require("../../controllers/adminControllers/adminTiposContactoControllers");
const router = express.Router()


/* Lista las tipos de contacto */
router.get("/", list)

/* Datos de una tipo de contacto */
router.get("/:id",(req, res) => res.json("Datos de una tipo de contacto"))

/* Agrega tipo de contacto */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de tipo de contacto */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de tipo de contacto */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;