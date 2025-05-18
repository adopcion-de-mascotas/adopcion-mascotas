const express = require("express");
const router = express.Router()


/* Lista las direcciones */
router.get("/", (req, res) => res.json("Lista de direcciones"))

/* Datos de una direccion */
router.get("/:id",(req, res) => res.json("Datos de una direccion"))

/* Agrega direccion */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de direccion */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de direccion */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;