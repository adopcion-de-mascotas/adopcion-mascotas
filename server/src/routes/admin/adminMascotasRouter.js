const express = require("express");
const router = express.Router()
const { singleUpload, handleMulterErrors } = require("../../middlewares/imageMiddleware")
const { create, update, remove } = require("../../controllers/adminControllers/adminMascotasController");

/* Agrega mascota */
router.post("/", singleUpload, handleMulterErrors, create)

/* Edita datos de mascota */
router.put("/:id", singleUpload, handleMulterErrors, update)

/* Elimina datos de mascota */
router.delete("/:id", remove)

module.exports = router;