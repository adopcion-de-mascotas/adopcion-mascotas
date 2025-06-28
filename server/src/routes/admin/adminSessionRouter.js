const express = require("express");
const router = express.Router()
const sessionValidator = require("../../validations/sessionValidator");
const loginValidator = require("../../validations/loginAdminValidator");

/* Importar el controlador */
const adminLoginController = require("../../controllers/adminControllers/adminLoginController");

router.get("/:id", adminLoginController.getAdmin)

/* Iniciar sesión */
router.post("/", loginValidator, adminLoginController.login)

/* Crear Admin */
router.post("/create", sessionValidator, adminLoginController.createAdmin)

/* Editar Admin */
router.put("/:id", sessionValidator, adminLoginController.editAdmin)

module.exports = router;