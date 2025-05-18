const express = require("express");
const router = express.Router()

/* Agrega mascota */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de mascota */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de mascota */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;