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
const adminRefugiosRouter = require("./adminRefugiosRouter")
const adminPersonalidadRouter = require("./adminPersonalidadRouter")
const adminSaludRouter = require("./adminSaludRouter")

router.use("/session", adminSessionRouter)


/* Ruta de  mascotas */
router.use("/mascotas", verificarToken, adminMascotasRouter)
router.use("/noticias", verificarToken, adminNoticiasRouter)
router.use("/testimonios", verificarToken, adminTestimoniosRouter)
router.use("/contactos", verificarToken, adminContactosRouter)
router.use("/comportamientos", verificarToken,  adminComportamientos)
router.use("/direcciones", verificarToken, adminDireccionesRouter)
router.use("/session", adminSessionRouter)
router.use("/refugios", verificarToken, adminRefugiosRouter)
router.use("/vacunas", verificarToken, adminVacunasRouter)
router.use("/personalidades", verificarToken, adminPersonalidadRouter)
router.use("/salud", verificarToken, adminSaludRouter)

module.exports = router;