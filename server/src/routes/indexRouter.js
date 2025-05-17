const express = require("express")
const router = express.Router()
const homeController = require("../controllers/homeController")

router.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        msg: "Conexión exitosa"
    })
})



module.exports = router;