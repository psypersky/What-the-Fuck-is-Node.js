'use strict';

module.exports = (() => {
  const database = [
    {username: 'isaac', password: '12345', email: 'isaac@mail.com', telephone: '123456789'},
    {username: 'Ruben', password: 'MyPass', email: 'ruben@mail.com'}
  ];

  function insertUser(user) {
    return database.push(user);
  }

  function findUserByUsername(username) {
    return database.find(user => user.username === username);
  }

  function findUserByEmail(email) {
    return database.find(user => user.email === email);
  }

  return {
    findUserByUsername,
    findUserByEmail,
    insertUser
  };
})();
