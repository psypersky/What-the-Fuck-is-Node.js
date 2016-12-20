const jwt = require('jwt-simple'),
      moment = require('moment'),
      config = require('./config');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers["auth-token"]) {
    return res.status(400).send({status:"error", error: "Auth Error"});
  }

  let token = req.headers["auth-token"];

  let payload = jwt.decode(token, config.T0KeN_S3CR3T);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({status: "error", error: "The token expired."});
  }

  req.user = payload.sub;

  next();
};
