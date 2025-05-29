const express = require("express");
const router = express.Router()
const verificarToken = require("../../middlewares/verificarToken")

const adminMascotasRouter = require("./adminMascotasRouter")
const adminTestimoniosRouter = require("./adminTestimoniosRouter")
const adminNoticiasRouter = require("./adminNoticiasRouter")
const adminContactosRouter = require("./adminContactosRouter")
const adminComportamientos = require("./adminComportamientos")
const adminDireccionesRouter = require("./adminDireccionesRouter")
const adminSessionRouter = require("./adminSessionRouter")
const adminVacunasRouter = require("./adminVacunasRouter")

router.use("/session", adminSessionRouter)


/* Ruta de  mascotas */
router.use("/mascotas",verificarToken , adminMascotasRouter)
router.use("/testimonios",verificarToken, adminNoticiasRouter)
router.use("/noticias",verificarToken, adminTestimoniosRouter)
router.use("/contactos",verificarToken, adminContactosRouter)
router.use("/tipos-contacto",verificarToken, adminTipoContactosRouter)
router.use("/direcciones",verificarToken, adminDireccionesRouter)
router.use("/session", adminSessionRouter)


module.exports = router;