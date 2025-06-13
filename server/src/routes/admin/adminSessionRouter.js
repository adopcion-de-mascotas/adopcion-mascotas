const express = require("express");
const router = express.Router()
const sessionValidator = require("../../validations/sessionValidator");
const loginValidator = require("../../validations/loginAdminValidator");

/* Importar el controlador */
const adminLoginController = require("../../controllers/adminControllers/adminLoginController");

/* Iniciar sesión */
router.post("/", loginValidator, adminLoginController.login)

/* Crear Admin */
router.post("/create", sessionValidator, adminLoginController.createAdmin)

module.exports = router;