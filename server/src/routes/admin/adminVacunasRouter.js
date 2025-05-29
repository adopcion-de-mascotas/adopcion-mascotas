// routes/vacunas.js
const express = require('express');
const router = express.Router();

//const vacunaController = require('../controllers/vacunaController');

router.get('/', (req, res) => {res.json("vacunas")});
router.post('/', (req, res) => {res.json("vacunas")});

module.exports = router;