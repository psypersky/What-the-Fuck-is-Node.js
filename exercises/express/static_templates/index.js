const express = require('express');

const pug = require('pug');

const app = express();

app.set('view engine', pug);
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));

app.get('/page', (req, res) => {
    res.render('page.pug', { name: 'Cesar', arr: ['1', '2', '3'] });
});

app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
});

module.exports = app; // for testing
