const { GaleriaMascota, Mascota, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');
const fs = require('fs');
const path = require('path');

module.exports = {
    // Obtener todas las fotos de una mascota
    getByMascota: async (req, res) => {
        try {
            const { id } = req.params;

            const mascota = await Mascota.findByPk(id);
            if (!mascota) {
                throw new CustomError('Mascota no encontrada', 404);
            }

            const fotos = await GaleriaMascota.findAll({
                where: { id },
                attributes: ['id', 'foto'],
                order: [['id', 'ASC']]
            });

            endpointResponse({
                res,
                message: 'Galería de mascota obtenida exitosamente',
                body: {
                    mascota: {
                        id: mascota.id,
                        nombre: mascota.nombre
                    },
                    fotos
                }
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al obtener la galería',
                errors: error.errors || [error.message]
            });
        }
    },

    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            if (!req.files || req.files.length === 0) {
                throw new CustomError('No se han subido imágenes', 400);
            }

            const mascota = await Mascota.findByPk(id, { transaction });
            if (!mascota) {
                // Eliminar todos los archivos subidos si la mascota no existe
                req.files.forEach(file => fs.unlinkSync(file.path));
                throw new CustomError('Mascota no encontrada', 404);
            }

            // Crear registros para cada foto
            const fotosSubidas = await Promise.all(
                req.files.map(async (file) => {
                    const urlCompleta = `${req.protocol}://${req.get('host')}/images/mascotas/${file.filename}`;
                    return await GaleriaMascota.create({
                        foto: urlCompleta,
                        mascotaId: id
                    }, { transaction });
                })
            );
            await transaction.commit();

            endpointResponse({
                res,
                code: 201,
                message: req.files.length > 1
                    ? `${req.files.length} fotos agregadas exitosamente`
                    : 'Foto agregada a la galería exitosamente',
                body: fotosSubidas
            });

        } catch (error) {
            await transaction.rollback();

            // Eliminar todos los archivos si ocurrió un error
            if (req.files) {
                req.files.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            }

            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al agregar fotos',
                errors: error.errors || [error.message]
            });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const foto = await GaleriaMascota.findByPk(id);
            if (!foto) {
                throw new CustomError('Foto no encontrada', 404);
            }

            // Obtener el nombre del archivo desde la URL
            const filename = path.basename(foto.foto);

            // Eliminar el archivo físico
            const filePath = path.join(__dirname, '../../public/images/mascotas', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await foto.destroy();

            endpointResponse({
                res,
                message: 'Foto eliminada exitosamente',
                body: { id }
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar foto',
                errors: error.errors || [error.message]
            });
        }
    }
}