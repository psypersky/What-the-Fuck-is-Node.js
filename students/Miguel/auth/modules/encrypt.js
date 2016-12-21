"use strict";

const crypto = require('crypto');
const mainSalt = genRandomString(16);

function genRandomString (length) {
  return crypto.randomBytes(Math.ceil(length/2))
               .toString('hex')
               .slice(0, length);
}

function sha512 (password, salt) {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  };
}

function saltHashPassword (userPassword) {
  let salt = mainSalt;
  let passwordData = sha512(userPassword, salt);
  return passwordData.passwordHash;
}

module.exports = saltHashPassword;
