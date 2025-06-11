const { body } = require('express-validator')

const testimonioValidatorCrear = [
    body("comentario")
        .notEmpty().withMessage("Este campo no debe estar vacío").bail()
        .isLength({ max: 500 }).withMessage('El comentario no puede tener mas de 500 caracteres').bail(),

    body("autor")
        .notEmpty().withMessage('El autor es obligatorio.').bail()
        .isString().withMessage('El autor debe ser un texto.')
        .isLength({ max: 255 }).withMessage('El autor no puede superar los 255 caracteres.'),

    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria.').bail()
        .isISO8601().withMessage('La fecha debe estar en formato válido (ISO8601).'),

    body('foto')
        .optional()
        .isString().withMessage('La URL de la foto debe ser un texto.').bail()
        .isLength({ max: 500 }).withMessage('La URL de la foto no puede superar los 500 caracteres.').bail()
        .isURL().withMessage('La foto debe ser una URL válida.'),
]

module.exports = testimonioValidatorCrear