const { body } = require('express-validator')

const mascotaValidator = [
    body("nombre").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("edad").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("tipo").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("raza").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("genero").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("tamanio").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("peso").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("estado").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("ciudad").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("descripcion").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    body("historia").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
]

module.exports = mascotaValidator