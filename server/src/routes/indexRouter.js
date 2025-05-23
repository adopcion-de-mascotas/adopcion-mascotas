const express = require("express")
const router = express.Router()

const adminRouter = require("./admin/indexAdminRouter")
const mascotasRouter = require("./mascotasRouter")
const testimoniosRouter = require("./testimoniosRouter")
const noticiasRouter = require("./noticiasRouter")

router.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Conexión exitosa"
    })
})

router.use("/admin", adminRouter)
router.use("/mascotas", mascotasRouter)
router.use("/testimonios", testimoniosRouter)
router.use("/noticias", noticiasRouter)


module.exports = router;