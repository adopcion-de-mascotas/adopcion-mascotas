const express = require("express");
const router = express.Router()

const adminMascotasRouter = require("./adminMascotasRouter")
const adminTestimoniosRouter = require("./adminTestimoniosRouter")
const adminNoticiasRouter = require("./adminNoticiasRouter")
const adminContactosRouter = require("./adminContactosRouter")
const adminComportamientos = require("./adminComportamientos")
const adminDireccionesRouter = require("./adminDireccionesRouter")
const adminSessionRouter = require("./adminSessionRouter")
const adminVacunasRouter = require("./adminVacunasRouter")

router.use("/session", adminSessionRouter)


router.use("/mascotas", adminMascotasRouter)
router.use("/testimonios", adminNoticiasRouter)
router.use("/noticias", adminTestimoniosRouter)
router.use("/contactos", adminContactosRouter)
router.use("/comportamientos", adminComportamientos)
router.use("/direcciones", adminDireccionesRouter)
router.use("/vacunas", adminVacunasRouter)


module.exports = router;