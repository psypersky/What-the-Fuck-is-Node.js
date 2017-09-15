var express = require('express');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var cors = require('cors');
var user = require('./routes/user');
var auth = require('./routes/auth');

// var authCtrl = require('./controllers/auth');
var middleware = require('./middleware/middleware');

// Configuramos Express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3030);

app.use('/user', user);

app.use('/auth', auth);

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
// require('./models/user');

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

var dataBase = [];

// Ruta solo accesible si estás autenticado
// router.get('/private',middleware.ensureAuthenticated, function(req, res) {
//   console.log("autenticado");
// } );


app.listen(app.get('port'), function(){
    console.log('Express corriendo en http://localhost:3000');
});

module.exports = app;
