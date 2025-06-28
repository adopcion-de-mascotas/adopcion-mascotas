const express = require("express");
const router = express.Router()
const { singleUpload, handleMulterErrors } = require("../../middlewares/imageMiddleware")
const { create, update, remove } = require("../../controllers/adminControllers/adminMascotasController");
const adminGaleriaRouter = require("./adminGaleriaRouter")
const mascotaValidator = require("../../validations/mascotasValidator")

/* Engloba las rutas para agregar mas fotos de una mascota */
router.use("/galeria", adminGaleriaRouter)

/* Agrega mascota */
router.post("/", singleUpload, handleMulterErrors, create)

/* Edita datos de mascota */
router.put("/:id", singleUpload, handleMulterErrors, update)

/* Elimina datos de mascota */
router.delete("/:id", remove)

module.exports = router;