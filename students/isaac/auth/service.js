const jwt = require('jwt-simple'),
      moment = require('moment'),
      config = require('./config');

exports.createToken = function (user) {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix()
  };

  return jwt.encode(payload, config.T0KeN_S3CR3T);
};
