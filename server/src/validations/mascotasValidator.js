const { check,  } = require('express-validator')

const mascotaValidator = [
    check("nombre").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("edad").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("tipo").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("raza").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("genero").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("tamanio").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("peso").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("estado").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("ciudad").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("descripcion").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
    check("historia").notEmpty().not().isNumeric().withMessage("Este campo no debe estar vacío").bail(),
]

module.exports = mascotaValidator