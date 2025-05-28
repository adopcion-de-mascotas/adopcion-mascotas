const { Refugio } = require("../database/models");
const { CustomError, endpointError } = require("../utils/error");
const { endpointResponse } = require("../utils/success");

module.exports = {
    list: async (req, res) => {
        try {
            const data = await Refugio.findAll();

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Refugios encontrados",
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
            const data = await Refugio.findByPk(id);

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Refugio encontrado",
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