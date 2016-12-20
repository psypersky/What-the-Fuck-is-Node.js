var jwt = require('jwt-simple');
var config = require('./middleware/config');

exports.createToken = function(user) {
  var payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
