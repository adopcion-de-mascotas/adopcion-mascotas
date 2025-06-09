const { body } = require('express-validator')

const vacunasValidator = [
    body("nombre")
        .notEmpty()
        .withMessage("Este campo no debe estar vacío")
        .bail()
        .not()
        .isNumeric()
        .withMessage("El nombre no debe ser un número"),
]

module.exports = vacunasValidator