const express = require('express');
const router = express.Router();
const {
    create,
    getAll,
    getById,
    remove,
    update
} = require("../../controllers/adminControllers/adminContactosController");
const contactoValidator = require('../../validations/contactoValidator');

router.get("/", getAll)
router.get('/:id', getById);

router.post('/', contactoValidator, create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;