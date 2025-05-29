const express = require('express');
const router = express.Router();

//const galeriaController = require('../controllers/galeriaController');

router.get('/', (req, res) => { res.json("galeria controller") });
router.delete('/:id', (req, res) => { res.json("galeria controller") });