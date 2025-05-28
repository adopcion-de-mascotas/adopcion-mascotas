const express = require('express');
const router = express.Router();

router.get("/", (req, res) => { res.json("contacto") })
router.get('/:id', (req, res) => { res.json("contacto") });

router.post('/', (req, res) => { res.json("contacto") });
router.put('/:id', (req, res) => { res.json("contacto") });
router.delete('/:id', (req, res) => { res.json("contacto") });

module.exports = router;