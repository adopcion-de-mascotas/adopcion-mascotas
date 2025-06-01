const express = require('express');
const router = express.Router();
const refugioController = require('../../controllers/adminControllers/adminRefugiosController');

router.post('/', refugioController.create);
router.put('/:id', refugioController.update);
router.delete('/:id', refugioController.delete);

module.exports = router;