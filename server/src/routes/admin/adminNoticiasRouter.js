const express = require('express');
const router = express.Router();
const noticiasController = require('../../controllers/adminControllers/adminNoticiasController');
const upload = require('../../middlewares/multerNoticias');

router.post('/', upload.single('foto'), noticiasController.create);
router.put('/:id', upload.single('foto'), noticiasController.update);
router.delete('/:id', noticiasController.delete);

module.exports = router;