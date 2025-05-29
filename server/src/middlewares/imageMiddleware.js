const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/mascotas'))
    },
    filename: (req, file, cb) => {
        let newFile = `${Date.now()}-mascota-${path.extname(file.originalname)}`;
        cb(null, newFile)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, webp)"));
    }
};

const upload = multer({ storage, fileFilter })

module.exports = upload