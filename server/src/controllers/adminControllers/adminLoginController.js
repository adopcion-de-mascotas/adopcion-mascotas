const { Admins } = require("../../database/models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const { validationResult } = require("express-validator")
const { endpointError, CustomError } = require("../../utils/error")
const { endpointResponse } = require("../../utils/success")

module.exports = {
    login: async (req, res) => {
        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {
            try {
                const { email, password } = req.body

                const admin = await Admins.findOne({
                    where: {
                        email
                    }
                })

                if (!admin) {
                    throw new CustomError("Ocurrió un error", 500)
                }

                if (admin && !bcrypt.compareSync(password, admin.password)) {
                    endpointError({
                        res,
                        code: 400,
                        message: "Credenciales inválidas",
                        errors: error.errors
                    })
                }

                const tokenPayload = {
                    id: admin.id,
                    email: admin.email
                }
                const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" })

                // Guardamos al usuario logueado en req.user
                req.user = {
                    id: admin.id,
                    nombre: admin.nombre,
                    apellido: admin.apellido,
                    email: admin.email
                }

                // Si existe el admin y la contraseña es correcta, devolvemos el admin
                return res.status(200).json({
                    ...req.user,
                    token
                })

            } catch (error) {
                endpointError({
                    res,
                    code: 400,
                    message: "Credenciales inválidas",
                    errors: error.errors
                })
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

    createAdmin: async (req, res) => {
        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {
            // Desestructuramos el body
            const { nombre, apellido, email, password } = req.body

            // Buscamos el admin por email
            const admin = await Admins.findOne({
                where: {
                    email
                }
            })

            // Si existe el admin, devolvemos un error
            if (admin) {
                return res.status(401).json({
                    error: "El email ya existe"
                })
            }

            // Si no existe el admin, lo creamos
            const newAdmin = await Admins.create({
                nombre,
                apellido,
                email,
                password: bcrypt.hashSync(password, 10)
            })

            // Si no se crea el admin, devolvemos un error
            if (!newAdmin) {
                throw new CustomError("Ocurrió un error", 401);
            }

            return res.status(200).json({
                id: newAdmin.id,
                nombre: newAdmin.nombre,
                apellido: newAdmin.apellido,
                email: newAdmin.email
            })

        } else {
            endpointError({
                res,
                code: 400,
                message: "Ocurrio un error en el formulario",
                errors: errorsValidator.mapped()
            })
        }
    },

    editAdmin: async (req, res) => {

        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {

            try {
                // Desestructuramos el body
                const { nombre, apellido, email, password, newPassword } = req.body

                // Buscamos el admin por id
                const admin = await Admins.findByPk(req.params.id)

                // Si no existe el admin, devolvemos un error
                if (!admin) {
                    return res.status(401).json({
                        error: "El admin no existe"
                    })
                }

                // Si la password es correcta, la actualizamos
                if (newPassword && !bcrypt.compareSync(password, admin.password)) {
                    endpointError({
                        res,
                        code: 400,
                        message: "La contraseña actual es incorrecta",
                        errors: "Ocurrió un error contraseña"
                    })
                }

                // Si existe el admin, lo actualizamos
                const updatedAdmin = await admin.update({
                    nombre,
                    apellido,
                    email,
                    password: newPassword ? bcrypt.hashSync(newPassword, 10) : admin.password
                }, {
                    attributes: {
                        exclude: ["password"]
                    }
                })

                if (!updatedAdmin) {
                    throw new CustomError("Ocurrió un error al actualizar datos", 500)
                }

                endpointResponse({
                    res,
                    status: true,
                    code: 200,
                    message: "Datos actualizados correctamente",
                    body: updatedAdmin
                })
            } catch (error) {
                endpointError({
                    res,
                    code: 400,
                    message: "Ocurrio un error en el formulario",
                    errors: error.errors
                })
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

    getDataAdmin: async (req, res) => {
        const { id } = req.params;

        try {

            const dataAdmin = await Admins.findByPk(id, {
                attributes: {
                    exclude: ["password"]
                }
            })

            if (!dataAdmin) {
                throw new CustomError("No se encontradon datos", 404)
            }

            endpointResponse({
                res,
                code: 200,
                status: true,
                message: "Datos encontrados",
                body: dataAdmin
            })

        } catch (error) {
            endpointError({
                res,
                code: 500,
                message: "Ocurrió un error",
                errors: error.errors || [error.errors]
            })
        }
    }

}