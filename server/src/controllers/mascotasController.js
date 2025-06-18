const { Op } = require("sequelize");
const { Mascota, GaleriaMascota, Comportamiento, Refugio, Salud, Direcciones, ContactoRefugio, Vacuna, Personalidad } = require("../database/models");
const { endpointError, CustomError } = require("../utils/error");
const { endpointResponse } = require("../utils/success");

module.exports = {
    list: async (req, res) => {
        const {
            page = 1,
            limit = 10,
            tipo,
            raza,
            edad,
            tamanio,
            genero,
            estado,
            ciudad,
            search
        } = req.query;

        const offset = (page - 1) * limit;

        const filters = {};

        if (tipo) filters.tipo = tipo;
        if (raza) filters.raza = raza;
        if (edad) filters.edad = edad;
        if (tamanio) filters.tamanio = tamanio;
        if (genero) filters.genero = genero;
        if (estado) filters.estado = estado;
        if (ciudad) filters.ciudad = ciudad;

        if (search) {
            filters[Op.or] = [
                { nombre: { [Op.like]: `%${search}%` } },
                { descripcion: { [Op.like]: `%${search}%` } },
                { historia: { [Op.like]: `%${search}%` } }
            ];
        }

        try {
            const { count, rows } = await Mascota.findAndCountAll({
                where: filters,
                limit: Number(limit),
                offset: Number(offset),
                order: [["id", "ASC"]],
                attributes: {
                    exclude: ["ciudad"]
                }
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
                        edad: edad || null,
                        tamanio: tamanio || null,
                        genero: genero || null,
                        estado: estado || null,
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
            const mascota = await Mascota.findByPk(id, {
                include: [
                    {
                        model: Personalidad,
                        as: "personalidad",
                        attributes: ["id", "nombre"],
                        through: { attributes: [] }
                    },
                    {
                        model: GaleriaMascota,
                        as: 'galeria', // Asegúrate que este alias coincida con tu asociación en el modelo Mascota
                        attributes: ['id', 'foto'],
                        order: [['id', 'ASC']]
                    },
                    {
                        model: Comportamiento,
                        as: "comportamiento",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Refugio,
                        as: "refugio",
                        include: [
                            {
                                model: Direcciones,
                                as: "direccion",
                                attributes: {
                                    exclude: ["createdAt", "updatedAt"]
                                }
                            },
                            {
                                model: ContactoRefugio,
                                as: "contacto",
                                attributes: {
                                    exclude: ["refugio_id", "createdAt", "updatedAt"]
                                }
                            }
                        ],
                        attributes: {
                            exclude: ["direccion_id", "createdAt", "updatedAt"]
                        },
                    },
                    {
                        model: Salud,
                        as: "salud",
                        include: [
                            {
                                model: Vacuna,
                                as: "vacunas",
                                attributes: ["id", "nombre"],
                                through: { attributes: [] }
                            }
                        ],
                        attributes: {
                            exclude: ["createdAt", "updatedAt"] // Excluir campos innecesarios
                        }
                    }
                ],
                attributes: {
                    exclude: ["saludId", "refugioId", "comportamientoId", "createdAt", "updatedAt"] // Excluir campos innecesarios
                }
            });

            if (!mascota) {
                throw new CustomError("Mascota no encontrada", 404);
            }

            // Formatear la respuesta para incluir URLs completas de las fotos
            const mascotaData = mascota.get({ plain: true });

            // Agregar URL base a las fotos (ajusta según tu configuración)
            mascotaData.galeria = mascotaData.galeria.map(foto => ({
                ...foto,
                url: `${req.protocol}://${req.get('host')}/images/mascotas/${foto.foto}`
            }));

            // Agregar URL para la imagen principal si existe
            if (mascotaData.imagen_principal) {
                mascotaData.imagen_principal_url = `${req.protocol}://${req.get('host')}/images/mascotas/${mascotaData.imagen_principal}`;
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascota encontrada",
                body: mascotaData
            });

        } catch (error) {
            endpointError({
                res,
                code: error.code || 400,
                message: error.message || "Ocurrió un error",
                errors: error.errors || [error.message]
            });
        }
    }
};
