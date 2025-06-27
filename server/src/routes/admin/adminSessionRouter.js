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

/* Editar Admin */
router.put("/:id", sessionValidator, adminLoginController.editAdmin)

router.get("/:id", sessionValidator, adminLoginController.getDataAdmin)

module.exports = router;