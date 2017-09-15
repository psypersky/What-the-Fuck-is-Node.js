// middleware.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers['auth-token']) {
    return res
      .status(400)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers['auth-token'];
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
         .status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload;
  next();
}
