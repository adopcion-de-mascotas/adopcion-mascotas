const { validationResult } = require('express-validator');
const { Mascota, Refugio, Salud, Comportamiento, GaleriaMascota, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");
const fs = require('fs');
const path = require('path');

module.exports = {
    create: async (req, res) => {

        let errorsValidator = validationResult(req);

        if (errorsValidator.isEmpty()) {

            const transaction = await sequelize.transaction();
            try {
                // 1. Validación de campos obligatorios
                const requiredFields = ['nombre', 'edad', 'tipo', 'estado', 'refugioId'];
                const missingFields = requiredFields.filter(field => !req.body[field]);

                if (missingFields.length > 0) {
                    throw new CustomError(`Faltan campos obligatorios: ${missingFields.join(', ')}`, 400);
                }

                // 2. Verificar referencias existentes
                const { refugioId, saludId, comportamientoId } = req.body;

                await Promise.all([
                    Refugio.findByPk(refugioId, { transaction }).then(refugio => {
                        if (!refugio) throw new CustomError("Refugio no encontrado", 404);
                    }),
                    saludId && Salud.findByPk(saludId, { transaction }).then(salud => {
                        if (saludId && !salud) throw new CustomError("Registro de salud no encontrado", 404);
                    }),
                    comportamientoId && Comportamiento.findByPk(comportamientoId, { transaction }).then(comportamiento => {
                        if (comportamientoId && !comportamiento) throw new CustomError("Comportamiento no encontrado", 404);
                    })
                ]);

                // 3. Manejo de la imagen principal
                /*                 let imagenPrincipal = null;
                                if (req.file) {
                                    imagenPrincipal = req.file.filename;
                                } */

                let imagenPrincipal = null;
                if (req.file) {
                    const baseUrl = `${req.protocol}://${req.get('host')}`;
                    imagenPrincipal = `${baseUrl}/images/mascotas/${req.file.filename}`;
                }

                // 4. Crear la mascota
                const nuevaMascota = await Mascota.create({
                    nombre: req.body.nombre,
                    edad: req.body.edad,
                    tipo: req.body.tipo,
                    raza: req.body.raza || null,
                    genero: req.body.genero || null,
                    tamanio: req.body.tamanio || null,
                    peso: req.body.peso || null,
                    esterelizado: req.body.esterelizado || false,
                    estado: req.body.estado,
                    ciudad: req.body.ciudad || null,
                    descripcion: req.body.descripcion || null,
                    historia: req.body.historia || null,
                    imagen_principal: imagenPrincipal,
                    liked: req.body.liked || false,
                    likes: req.body.likes || 0,
                    comportamientoId,
                    refugioId,
                    saludId
                }, { transaction });

                await transaction.commit();

                endpointResponse({
                    res,
                    code: 201,
                    status: true,
                    message: "Mascota creada correctamente",
                    body: nuevaMascota
                });

            } catch (error) {
                // Eliminar la imagen subida si hubo error
                if (req.file && req.file.path) {
                    fs.unlinkSync(req.file.path);
                }
                await transaction.rollback();
                endpointError({
                    res,
                    code: error.code || 400,
                    message: error.message || "Ocurrió un error al crear la mascota",
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

    update: async (req, res) => {
        let errorsValidator = validationResult(req);

        if (errorsValidator.isEmpty()) {
            const transaction = await sequelize.transaction();

            try {
                const mascota = await Mascota.findByPk(req.params.id, { transaction });

                if (!mascota) {
                    throw new CustomError("Mascota no encontrada", 404);
                }

                // Validar referencias (refugio, salud, comportamiento)
                if (req.body.refugioId) {
                    const refugio = await Refugio.findByPk(req.body.refugioId, { transaction });
                    if (!refugio) throw new CustomError("Refugio no encontrado", 404);
                }
                if (req.body.saludId) {
                    const salud = await Salud.findByPk(req.body.saludId, { transaction });
                    if (!salud) throw new CustomError("Registro de salud no encontrado", 404);
                }
                if (req.body.comportamientoId) {
                    const comportamiento = await Comportamiento.findByPk(req.body.comportamientoId, { transaction });
                    if (!comportamiento) throw new CustomError("Comportamiento no encontrado", 404);
                }

                // Manejo imagen principal
                let imagenAnterior = null;
                if (req.file) {
                    imagenAnterior = mascota.imagen_principal;

                    const baseUrl = `${req.protocol}://${req.get('host')}`;
                    mascota.imagen_principal = `${baseUrl}/images/mascotas/${req.file.filename}`;
                }

                // Campos a actualizar
                const camposActualizables = [
                    'nombre', 'edad', 'tipo', 'raza', 'genero', 'tamanio', 'peso',
                    'esterelizado', 'estado', 'ciudad', 'descripcion', 'historia',
                    'liked', 'likes', 'comportamientoId', 'refugioId', 'saludId'
                ];

                camposActualizables.forEach(campo => {
                    if (req.body[campo] !== undefined) {
                        mascota[campo] = req.body[campo];
                    }
                });

                // Guardar cambios básicos
                await mascota.save({ transaction });

                // **ACTUALIZAR RELACIÓN DE PERSONALIDADES**
                // Suponiendo que te llega un array de IDs en req.body.personalidad
                if (Array.isArray(req.body.personalidad)) {
                    await mascota.setPersonalidad(req.body.personalidad, { transaction });
                }

                await transaction.commit();

                // Borrar imagen anterior si se actualizó
                if (imagenAnterior) {
                    const filename = path.basename(imagenAnterior);
                    const imagePath = path.join(__dirname, '../../public/images/mascotas', filename);

                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                endpointResponse({
                    res,
                    code: 200,
                    status: true,
                    message: "Mascota actualizada correctamente",
                    body: mascota
                });

            } catch (error) {
                // Borrar imagen nueva si hubo error
                if (req.file && req.file.path) {
                    fs.unlinkSync(req.file.path);
                }
                await transaction.rollback();
                endpointError({
                    res,
                    code: error.code || 400,
                    message: error.message || "Ocurrió un error al actualizar la mascota",
                    errors: error.errors || [error.message]
                });
            }
        } else {
            endpointError({
                res,
                code: 400,
                message: "Ocurrió un error en el formulario",
                errors: errorsValidator.mapped()
            });
        }
    },

    remove: async (req, res) => {
        console.log('remove controller')
        const transaction = await sequelize.transaction();
        try {
            const mascota = await Mascota.findByPk(req.params.id, {
                include: ['galeria'],
                transaction
            });

            if (!mascota) {
                throw new CustomError("Mascota no encontrada", 404);
            }
            console.log('llego')

            // 1. Eliminar imagen principal
            if (mascota.imagen_principal) {
                const imagePath = path.join(__dirname, '../../public/images/mascotas', mascota.imagen_principal);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // 2. Eliminar fotos de la galería
            if (mascota.galeria && mascota.galeria.length > 0) {
                await GaleriaMascota.destroy({
                    where: { mascotaId: mascota.id },
                    transaction
                });

                // Eliminar archivos físicos de la galería
                mascota.galeria.forEach(foto => {
                    const fotoPath = path.join(__dirname, '../../public/images/mascotas', foto.foto);
                    if (fs.existsSync(fotoPath)) {
                        fs.unlinkSync(fotoPath);
                    }
                });
            }

            // 3. Eliminar el registro de la mascota
            await mascota.destroy({ transaction });
            await transaction.commit();

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Mascota eliminada correctamente",
                body: { id: req.params.id }
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 400,
                message: error.message || "Ocurrió un error al eliminar la mascota",
                errors: error.errors || [error.message]
            });
        }
    }
};