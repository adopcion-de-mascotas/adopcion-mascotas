const { Refugio, Direcciones, Mascota, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');
const { Op } = require('sequelize');

module.exports = {
    // Crear refugio con dirección (en un solo paso)
    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { nombre, descripcion, info, imagen, direccion } = req.body;

            // 1. Validaciones básicas del refugio
            if (!nombre || !descripcion) {
                throw new CustomError('Nombre y descripción son campos obligatorios', 400);
            }

            // 2. Crear la dirección primero
            const nuevaDireccion = await Direcciones.create({
                calle: direccion.calle,
                barrio: direccion.barrio,
                localidad: direccion.localidad,
                provincia: direccion.provincia,
                pais: direccion.pais || 'Argentina',
                codigo_postal: direccion.codigo_postal,
                descripcion: direccion.descripcion || null
            }, { transaction });

            // 3. Crear el refugio con la dirección
            const nuevoRefugio = await Refugio.create({
                nombre,
                descripcion,
                info: info || null,
                imagen: imagen || null,
                direccion_id: nuevaDireccion.id
            }, { transaction });

            await transaction.commit();

            // 4. Obtener el refugio creado con relaciones
            const refugioCompleto = await Refugio.findByPk(nuevoRefugio.id, {
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'localidad', 'provincia']
                    }
                ]
            });

            endpointResponse({
                res,
                code: 201,
                message: 'Refugio creado exitosamente con su dirección',
                body: refugioCompleto
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al crear el refugio',
                errors: error.errors || [error.message]
            });
        }
    },

    // Actualizar refugio (dirección por separado)
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, info, imagen } = req.body;

            // 1. Obtener refugio existente
            const refugio = await Refugio.findByPk(id, {
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'localidad']
                    },
                    {
                        association: 'contacto',
                        attributes: ['id', 'telefono', 'email']
                    }
                ]
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            // 2. Actualizar solo campos básicos (dirección se actualiza aparte)
            const camposActualizables = { nombre, descripcion, info, imagen };
            Object.keys(camposActualizables).forEach(key => {
                if (camposActualizables[key] !== undefined) {
                    refugio[key] = camposActualizables[key];
                }
            });

            await refugio.save();

            // 3. Obtener datos actualizados
            const refugioActualizado = await Refugio.findByPk(id, {
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'localidad', 'provincia']
                    },
                    {
                        association: 'contacto',
                        attributes: ['id', 'telefono', 'email', 'web']
                    }
                ]
            });

            endpointResponse({
                res,
                message: 'Datos del refugio actualizados exitosamente',
                body: refugioActualizado
            });

        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar el refugio',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar refugio con todas sus relaciones
    delete: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            // 1. Obtener refugio con relaciones
            const refugio = await Refugio.findByPk(id, {
                include: [
                    { association: 'contacto' },
                    { association: 'mascotas' },
                    { association: 'direccion' }
                ],
                transaction
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            // 2. Eliminar en cascada
            if (refugio.contacto) {
                await refugio.contacto.destroy({ transaction });
            }

            if (refugio.mascotas && refugio.mascotas.length > 0) {
                await Mascota.destroy({
                    where: { refugioId: id },
                    transaction
                });
            }

            // 3. Eliminar refugio y dirección asociada
            await refugio.destroy({ transaction });

            if (refugio.direccion) {
                await Direcciones.destroy({
                    where: { id: refugio.direccion_id },
                    transaction
                });
            }

            await transaction.commit();

            endpointResponse({
                res,
                message: 'Refugio, dirección y relaciones eliminados exitosamente',
                body: { id }
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar el refugio',
                errors: error.errors || [error.message]
            });
        }
    }
};