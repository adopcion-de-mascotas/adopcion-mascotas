const express = require("express");
const router = express.Router()

/* Agrega noticia */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de noticia */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de noticia */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;