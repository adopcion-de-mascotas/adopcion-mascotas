const endpointError = ({ res, code = 500, message = 'Error interno del servidor', errors = [] }) => {
    return res.status(code).json({
        status: false,
        message,
        errors,
    });
};

class CustomError extends Error {
    constructor(message, code = 500, errors = []) {
        super(message);
        this.code = code;
        this.errors = errors;
    }
}

module.exports = { endpointError, CustomError };
