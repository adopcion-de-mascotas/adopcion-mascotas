const express = require("express");
const router = express.Router()

/* Agrega testimonio */
router.post("/", (req, res) => res.json("post"))

/* Edita datos de testimonio */
router.put("/:id", (req, res) => res.json("put"))

/* Elimina datos de testimonio */
router.delete("/:id", (req, res) => res.json("delete"))

module.exports = router;