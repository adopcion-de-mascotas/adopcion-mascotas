// routes/salud.js
const express = require('express');
const router = express.Router();

//const saludController = require('../controllers/saludController');


router.post('/', (req, res) => { res.json("salud") });
router.put('/:id', (req, res) => { res.json("salud") });
router.delete('/:id', (req, res) => { res.json("salud") });
router.post('/:id/vacunas', (req, res) => { res.json("salud") });

module.exports = router;