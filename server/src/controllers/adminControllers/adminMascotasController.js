const { Mascotas } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");

module.exports = {
    create: async (req, res) => {
        const { 
            nombre,
            edad,
            tipo,
            raza,
            tamaño,
            descripcion
        } = req.body;


        try {

            const data = await Mascotas.create({
                nombre,
                edad,
                tipo,
                raza,
                tamaño,
                descripcion,
                estado: true
            })

            if(!data) {
                throw CustomError("Ocurrió un erro inesperado", 500)
            }

            endpointResponse({
                res,
                code: 201,
                status: true,
                message: "Datos insertados correctamente",
                body : data
            })


        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrio un error",
                errors: error.errors
            })
        }

    }
}