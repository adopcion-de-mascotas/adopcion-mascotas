// routes/refugios.js
const express = require('express');
const router = express.Router();

//const refugioController = require('../controllers/refugioController');

router.post('/', (req, res) => { res.json("refugios") });
router.put('/:id', (req, res) => { res.json("refugios") });
router.delete('/:id', (req, res) => { res.json("refugios") });

module.exports = router;