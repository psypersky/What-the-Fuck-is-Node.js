var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
 if(!req.headers["auth-token"]) {
   return res
   .status(400)
   .send({message: "No estas autentificado"});
 } else {
    var token = req.headers["auth-token"];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
      return res
      .status(401)
      .send({message: "The token expires"});
    }

    req.user = payload;
    next();
 }
}
