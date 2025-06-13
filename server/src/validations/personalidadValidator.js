const { body } = require('express-validator')

const personalidadValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio.").bail()
        .isString().withMessage("El nombre debe ser un texto.").bail()
        .isLength({ max: 255 }).withMessage("El nombre no puede superar los 255 caracteres."),

]

module.exports = personalidadValidator