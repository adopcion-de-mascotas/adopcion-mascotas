const { Salud, Vacuna, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");
const { Op } = require('sequelize');

module.exports = {
    // Crear registro de salud
    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { estado, tratamiento, info_veterinaria, vacunas } = req.body;

            // Validación básica
            if (!estado) {
                throw new CustomError('El campo estado es obligatorio', 400);
            }

            // Crear registro de salud
            const nuevaSalud = await Salud.create({
                estado,
                tratamiento: tratamiento || null,
                info_veterinaria: info_veterinaria || null
            }, { transaction });

            // Asociar vacunas si se proporcionaron
            if (vacunas && vacunas.length > 0) {
                // Verificar que las vacunas existan
                const vacunasExistentes = await Vacuna.findAll({
                    where: { id: { [Op.in]: vacunas } },
                    transaction
                });

                if (vacunasExistentes.length !== vacunas.length) {
                    throw new CustomError('Alguna de las vacunas no existe', 404);
                }

                await nuevaSalud.addVacunas(vacunas, { transaction });
            }

            await transaction.commit();

            // Obtener el registro creado con sus relaciones
            const saludCompleta = await Salud.findByPk(nuevaSalud.id, {
                include: [{
                    model: Vacuna,
                    as: 'vacunas',
                    attributes: ['id', 'nombre'],
                    through: { attributes: [] }
                }]
            });

            endpointResponse({
                res,
                code: 201,
                message: 'Registro de salud creado exitosamente',
                body: saludCompleta
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al crear el registro de salud',
                errors: error.errors || [error.message]
            });
        }
    },

    // Actualizar registro de salud
    update: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { estado, tratamiento, info_veterinaria } = req.body;

            const salud = await Salud.findByPk(id, { transaction });
            if (!salud) {
                throw new CustomError('Registro de salud no encontrado', 404);
            }

            // Actualizar campos
            const camposActualizables = { estado, tratamiento, info_veterinaria };
            Object.keys(camposActualizables).forEach(key => {
                if (camposActualizables[key] !== undefined) {
                    salud[key] = camposActualizables[key];
                }
            });

            await salud.save({ transaction });
            await transaction.commit();

            // Obtener el registro actualizado con sus relaciones
            const saludActualizada = await Salud.findByPk(id, {
                include: [{
                    model: Vacuna,
                    as: 'vacunas',
                    attributes: ['id', 'nombre'],
                    through: { attributes: [] }
                }]
            });

            endpointResponse({
                res,
                message: 'Registro de salud actualizado exitosamente',
                body: saludActualizada
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar el registro de salud',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar registro de salud
    delete: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            const salud = await Salud.findByPk(id, { transaction });
            if (!salud) {
                throw new CustomError('Registro de salud no encontrado', 404);
            }

            // Eliminar relaciones primero (opcional, depende de tus requisitos)
            await salud.setVacunas([], { transaction });

            // Eliminar el registro
            await salud.destroy({ transaction });
            await transaction.commit();

            endpointResponse({
                res,
                message: 'Registro de salud eliminado exitosamente',
                body: { id }
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar el registro de salud',
                errors: error.errors || [error.message]
            });
        }
    },

    // Agregar vacunas a un registro de salud
    addVacunas: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { vacunas } = req.body;

            if (!vacunas || !Array.isArray(vacunas) || vacunas.length === 0) {
                throw new CustomError('Debe proporcionar un array de IDs de vacunas', 400);
            }

            const salud = await Salud.findByPk(id, { transaction });
            if (!salud) {
                throw new CustomError('Registro de salud no encontrado', 404);
            }

            // Verificar que las vacunas existan
            const vacunasExistentes = await Vacuna.findAll({
                where: { id: { [Op.in]: vacunas } },
                transaction
            });

            if (vacunasExistentes.length !== vacunas.length) {
                throw new CustomError('Alguna de las vacunas no existe', 404);
            }

            // Agregar las nuevas vacunas (evitando duplicados)
            const vacunasActuales = await salud.getVacunas({ transaction });
            const idsVacunasActuales = vacunasActuales.map(v => v.id);
            const nuevasVacunas = vacunas.filter(id => !idsVacunasActuales.includes(id));

            if (nuevasVacunas.length > 0) {
                await salud.addVacunas(nuevasVacunas, { transaction });
            }

            await transaction.commit();

            // Obtener el registro actualizado
            const saludActualizada = await Salud.findByPk(id, {
                include: [{
                    model: Vacuna,
                    as: 'vacunas',
                    attributes: ['id', 'nombre'],
                    through: { attributes: [] }
                }]
            });

            endpointResponse({
                res,
                message: nuevasVacunas.length > 0
                    ? 'Vacunas agregadas exitosamente'
                    : 'Las vacunas ya estaban asociadas',
                body: saludActualizada
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al agregar vacunas',
                errors: error.errors || [error.message]
            });
        }
    }
};