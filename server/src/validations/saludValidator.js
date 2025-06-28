const { body, check } = require('express-validator')

const saludValidator = [
    check("estado")
        .notEmpty().withMessage("El estado es obligatorio.").bail()
        .isLength({ max: 255 }).withMessage("El estado no puede superar los 255 caracteres."),

    check("tratamiento")
        .notEmpty().withMessage("El tratamiento es obligatorio.").bail()
        .isString().withMessage("El tratamiento debe ser un texto.").bail(),

    check("info_veterinaria")
        .notEmpty().withMessage("La información veterinaria es obligatoria.").bail()
        .isLength({ max: 500 }).withMessage("La información veterinaria no puede superar los 500 caracteres."),
]

module.exports = saludValidator