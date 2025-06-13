const { check } = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = loginValidator;
