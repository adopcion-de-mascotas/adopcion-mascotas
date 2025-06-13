const { check } = require("express-validator");

const directionValidator = [
    check("calle")
        .notEmpty().withMessage("La calle es obligatoria"),

    check("localidad")
        .notEmpty().withMessage("La localidad es obligatoria"),

    check("provincia")
        .notEmpty().withMessage("La provincia es obligatoria"),

    check("pais")
        .notEmpty().withMessage("El país es obligatorio"),

    check("codigo_postal")
        .notEmpty().withMessage("El código postal es obligatorio")
        .isPostalCode('any').withMessage("Debe ser un código postal válido")
];

module.exports = directionValidator;
