'use strict';

const database = [
  {username: 'isaac', password: '12345', email: 'isaac@mail.com', telephone: '123456789'},
  {username: 'Ruben', password: 'MyPass', email: 'ruben@mail.com'}
];

function insertUser(user) {
  return database.push(user);
}

function findUserBy(property, value) {
  return database.find(user => user[property] === value);
}

function setToken(user, token) {
  let userDB = findUserBy('username', user.username);

  if(userDB) {
    userDB.token = token;
    return true;
  }
  return false;
}

function unsetToken(user) {
  let userDB = findUserBy('username', user.username);

  if(userDB) {
    delete userDB.token;
  }
  return userDB;
}

module.exports = {
  findUserBy,
  insertUser,
  setToken,
  unsetToken
};
