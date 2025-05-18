const express = require("express");
const router = express.Router()


/* Lista los contactos */
router.get("/", (req, res) => res.json("Lista de contacto"))

/* Datos de una contacto */
router.get("/:id",(req, res) => res.json("Datos de una contacto"))

/* Agrega contacto */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de contacto */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de contacto */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;