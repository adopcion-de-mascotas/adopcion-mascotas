const { validationResult } = require("express-validator");
const { Direcciones, ContactoRefugio, Refugio } = require("../../database/models");
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');

module.exports = {
    // Obtener todas las direcciones
    getAll: async (req, res) => {
        try {
            const direcciones = await Direcciones.findAll({
                attributes: ['id', 'calle', 'localidad', 'provincia', "pais", 'codigo_postal'],
                order: [['provincia', 'ASC'], ['localidad', 'ASC']]
            });

            endpointResponse({
                res,
                message: 'Listado de direcciones obtenido exitosamente',
                body: direcciones
            });
        } catch (error) {
            endpointError({
                res,
                message: 'Error al obtener las direcciones',
                errors: [error.message]
            });
        }
    },

    // Obtener una dirección por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const direccion = await Direcciones.findByPk(id, {
                include: [{
                    model: Refugio,
                    as: 'refugio',
                    attributes: ['id', 'nombre', 'imagen'],
                    include: [{
                        association: 'contacto',
                        attributes: ["nombre", 'telefono', 'email']
                    }]
                }]
            });

            if (!direccion) {
                throw new CustomError('Dirección no encontrada', 404);
            }

            endpointResponse({
                res,
                message: 'Detalles de la dirección obtenidos exitosamente',
                body: direccion
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al obtener la dirección',
                errors: error.errors || [error.message]
            });
        }
    },
    // Crear una nueva dirección
    create: async (req, res) => {

        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {

            try {
                const { calle, localidad, provincia, pais, codigo_postal, barrio, descripcion } = req.body;

                const nuevaDireccion = await Direcciones.create({
                    calle,
                    barrio: barrio || null,
                    localidad,
                    provincia,
                    pais: pais || 'Argentina',
                    codigo_postal,
                    descripcion: descripcion || null
                });

                endpointResponse({
                    res,
                    code: 201,
                    message: 'Dirección creada exitosamente',
                    body: nuevaDireccion
                });
            } catch (error) {
                endpointError({
                    res,
                    code: error.code || 500,
                    message: error.message || 'Error al crear la dirección',
                    errors: error.errors || [error.message]
                });
            }
        } else {
            endpointError({
                res,
                code: 400,
                message: "Ocurrio un error en el formulario",
                errors: errorsValidator.mapped()
            })
        }
    },

    // Actualizar una dirección existente
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { calle, localidad, provincia, pais, codigo_postal, barrio, descripcion } = req.body;

            const direccion = await Direcciones.findByPk(id);
            if (!direccion) {
                throw new CustomError('Dirección no encontrada', 404);
            }

            // Actualizar solo los campos proporcionados
            const camposActualizables = { calle, localidad, provincia, pais, codigo_postal, barrio, descripcion };
            Object.keys(camposActualizables).forEach(key => {
                if (camposActualizables[key] !== undefined) {
                    direccion[key] = camposActualizables[key];
                }
            });

            await direccion.save();

            endpointResponse({
                res,
                message: 'Dirección actualizada exitosamente',
                body: direccion
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar la dirección',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar una dirección (con validación de uso)
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const direccion = await Direcciones.findByPk(id, {
                include: [{
                    model: Refugio,
                    as: 'refugio'
                }]
            });

            if (!direccion) {
                throw new CustomError('Dirección no encontrada', 404);
            }

            // Verificar si la dirección está en uso por un refugio
            if (direccion.refugio) {
                throw new CustomError('No se puede eliminar: la dirección está asociada a un refugio', 409);
            }

            await direccion.destroy();


            endpointResponse({
                res,
                message: 'Dirección eliminada exitosamente',
                body: { id }
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar la dirección',
                errors: error.errors || [error.message]
            });
        }
    },
    updateDireccionRefugio: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { refugioId } = req.params;
            const direccionData = req.body;

            // 1. Verificar que el refugio existe
            const refugio = await Refugio.findByPk(refugioId, {
                include: ['direccion'],
                transaction
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            // 2. Actualizar o crear dirección
            let direccion;
            if (refugio.direccion) {
                // Actualizar dirección existente
                direccion = await refugio.direccion.update(direccionData, { transaction });
            } else {
                // Crear nueva dirección
                direccion = await Direcciones.create({
                    ...direccionData,
                    pais: direccionData.pais || 'Argentina'
                }, { transaction });

                // Asignar al refugio
                await refugio.update({ direccion_id: direccion.id }, { transaction });
            }

            await transaction.commit();

            // 3. Obtener datos actualizados
            const refugioActualizado = await Refugio.findByPk(refugioId, {
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'localidad', 'provincia', 'codigo_postal']
                    }
                ]
            });

            endpointResponse({
                res,
                message: 'Dirección del refugio actualizada exitosamente',
                body: refugioActualizado
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar la dirección del refugio',
                errors: error.errors || [error.message]
            });
        }
    }
};