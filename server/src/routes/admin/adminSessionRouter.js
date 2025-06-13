const express = require("express");
const router = express.Router()

/* Importar el controlador */
const adminLoginController = require("../../controllers/adminControllers/adminLoginController");
const loginValidator = require("../../validations/loginAdminValidator");

/* Iniciar sesión */
router.post("/", loginValidator, adminLoginController.login)

/* Crear Admin */
router.post("/create", adminLoginController.createAdmin)

module.exports = router;