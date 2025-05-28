const { Noticias } = require("../database/models");
const { CustomError, endpointError } = require("../utils/error");
const { endpointResponse } = require("../utils/success");

module.exports = {
    list: async (req, res) => {
        try {
            const data = await Noticias.findAll();

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Noticias encontradas",
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
            const data = await Noticias.findByPk(id);

            if (!data) {
                throw new CustomError("Ocurrió un error", 500)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Noticia encontrada",
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