const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/mascotas'));
    },
    filename: (req, file, cb) => {
        let newFile = `${Date.now()}-${Math.round(Math.random() * 1E9)}-mascota${path.extname(file.originalname)}`;
        cb(null, newFile);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimetype = allowedTypes.test(file.mimetype);

    if (allowedTypes.test(ext) && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, webp)"));
    }
};

// Configuración principal de Multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por archivo
        files: 10 // Máximo 10 archivos
    }
});

// Middleware para manejar errores de Multer
const handleMulterErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: false,
                message: 'El tamaño de algún archivo excede el límite de 5MB',
                errors: [err.message]
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                status: false,
                message: 'Se excedió el límite de 10 archivos por petición',
                errors: [err.message]
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                status: false,
                message: 'Campo de archivo incorrecto o demasiados archivos',
                errors: [err.message]
            });
        }
    } else if (err) {
        return res.status(400).json({
            status: false,
            message: 'Error al procesar archivos',
            errors: [err.message]
        });
    }
    next();
};

module.exports = {
    singleUpload: upload.single('foto'), // Para subida única
    multiUpload: upload.array('fotos', 10), // Para subida múltiple (máx 10)
    handleMulterErrors
};