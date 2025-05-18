const express = require("express");
const router = express.Router()

const adminMascotasRouter = require("./adminMascotasRouter")
const adminTestimoniosRouter = require("./adminTestimoniosRouter")
const adminNoticiasRouter = require("./adminNoticiasRouter")
const adminContactosRouter = require("./adminContactosRouter")
const adminTipoContactosRouter = require("./adminTipoContactosRouter")
const adminDireccionesRouter = require("./adminDireccionesRouter")

/* Ruta de  mascotas */
router.use("/mascotas", adminMascotasRouter)
router.use("/testimonios", adminNoticiasRouter)
router.use("/noticias", adminTestimoniosRouter)
router.use("/contactos", adminContactosRouter)
router.use("/tipos-contacto", adminTipoContactosRouter)
router.use("/direcciones", adminDireccionesRouter)


module.exports = router;