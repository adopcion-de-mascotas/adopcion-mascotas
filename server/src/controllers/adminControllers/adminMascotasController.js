const { Mascota } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");

module.exports = {
    create: async (req, res) => {
        const {
            nombre,
            edad,
            tipo,
            raza,
            genero,
            tamanio,
            peso,
            esterelizado,
            estado,
            ciudad,
            descripcion,
            historia,
            imagen_principal,
            liked = false,
            likes = 0,
            comportamientoId,
            refugioId,
            saludId
        } = req.body;

        try {
            const nuevaMascota = await Mascota.create({
                nombre,
                edad,
                tipo,
                raza,
                genero,
                tamanio,
                peso,
                esterelizado,
                estado,
                ciudad,
                descripcion,
                historia,
                imagen_principal,
                liked,
                likes,
                comportamientoId,
                refugioId: refugioId,
                saludId: saludId
            });

            endpointResponse({
                res,
                code: 201,
                status: true,
                message: "Mascota creada correctamente",
                body: nuevaMascota
            });

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error al crear la mascota",
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
            genero,
            tamanio,
            peso,
            esterelizado,
            estado,
            ciudad,
            descripcion,
            historia,
            imagen_principal,
            liked,
            likes,
            comportamientoId,
            refugioId,
            saludId
        } = req.body;

        try {
            const mascota = await Mascota.findByPk(req.params.id);

            if (!mascota) {
                throw CustomError("Mascota no encontrada", 404);
            }

            const mascotaUpdated = await mascota.update({
                nombre,
                edad,
                tipo,
                raza,
                genero,
                tamanio,
                peso,
                esterelizado,
                estado,
                ciudad,
                descripcion,
                historia,
                imagen_principal,
                liked,
                likes,
                comportamientoId,
                refugioId: refugioId,
                saludId: saludId
            });

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascota actualizada correctamente",
                body: mascotaUpdated
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

    remove: async (req, res) => {
        const { id } = req.params;

        try {
            const mascota = await Mascota.findByPk(id);

            if (!mascota) {
                throw new CustomError("Mascota no encontrada", 404);
            }

            await mascota.destroy();

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascota eliminada correctamente",
                body: { id }
            });

        } catch (error) {
            endpointError({
                res,
                code: 400,
                message: error.message || "Ocurrió un error al eliminar la mascota",
                errors: error.errors
            });
        }
    }
}
