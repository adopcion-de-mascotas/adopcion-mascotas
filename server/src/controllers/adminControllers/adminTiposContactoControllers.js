const { TipoContactos } = require("../../database/models")
const { endpointError, CustomError } = require("../../utils/error")
const { endpointResponse } = require("../../utils/success")

module.exports = {
    list: async (req, res) => {
        try {
            const data = await TipoContactos.findAll();

            if(!data) {
                throw new CustomError("No se encontraron datos", 404)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Lista de tipos de contacto",
                body: data,
                options: {
                    length: data.length
                }
            })

        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || "Error al obtener los tipos de contacto",
                errors: error.errors || [error.message],
            });
        }
    }
}