const { Vacuna, Salud, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");
const { Op } = require('sequelize');
const { validationResult } = require('express-validator')

module.exports = {
    // Obtener todas las vacunas
    getAll: async (req, res) => {
        try {
            const { search } = req.query;

            const whereClause = {};
            if (search) {
                whereClause.nombre = { [Op.like]: `%${search}%` };
            }

            const vacunas = await Vacuna.findAll({
                where: whereClause,
                attributes: ['id', 'nombre'],
                order: [['nombre', 'ASC']],
                include: [{
                    model: Salud,
                    as: 'salud_vacunas',
                    attributes: ['id', 'estado'],
                    through: { attributes: [] }
                }]
            });

            endpointResponse({
                res,
                message: 'Listado de vacunas obtenido exitosamente',
                body: vacunas
            });
        } catch (error) {
            endpointError({
                res,
                message: 'Error al obtener las vacunas',
                errors: [error.message]
            });
        }
    },

    // Crear una nueva vacuna
    create: async (req, res) => {

        let errorsValidator = validationResult(req);

        if (errorsValidator.isEmpty()){

            const transaction = await sequelize.transaction();
            try {
                const { nombre } = req.body;
    
                if (!nombre) {
                    throw new CustomError('El campo nombre es obligatorio', 400);
                }
    
                // Verificar si ya existe una vacuna con ese nombre
                const vacunaExistente = await Vacuna.findOne({
                    where: { nombre },
                    transaction
                });
    
                if (vacunaExistente) {
                    throw new CustomError('Ya existe una vacuna con ese nombre', 409);
                }
    
                const nuevaVacuna = await Vacuna.create({ nombre }, { transaction });
                await transaction.commit();
    
                endpointResponse({
                    res,
                    code: 201,
                    message: 'Vacuna creada exitosamente',
                    body: nuevaVacuna
                });
            } catch (error) {
                await transaction.rollback();
                endpointError({
                    res,
                    code: error.code || 500,
                    message: error.message || 'Error al crear la vacuna',
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

    // Obtener vacunas por IDs (método útil para el controlador de Salud)
    getVacunasByIds: async (ids) => {
        return await Vacuna.findAll({
            where: { id: { [Op.in]: ids } }
        });
    }
};