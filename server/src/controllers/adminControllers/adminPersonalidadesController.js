const { Personalidad, Mascota } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");

module.exports = {
    // Obtener todas las personalidades
    getAll: async (req, res) => {
        try {
            const personalidades = await Personalidad.findAll({
                attributes: ['id', 'nombre'],
                order: [['nombre', 'ASC']],
/*                 include: [{
                    model: Mascota,
                    as: 'mascotas',
                    attributes: ['id', 'nombre'],
                    through: { attributes: [] } // Excluir datos de la tabla de unión
                }] */
            });

            endpointResponse({
                res,
                message: 'Listado de personalidades obtenido exitosamente',
                body: personalidades
            });
        } catch (error) {
            endpointError({
                res,
                message: 'Error al obtener las personalidades',
                errors: [error.message]
            });
        }
    },

    // Obtener una personalidad por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const personalidad = await Personalidad.findByPk(id, {
                attributes: ['id', 'nombre'],
/*                 include: [{
                    model: Mascota,
                    as: 'mascotas',
                    attributes: ['id', 'nombre', 'imagen_principal'],
                    through: { attributes: [] }
                }] */
            });

            if (!personalidad) {
                throw new CustomError('Personalidad no encontrada', 404);
            }

            endpointResponse({
                res,
                message: 'Detalles de la personalidad obtenidos exitosamente',
                body: personalidad
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al obtener la personalidad',
                errors: error.errors || [error.message]
            });
        }
    },

    // Crear una nueva personalidad
    create: async (req, res) => {
        try {
            const { nombre } = req.body;

            if (!nombre) {
                throw new CustomError('El campo nombre es obligatorio', 400);
            }

            // Verificar si ya existe una personalidad con ese nombre
            const personalidadExistente = await Personalidad.findOne({ where: { nombre } });
            if (personalidadExistente) {
                throw new CustomError('Ya existe una personalidad con ese nombre', 409);
            }

            const nuevaPersonalidad = await Personalidad.create({ nombre });

            endpointResponse({
                res,
                code: 201,
                message: 'Personalidad creada exitosamente',
                body: nuevaPersonalidad
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al crear la personalidad',
                errors: error.errors || [error.message]
            });
        }
    },

    // Actualizar una personalidad existente
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;

            if (!nombre) {
                throw new CustomError('El campo nombre es obligatorio', 400);
            }

            const personalidad = await Personalidad.findByPk(id);
            if (!personalidad) {
                throw new CustomError('Personalidad no encontrada', 404);
            }

            // Verificar si el nuevo nombre ya existe (excluyendo la actual)
            const nombreExistente = await Personalidad.findOne({
                where: {
                    nombre,
                    id: { [Op.ne]: id } // Excluir la personalidad actual
                }
            });
            if (nombreExistente) {
                throw new CustomError('Ya existe otra personalidad con ese nombre', 409);
            }

            await personalidad.update({ nombre });

            endpointResponse({
                res,
                message: 'Personalidad actualizada exitosamente',
                body: personalidad
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar la personalidad',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar una personalidad
    delete: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            const personalidad = await Personalidad.findByPk(id, {
                include: [{
                    model: Mascota,
                    as: 'mascotas',
                    attributes: ['id'],
                    through: { attributes: [] }
                }],
                transaction
            });

            if (!personalidad) {
                throw new CustomError('Personalidad no encontrada', 404);
            }

            // Verificar si está asociada a alguna mascota
            if (personalidad.mascotas && personalidad.mascotas.length > 0) {
                throw new CustomError('No se puede eliminar: la personalidad está asociada a mascotas', 409);
            }

            await personalidad.destroy({ transaction });
            await transaction.commit();

            endpointResponse({
                res,
                message: 'Personalidad eliminada exitosamente',
                body: { id }
            });
        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar la personalidad',
                errors: error.errors || [error.message]
            });
        }
    }
};