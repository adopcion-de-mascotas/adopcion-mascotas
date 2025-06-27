const { body } = require('express-validator')

const sessionValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio.").bail()
        .isString().withMessage("El nombre debe ser un texto.").bail()
        .isLength({ max: 255 }).withMessage("El nombre no puede superar los 255 caracteres."),

    body("apellido")
        .notEmpty().withMessage("El apellido es obligatorio.").bail()
        .isString().withMessage("El apellido debe ser un texto.").bail()
        .isLength({ max: 255 }).withMessage("El apellido no puede superar los 255 caracteres."),

    body("email")
        .notEmpty().withMessage("El email es obligatorio.").bail()
        .isEmail().withMessage("El email debe ser un texto con formato de email.").bail()
        .isLength({ max: 255 }).withMessage("El email no puede superar los 255 caracteres.")
        .normalizeEmail(),
]

module.exports = sessionValidator