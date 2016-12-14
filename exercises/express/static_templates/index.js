var express = require('express');
//install pug
var pug = require('pug');
var app = express()

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');

app.use(express.static('public'))

app.get('/page', function(req, res, next) {
	res.render('page.pug', { name: 'Cesar', arr:['1','2', '3'] });
});

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
})

module.exports = app; //for testing