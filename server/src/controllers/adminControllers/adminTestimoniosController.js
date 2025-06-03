const { Testimonio } = require('../../database/models');
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');
const path = require('path');

module.exports = {
    crearTestimonio: async (req, res) => {
        try {
            const { comentario, autor, fecha, mascota_id, admin_id } = req.body;

            if (!comentario || !autor) {
                // Si hay una imagen subida pero la validación falla, eliminarla
                if (req.file) {
                    const fs = require('fs');
                    fs.unlinkSync(req.file.path);
                }
                throw new CustomError('Datos incompletos', 400, [
                    !comentario && 'El comentario es requerido',
                    !autor && 'El autor es requerido'
                ].filter(Boolean));
            }

            // Construir ruta de la imagen relativa
            const fotoPath = req.file ? `/images/testimonios/${req.file.filename}` : null;

            // Crear el testimonio
            const testimonio = await Testimonio.create({
                comentario,
                autor,
                fecha: fecha || new Date(),
                foto: fotoPath,
                mascota_id,
                admin_id
            });

            return endpointResponse({
                res,
                code: 201,
                message: 'Testimonio creado exitosamente',
                body: testimonio
            });

        } catch (error) {
            // Eliminar la imagen si hubo un error después de subirla
            if (req.file) {
                const fs = require('fs');
                fs.unlinkSync(req.file.path);
            }

            if (error instanceof CustomError) {
                return endpointError({
                    res,
                    code: error.code,
                    message: error.message,
                    errors: error.errors
                });
            }
            return endpointError({
                res,
                message: 'Error al crear el testimonio',
                errors: [error.message]
            });
        }
    },

    actualizarTestimonio: async (req, res) => {
        try {
            const { id } = req.params;
            const { comentario, autor, fecha, mascota_id, admin_id } = req.body;

            // Buscar el testimonio
            const testimonio = await Testimonio.findByPk(id);
            if (!testimonio) {
                // Eliminar la imagen si el testimonio no existe
                if (req.file) {
                    const fs = require('fs');
                    fs.unlinkSync(req.file.path);
                }
                throw new CustomError('Testimonio no encontrado', 404);
            }

            // Validación básica
            if (!comentario && !autor && !fecha && !req.file && mascota_id === undefined && admin_id === undefined) {
                if (req.file) {
                    const fs = require('fs');
                    fs.unlinkSync(req.file.path);
                }
                throw new CustomError('No hay datos para actualizar', 400);
            }

            // Manejo de la imagen
            let fotoPath = testimonio.foto;
            if (req.file) {
                // Eliminar la imagen anterior si existe
                if (testimonio.foto) {
                    const fs = require('fs');
                    const oldPath = path.join(__dirname, '../public', testimonio.foto);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
                // Asignar nueva ruta de imagen
                fotoPath = `/images/testimonios/${req.file.filename}`;
            }

            // Actualizar campos
            if (comentario !== undefined) testimonio.comentario = comentario;
            if (autor !== undefined) testimonio.autor = autor;
            if (fecha !== undefined) testimonio.fecha = fecha;
            if (fotoPath !== undefined) testimonio.foto = fotoPath;
            if (mascota_id !== undefined) testimonio.mascota_id = mascota_id;
            if (admin_id !== undefined) testimonio.admin_id = admin_id;

            await testimonio.save();

            return endpointResponse({
                res,
                message: 'Testimonio actualizado exitosamente',
                body: testimonio
            });

        } catch (error) {
            // Eliminar la imagen si hubo un error después de subirla
            if (req.file) {
                const fs = require('fs');
                fs.unlinkSync(req.file.path);
            }

            if (error instanceof CustomError) {
                return endpointError({
                    res,
                    code: error.code,
                    message: error.message,
                    errors: error.errors
                });
            }
            return endpointError({
                res,
                message: 'Error al actualizar el testimonio',
                errors: [error.message]
            });
        }
    },

    eliminarTestimonio: async (req, res) => {
        try {
            const { id } = req.params;

            const testimonio = await Testimonio.findByPk(id);
            if (!testimonio) {
                throw new CustomError('Testimonio no encontrado', 404);
            }

            // Eliminar la imagen asociada si existe
            if (testimonio.foto) {
                const fs = require('fs');
                const imagePath = path.join(__dirname, '../public', testimonio.foto);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await testimonio.destroy();

            return endpointResponse({
                res,
                message: 'Testimonio eliminado exitosamente'
            });

        } catch (error) {
            if (error instanceof CustomError) {
                return endpointError({
                    res,
                    code: error.code,
                    message: error.message,
                    errors: error.errors
                });
            }
            return endpointError({
                res,
                message: 'Error al eliminar el testimonio',
                errors: [error.message]
            });
        }
    }
};