const { body } = require('express-validator')

const saludValidator = [
    body("estado")
        .notEmpty().withMessage("El estado es obligatorio.").bail()
        .isString().withMessage("El estado debe ser un texto.").bail()
        .isLength({ max: 255 }).withMessage("El estado no puede superar los 255 caracteres."),

    body("tratamiento")
        .notEmpty().withMessage("El tratamiento es obligatorio.").bail()
        .isString().withMessage("El tratamiento debe ser un texto.").bail(),

    body("info_veterinaria")
        .notEmpty().withMessage("La información veterinaria es obligatoria.").bail()
        .isString().withMessage("La información veterinaria debe ser un texto.").bail()
        .isLength({ max: 500 }).withMessage("La información veterinaria no puede superar los 500 caracteres."),
]

module.exports = saludValidator