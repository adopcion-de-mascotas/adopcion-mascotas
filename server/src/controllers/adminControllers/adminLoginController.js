const { Admins } = require("../../database/models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

module.exports = {
    login: async (req, res) => {

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
            const token = jwt.sign({
                id: admin.id,
                email: admin.email
            }, JWT_SECRET, {
                expiresIn: "1h"
            })

            // Si existe el admin y la contraseña es correcta, devolvemos el admin
            return res.status(200).json({
                id: admin.id,
                nombre: admin.nombre,
                apellido: admin.apellido,
                email: admin.email,
                token
            })
        }

        // Si existe el admin pero la contraseña es incorrecta, devolvemos un error
        return res.status(401).json({
            error: "El email o la contraseña son incorrectos"
        })
    },

    createAdmin: async (req, res) => {

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

    }
    
}