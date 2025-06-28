const { Noticias, Admins, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require("../../utils/error");
const { endpointResponse } = require("../../utils/success");
const fs = require('fs');
const path = require('path');

module.exports = {
    // Crear nueva noticia
    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { titulo, texto, fecha } = req.body;
            const adminId = req.user.id; // Asumiendo que el admin está autenticado

            // Validaciones básicas
            if (!titulo || !texto) {
                throw new CustomError('Título y texto son campos obligatorios', 400);
            }

            // Verificar que el admin existe
            const admin = await Admins.findByPk(adminId, { transaction });
            if (!admin) {
                throw new CustomError('Administrador no encontrado', 404);
            }

            // Manejo de la imagen
            let fotoNombre = null;
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                fotoNombre = `${baseUrl}/images/noticias/${req.file.filename}`;
            }

            // Crear la noticia
            const nuevaNoticia = await Noticias.create({
                titulo,
                texto,
                fecha: fecha || new Date(),
                foto: fotoNombre,
                admin_id: adminId
            }, { transaction });

            await transaction.commit();

            endpointResponse({
                res,
                code: 201,
                message: 'Noticia creada exitosamente',
                body: nuevaNoticia
            });

        } catch (error) {
            // Eliminar la imagen si hubo error
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path);
            }
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al crear la noticia',
                errors: error.errors || [error.message]
            });
        }
    },

    // Actualizar noticia
    update: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { titulo, texto, fecha } = req.body;
            const adminId = req.user.id; // ID del admin autenticado

            const noticia = await Noticias.findByPk(id, { transaction });
            if (!noticia) {
                throw new CustomError('Noticia no encontrada', 404);
            }

            // Verificar permisos (solo el admin creador puede editar)
            if (noticia.admin_id !== adminId) {
                throw new CustomError('No autorizado para editar esta noticia', 403);
            }

            // 2. Manejo de la imagen principal
            let fotoAnterior = null;
            if (req.file) {
                fotoAnterior = noticia.foto;

                const baseUrl = `${req.protocol}://${req.get('host')}`;
                noticia.foto = `${baseUrl}/images/noticias/${req.file.filename}`;
            }

            // Actualizar campos
            const camposActualizables = { titulo, texto, fecha };
            Object.keys(camposActualizables).forEach(key => {
                if (camposActualizables[key] !== undefined) {
                    noticia[key] = camposActualizables[key];
                }
            });

            await noticia.save({ transaction });
            await transaction.commit();

            // Eliminar imagen anterior si se actualizó
            if (fotoAnterior) {
                const imagePath = path.join(__dirname, '../../public/images/noticias', fotoAnterior);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            endpointResponse({
                res,
                message: 'Noticia actualizada exitosamente',
                body: noticia
            });

        } catch (error) {
            // Eliminar la nueva imagen si hubo error
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path);
            }
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar la noticia',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar noticia
    delete: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;
            const adminId = req.user.id; // ID del admin autenticado

            const noticia = await Noticias.findByPk(id, { transaction });
            if (!noticia) {
                throw new CustomError('Noticia no encontrada', 404);
            }

            // Verificar permisos (solo el admin creador puede eliminar)
            // if (noticia.admin_id !== adminId) {
            //     throw new CustomError('No autorizado para eliminar esta noticia', 403);
            // }

            // Eliminar imagen asociada si existe
            if (noticia.foto) {
                const imagePath = path.join(__dirname, '../../public/images/noticias', noticia.foto);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await noticia.destroy({ transaction });
            await transaction.commit();

            endpointResponse({
                res,
                message: 'Noticia eliminada exitosamente',
                body: { id }
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar la noticia',
                errors: error.errors || [error.message]
            });
        }
    }
};