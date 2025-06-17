const { Testimonio } = require('../../database/models');
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');
const path = require('path');
const { validationResult } = require('express-validator')
const { fs } = require("fs")

module.exports = {
    crearTestimonio: async (req, res) => {
        try {

            // Validación de errores
            let errorsValidator = validationResult(req);

            if (errorsValidator.isEmpty()) {

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

                // Construir URL completa de la imagen
                const fotoPath = req.file
                    ? `${req.protocol}://${req.get('host')}/images/testimonios/${req.file.filename}`
                    : null;

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
            } else {
                endpointError({
                    res,
                    code: 400,
                    message: "Ocurrio un error en el formulario",
                    errors: errorsValidator.mapped()
                })
            }


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
                    const oldPath = path.join(__dirname, '../../images/testimonios', path.basename(testimonio.foto));
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
                // Asignar nueva URL pública
                fotoPath = `${req.protocol}://${req.get('host')}/images/testimonios/${req.file.filename}`;
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
                const fileName = path.basename(new URL(testimonio.foto).pathname); // extrae solo "foto-123.jpg"
                const pathToFile = path.join(__dirname, '../../public/images/testimonios', fileName);
                if (fs.existsSync(pathToFile)) {
                    fs.unlinkSync(pathToFile);
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