const { Admins } = require("../../database/models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const { validationResult } = require("express-validator")
const { endpointError } = require("../../utils/error")

module.exports = {
    login: async (req, res) => {
        const errorsValidator = validationResult(req)

        if (errorsValidator.isEmpty()) {
            // Desestructuramos el body
            const { email, password } = req.body
            // Buscamos el admin por email
            const admin = await Admins.findOne({
                where: {
                    email
                }
            })
            // Si no existe el admin, devolvemos un error
            if (!admin) {
                return res.status(401).json({
                    error: "El email o la contraseña son incorrectos"
                })
            }

            if (admin && bcrypt.compareSync(password, admin.password)) {
                // Si existe el admin y la contraseña es correcta, creamos el token
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
                console.log(req.user)

                // Si existe el admin y la contraseña es correcta, devolvemos el admin
                return res.status(200).json({
                    ...req.user,
                    token
                })
            }

            // Si existe el admin pero la contraseña es incorrecta, devolvemos un error
            return res.status(401).json({
                error: "El email o la contraseña son incorrectos"
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

            // Si se crea el admin, devolvemos el admin
            if (newAdmin) {
                return res.status(200).json({
                    id: newAdmin.id,
                    nombre: newAdmin.nombre,
                    apellido: newAdmin.apellido,
                    email: newAdmin.email
                })
            }

            // Si no se crea el admin, devolvemos un error
            return res.status(401).json({
                error: "Error al crear el admin"
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
                    errors: {}
                })
            }

            // Si existe el admin, lo actualizamos
            const updatedAdmin = await admin.update({
                nombre,
                apellido,
                email,
                password: newPassword ? bcrypt.hashSync(newPassword, 10) : admin.password
            })

            // Si se actualiza el admin, devolvemos el admin
            if (updatedAdmin) {
                return res.status(200).json({
                    id: updatedAdmin.id,
                    nombre: updatedAdmin.nombre,
                    apellido: updatedAdmin.apellido,
                    email: updatedAdmin.email
                })
            }

            // Si no se actualiza el admin, devolvemos un error
            return res.status(401).json({
                error: "Error al actualizar el admin"
            })


        } else {
            endpointError({
                res,
                code: 400,
                message: "Ocurrio un error en el formulario",
                errors: errorsValidator.mapped()
            })
        }
    }

}