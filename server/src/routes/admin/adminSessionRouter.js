const express = require("express");
const router = express.Router()

/* Importar el controlador */
const adminLoginController = require("../../controllers/adminControllers/adminLoginController")

/* Iniciar sesión */
router.post("/", adminLoginController.login)

/* Crear Admin */
router.post("/create", adminLoginController.createAdmin)

module.exports = router;