const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {res.json("personalidades")})
router.get('/:id', (req, res) => {res.json("personalidades")});

router.post('/', (req, res) => {res.json("personalidades")});
router.put('/:id', (req, res) => {res.json("personalidades")});
router.delete('/:id', (req, res) => {res.json("personalidades")});

module.exports = router;