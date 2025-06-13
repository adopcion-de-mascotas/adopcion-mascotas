const { check } = require("express-validator");

const contactoValidator = [
    check("telefono")
        .notEmpty().withMessage("El teléfono es obligatorio")
        .isMobilePhone().withMessage("Debe ser un número de teléfono válido"),

    check("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido"),

    check("web")
        .optional({ checkFalsy: true })
        .isURL().withMessage("Debe ser una URL válida"),

    check("refugio_id")
        .notEmpty().withMessage("El refugio es obligatorio")
        .isInt().withMessage("Debe ser un ID numérico válido"),

    check("direccion_id")
        .notEmpty().withMessage("La dirección es obligatoria")
        .isInt().withMessage("Debe ser un ID numérico válido")
];

module.exports = contactoValidator;
