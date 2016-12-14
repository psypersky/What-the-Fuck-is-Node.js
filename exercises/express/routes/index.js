const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const user = {
    id: 1,
    name: 'Cesar',
};

app.use(bodyParser.json());
const users = [];

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});


app.all('/user', (req, res, next) => {
    if (!req.headers['auth-token']) {
        res.status(400).json({ error: 'Not authorized' });
    }
    next();
});

app.get('/user', (req, res) => {
    res.json(user);
});

app.post('/user', (req, res) => {
    users.push(req.body);
    res.status(201).json(req.body);
});

app.put('/user/:id', (req, res) => {
    res.json(req.body);
});

app.delete('/user/:id', (req, res) => {
    res.sendStatus(200);
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


module.exports = app;
