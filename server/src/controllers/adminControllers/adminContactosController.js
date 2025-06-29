const { validationResult } = require('express-validator');
const { ContactoRefugio, Refugio } = require("../../database/models");
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');

module.exports = {
    // Obtener todos los contactos de refugio con relaciones
    getAll: async (req, res) => {
        try {
            const contactos = await ContactoRefugio.findAll({
                include: [
                    {
                        model: Refugio,
                        as: 'refugio',
                        attributes: ['id', 'nombre', 'imagen']
                    }
                ],
                attributes: ['id', "nombre", 'telefono', 'email', 'web']
            });

            endpointResponse({
                res,
                message: 'Listado de contactos de refugios obtenido exitosamente',
                body: contactos
            });
        } catch (error) {
            endpointError({
                res,
                message: 'Error al obtener los contactos de refugios',
                errors: [error.message]
            });
        }
    },

    // Obtener un contacto específico por ID con detalles completos
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const contacto = await ContactoRefugio.findByPk(id, {
                include: [
                    {
                        model: Refugio,
                        as: 'refugio',
                        attributes: ['id', 'nombre', 'descripcion', 'imagen']
                    }
                ]
            });

            if (!contacto) {
                throw new CustomError('Contacto de refugio no encontrado', 404);
            }

            endpointResponse({
                res,
                message: 'Detalles del contacto obtenidos exitosamente',
                body: contacto
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al obtener el contacto',
                errors: error.errors || [error.message]
            });
        }
    },

    // Crear un nuevo contacto con validaciones
    create: async (req, res) => {

        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {

            try {
                const { nombre, telefono, email, web, refugio_id } = req.body;

                // Validaciones básicas
                if (!telefono || !email) {
                    throw new CustomError('Teléfono y email son campos obligatorios', 400);
                }

                // Verificar que el refugio existe
                const refugio = await Refugio.findByPk(refugio_id);
                if (!refugio) {
                    throw new CustomError('El refugio especificado no existe', 404);
                }

                // Verificar que el refugio no tenga ya un contacto
                const contactoExistente = await ContactoRefugio.findOne({ where: { refugio_id } });
                if (contactoExistente) {
                    throw new CustomError('Este refugio ya tiene un contacto asociado', 409);
                }

                const nuevoContacto = await ContactoRefugio.create({
                    nombre,
                    telefono,
                    email,
                    web,
                    refugio_id,
                });

                endpointResponse({
                    res,
                    code: 201,
                    message: 'Contacto de refugio creado exitosamente',
                    body: nuevoContacto
                });
            } catch (error) {
                endpointError({
                    res,
                    code: error.code || 500,
                    message: error.message || 'Error al crear el contacto',
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

    // Actualizar un contacto existente
    update: async (req, res) => {
        console.log(req.body);

        try {
            const { id } = req.params;
            const { nombre, telefono, email, web, refugio_id } = req.body;

            const contacto = await ContactoRefugio.findByPk(id);
            if (!contacto) {
                throw new CustomError('Contacto de refugio no encontrado', 404);
            }

            // Validar relaciones si se intentan cambiar
            if (refugio_id && refugio_id !== contacto.refugio_id) {
                const refugio = await Refugio.findByPk(refugio_id);
                if (!refugio) {
                    throw new CustomError('El nuevo refugio especificado no existe', 404);
                }

                const contactoExistente = await ContactoRefugio.findOne({
                    where: { refugio_id, id: { [Op.ne]: id } }
                });
                if (contactoExistente) {
                    throw new CustomError('El nuevo refugio ya tiene otro contacto asociado', 409);
                }
            }

            // Actualizar solo los campos proporcionados
            const camposActualizables = { nombre, telefono, email, web, refugio_id, };
            Object.keys(camposActualizables).forEach(key => {
                if (camposActualizables[key] !== undefined) {
                    contacto[key] = camposActualizables[key];
                }
            });

            await contacto.save();

            // Obtener el contacto actualizado con relaciones
            const contactoActualizado = await ContactoRefugio.findByPk(id);

            endpointResponse({
                res,
                message: 'Contacto de refugio actualizado exitosamente',
                body: contactoActualizado
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar el contacto',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar un contacto
    remove: async (req, res) => {
        try {
            const { id } = req.params;

            const contacto = await ContactoRefugio.findByPk(id);
            if (!contacto) {
                throw new CustomError('Contacto de refugio no encontrado', 404);
            }

            await contacto.destroy();

            endpointResponse({
                res,
                message: 'Contacto de refugio eliminado exitosamente',
                body: { id }
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar el contacto',
                errors: error.errors || [error.message]
            });
        }
    }
};