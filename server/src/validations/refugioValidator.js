const { body } = require('express-validator')

const refugioValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio.").bail()
        .isString().withMessage("El nombre debe ser un texto.").bail()
        .isLength({ max: 255 }).withMessage("El nombre no puede superar los 255 caracteres."),

    body("descripcion")
        .notEmpty().withMessage("La descripción es obligatoria.").bail()
        .isString().withMessage("La descripción debe ser un texto.").bail()
        .isLength({ max: 1000 }).withMessage("La descripción no puede superar los 1000 caracteres."),

    body("info")
        .notEmpty().withMessage("La información adicional es obligatoria.").bail()
        .isString().withMessage("La información adicional debe ser un texto.").bail()
        .isLength({ max: 1000 }).withMessage("La información adicional no puede superar los 1000 caracteres."),

]

module.exports = refugioValidator