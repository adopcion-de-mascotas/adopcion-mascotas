const { Comportamiento } = require("../../database/models")
const { endpointError, CustomError } = require("../../utils/error")
const { endpointResponse } = require("../../utils/success")

module.exports = {
    list: async (req, res) => {
        try {
            const data = await Comportamiento.findAll();

            if (!data) {
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
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await Comportamiento.findByPk(id);

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

    create: async (req, res) => {
        const {
            niños,
            perros,
            gatos,
            apartamento
        } = req.body;

        try {

            const nuevoComportamiento = await Comportamiento.create({
                niños,
                perros,
                gatos,
                apartamento
            });

            endpointResponse({
                res,
                code: 201,
                status: true,
                message: "Mascota creada correctamente",
                body: nuevoComportamiento
            });

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error",
                errors: error.errors
            });
        }

    },

    update: async (req, res) => {
        const {
            niños,
            perros,
            gatos,
            apartamento
        } = req.body;

        const { id } = req.params

        try {
            const comportamiento = await Comportamiento.findByPk(id);

            if (!comportamiento) {
                throw CustomError("Comportamiento no encontrada", 404);
            }

            const comportamientoUpdated = await comportamiento.update({
                niños,
                perros,
                gatos,
                apartamento
            }
        );

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Comportamiento actualizada correctamente",
                body: comportamientoUpdated
            });

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error al actualizar la mascota",
                errors: error.errors
            });
        }
    },
    
}