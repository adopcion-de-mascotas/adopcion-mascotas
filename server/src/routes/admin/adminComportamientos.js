const express = require("express");
const router = express.Router()
const {
    list,
    getOne,
    create,
    update
} = require("../../controllers/adminControllers/adminComportamientosController")


/* Lista las tipos de comportamiento */
router.get("/", list)

/* Datos de una tipo de comportamiento */
router.get("/:id", getOne)

/* Agrega tipo de comportamiento */
router.post("/", create)

/* Edita datos de tipo de comportamiento */
router.put("/:id", update)

/* Elimina datos de tipo de comportamiento */
router.delete("/:id", (req, res) => res.json("delete comportamiento"))

module.exports = router;