const express = require('express');

const router = express.Router();


const user = {
    id: 1,
    name: 'Cesar',
};


router.get('/', (req, res) => {
    res.json(user);
});

router.post('/', (req, res) => {
    res.status(201).json(req.body);
});
router.put('/:id', (req, res) => {
    res.json(req.body);
});
router.delete('/:id', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;
