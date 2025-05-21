const { Op } = require("sequelize");
const { Mascotas } = require("../database/models");
const { endpointError, CustomError } = require("../utils/error");
const { endpointResponse } = require("../utils/success");

module.exports = {
    list: async (req, res) => {
        const {
            page = 1,
            limit = 10,
            tipo,
            raza,
            tamaño,
            search
        } = req.query;

        const offset = (page - 1) * limit;

        const filters = {};

        if (tipo) filters.tipo = tipo;
        if (raza) filters.raza = raza;
        if (tamaño) filters.tamaño = tamaño;

        if (search) {
            filters[Op.or] = [
                { nombre: { [Op.like]: `%${search}%` } },
                { descripcion: { [Op.like]: `%${search}%` } }
            ];
        }

        try {
            const { count, rows } = await Mascotas.findAndCountAll({
                where: filters,
                limit: Number(limit),
                offset: Number(offset),
                order: [["id", "ASC"]]
            });

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascotas encontradas",
                body: {
                    items: rows,
                    filters: {
                        tipo: tipo || null,
                        raza: raza || null,
                        tamaño: tamaño || null
                    },
                    search: search || null,
                    pagination: {
                        total: count,
                        page: Number(page),
                        pages: Math.ceil(count / limit),
                        limit: Number(limit)
                    }
                }
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

    detail: async (req, res) => {
        const { id } = req.params;

        try {
            const mascota = await Mascotas.findByPk(id);

            if (!mascota) {
                throw new CustomError("Mascota no encontrada", 404);
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascota encontrada",
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
};
