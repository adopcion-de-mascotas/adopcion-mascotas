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

        const foto = req.file ? `/images/${req.file.filename}` : null;

        try {
            const data = await Mascotas.create({
                nombre,
                edad,
                tipo,
                raza,
                tamaño,
                descripcion,
                foto,
                estado: true
            });

            if (!data) {
                throw CustomError("Ocurrió un error inesperado", 500);
            }

            endpointResponse({
                res,
                code: 201,
                status: true,
                message: "Datos insertados correctamente",
                body: data
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
            nombre,
            edad,
            tipo,
            raza,
            tamaño,
            descripcion
        } = req.body;

        const foto = req.file ? `/images/${req.file.filename}` : null;

        try {
            const mascota = await Mascotas.findByPk(req.params.id);
            if (!mascota) {
                throw CustomError("Mascota no encontrada", 404);
            }

            await mascota.update({
                nombre,
                edad,
                tipo,
                raza,
                tamaño,
                descripcion,
                ...(foto && { foto }) // Solo actualiza si hay nueva imagen
            });

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Datos actualizados correctamente",
                body: mascota
            });

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error",
                errors: error.errors
            });
        }
    }
}
