
let currentIndex = 2;

const database = [
  {id: 1, name: 'isaac', email: 'isaac@mail.com', password: '12345'}
];

function insertUser(user, callback) {
  user.id = currentIndex++;
  database.push(user);
  callback({
    id: user.id,
    name: user.name,
    email: user.email,
    // password: user.password // don't send password
  });
}

function findUserBy(property, value, callback) {
  callback(database.find(user => user[property] === value));
}

function updateUser(userID, newData, callback) {
  findUserBy('id', userID, (userDB) => {
    if(!userDB) {
      return callback(new Error('user not found'));
    }
    Object.keys(newData).forEach(k => {
      if(userDB.hasOwnProperty(k) && k !== 'id') {
        userDB[k] = newData[k];
      }
    });
    callback(null, userDB);
  });
}

function deleteUser(userID, callback) {
  findUserBy('id', userID, (userDB) => {
    if(!userDB) {
      return callback(new Error('user not found'));
    }
    let index;
    for (let i = 0; i < database.length; i++) {
      if(database[i].id === userID) {
        index = i;
        break;
      }
    }
    database.splice(index, 1);
    callback(null);
  });
}

module.exports = {
  insertUser,
  findUserBy,
  updateUser,
  deleteUser
};
