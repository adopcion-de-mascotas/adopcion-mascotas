const { Testimonio } = require("../database/models");
const { CustomError, endpointError } = require("../utils/error");
const { endpointResponse } = require("../utils/success");

module.exports = {
    list: async (req, res) => {
        try {
            const data = await Testimonio.findAll();

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Testimonios encontrados",
                options: {
                    length: data.length
                },
                body: data
            })

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error",
                errors: error.errors
            });
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Testimonio.findByPk(id);

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Testimonio encontrado",
                body: data
            })

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error",
                errors: error.errors
            });
        }
    },
}