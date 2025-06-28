const { Refugio, Direcciones, Mascota, sequelize } = require("../../database/models");
const { endpointError, CustomError } = require('../../utils/error');
const { endpointResponse } = require('../../utils/success');
const path = require("path")
const fs = require("fs")

module.exports = {

    // Obtener todos los refugios
    getAll: async (req, res) => {
        try {
            const refugios = await Refugio.findAll({
                attributes: ['id', 'nombre', 'descripcion', 'info', 'imagen'],
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'barrio', 'localidad', 'provincia', 'pais', 'codigo_postal']
                    },
                    {
                        association: 'contacto',
                        attributes: ['id', 'nombre', 'telefono', 'email', 'web']
                    }
                ],
                order: [['nombre', 'ASC']]
            });

            endpointResponse({
                res,
                message: 'Listado de refugios obtenido exitosamente',
                body: refugios
            });
        } catch (error) {
            endpointError({
                res,
                message: 'Error al obtener los refugios',
                errors: [error.message]
            });
        }
    },

    // Obtener refugio por ID

    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const refugio = await Refugio.findByPk(id, {
                attributes: ['id', 'nombre', 'descripcion', 'info', 'imagen'],
                include: [
                    {
                        association: 'direccion',
                        attributes: ['id', 'calle', 'barrio', 'localidad', 'provincia', 'pais', 'codigo_postal']
                    },
                    {
                        association: 'contacto',
                        attributes: ['id', 'nombre', 'telefono', 'email', 'web']
                    }
                ]
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            endpointResponse({
                res,
                message: 'Detalles del refugio obtenidos exitosamente',
                body: refugio
            });
        } catch (error) {
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al obtener el refugio',
                errors: error.errors || [error.message]
            });
        }
    },

    // Crear refugio con dirección (en un solo paso)
    create: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { nombre, descripcion, info, direccion } = req.body;

            // Validación básica
            if (!nombre || !descripcion || !direccion) {
                throw new CustomError("Nombre, descripción y dirección son obligatorios", 400);
            }

            // 1. Crear dirección
            const nuevaDireccion = await Direcciones.create({
                calle: direccion.calle,
                barrio: direccion.barrio,
                localidad: direccion.localidad,
                provincia: direccion.provincia,
                pais: direccion.pais || "Argentina",
                codigo_postal: direccion.codigo_postal,
                descripcion: direccion.descripcion || null,
            }, { transaction });

            // 2. Procesar imagen (si existe)
            let urlImagen = null;
            if (req.file) {
                const filename = req.file.filename;
                urlImagen = `${req.protocol}://${req.get("host")}/images/refugios/${filename}`;
            }

            // 3. Crear refugio
            const nuevoRefugio = await Refugio.create({
                nombre,
                descripcion,
                info: info || null,
                imagen: urlImagen,
                direccion_id: nuevaDireccion.id
            }, { transaction });

            await transaction.commit();

            // 4. Obtener refugio con relaciones
            const refugioCompleto = await Refugio.findByPk(nuevoRefugio.id, {
                include: [{
                    association: "direccion",
                    attributes: ["id", "calle", "localidad", "provincia"]
                }]
            });

            endpointResponse({
                res,
                code: 201,
                message: "Refugio creado exitosamente con su dirección",
                body: refugioCompleto
            });

        } catch (error) {
            await transaction.rollback();

            // Eliminar imagen subida si ocurrió un error
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            endpointError({
                res,
                code: error.code || 500,
                message: error.message || "Error al crear el refugio",
                errors: error.errors || [error.message]
            });
        }
    },

    // Actualizar refugio (dirección por separado)
    update: async (req, res) => {
        const transaction = await sequelize.transaction();

        console.log(req.body);

        try {
            const { id } = req.params;
            const { nombre, descripcion, info } = req.body;

            // 1. Buscar el refugio
            const refugio = await Refugio.findByPk(id, {
                include: [
                    { association: 'direccion', attributes: ['id', 'calle', 'localidad', 'provincia', "pais"] },
                    { association: 'contacto', attributes: ['id', "nombre", 'telefono', 'email', 'web'] }
                ],
                transaction
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            // 2. Procesar imagen nueva (si hay)
            let nuevaImagen = refugio.imagen;
            if (req.file) {
                // Eliminar imagen anterior si existía
                if (refugio.imagen) {
                    const pathAntiguo = path.join(__dirname, '../../public/images/refugios/', path.basename(refugio.imagen));
                    if (fs.existsSync(pathAntiguo)) {
                        fs.unlinkSync(pathAntiguo);
                    }
                }

                const filename = req.file.filename;
                nuevaImagen = `${req.protocol}://${req.get("host")}/images/refugios/${filename}`;
            }

            // 3. Actualizar campos permitidos
            refugio.nombre = nombre ?? refugio.nombre;
            refugio.descripcion = descripcion ?? refugio.descripcion;
            refugio.info = info ?? refugio.info;
            refugio.imagen = nuevaImagen;

            await refugio.save({ transaction });

            await transaction.commit();

            // 4. Traer los datos actualizados
            const refugioActualizado = await Refugio.findByPk(id, {
                include: [
                    { association: 'direccion', attributes: ['id', 'calle', 'localidad', 'provincia'] },
                    { association: 'contacto', attributes: ['id', 'telefono', 'email', 'web'] }
                ]
            });

            endpointResponse({
                res,
                message: 'Datos del refugio actualizados exitosamente',
                body: refugioActualizado
            });

        } catch (error) {
            await transaction.rollback();

            // Eliminar imagen nueva si hubo error
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al actualizar el refugio',
                errors: error.errors || [error.message]
            });
        }
    },

    // Eliminar refugio con todas sus relaciones
    delete: async (req, res) => {
        const transaction = await sequelize.transaction();
        try {
            const { id } = req.params;

            // 1. Obtener refugio con relaciones
            const refugio = await Refugio.findByPk(id, {
                include: [
                    { association: 'contacto' },
                    { association: 'mascotas' },
                    { association: 'direccion' }
                ],
                transaction
            });

            if (!refugio) {
                throw new CustomError('Refugio no encontrado', 404);
            }

            console.log(refugio);
            
            // 2. Eliminar contacto si existe
            if (refugio.contacto !== null) {
                await refugio.contacto.destroy({ transaction });
            }

            // 3. Eliminar mascotas asociadas si existen
            if (refugio.mascotas?.length > 0) {
                await Mascota.destroy({
                    where: { refugio_id: id },
                    transaction
                });
            }

            console.log(refugio.imagen, "ASDASDASDASD");
            
            // 4. Eliminar imagen si existe
            if (refugio.imagen && refugio.imagen !== "") {
                console.log("NASDASDASDASd");
                
                const rutaImagen = path.join(__dirname, '../../public/images/refugios/', path.basename(refugio.imagen));
                console.log(rutaImagen);
                console.log();
                
                
                if (fs.existsSync(rutaImagen)) {
                    console.log("BORAAA");
                    
                    fs.unlinkSync(rutaImagen);
                }
            }

            console.log("hasta aca llega");
            // 5. Eliminar refugio
            await refugio.destroy({ transaction });
            console.log("hasta aca llega des");

            // 6. Eliminar dirección si existe
            if (refugio.direccion) {
                await Direcciones.destroy({
                    where: { id: refugio.direccion.id },
                    transaction
                });
            }

            

            await transaction.commit();

            endpointResponse({
                res,
                message: 'Refugio, dirección, contacto, mascotas e imagen eliminados exitosamente',
                body: { id }
            });

        } catch (error) {
            await transaction.rollback();
            endpointError({
                res,
                code: error.code || 500,
                message: error.message || 'Error al eliminar el refugio',
                errors: error.errors || [error.message]
            });
        }
    }
};