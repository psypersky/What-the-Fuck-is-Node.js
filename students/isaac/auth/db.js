let userIndex = 2;

const db = {};
const database = {
  users: [
    {id: 1, name: 'isaac', password: '123456', email: 'iramirezc@mail.com'}
  ]
};

function findUserByProperty(property, value, callback) {
  return callback(database.users.find(user => user[property] === value));
}

function insertUser(user, callback) {
  user.id = userIndex++;
  database.users.push(user);

  return callback(null, user);
}

function findUserById(userId, callback) {
  findUserByProperty('id', userId, (user) => {
    if (!user) {
      return callback({
        status: 'error',
        error: `userId: ${userId} NOT found.`
      });
    }

    return callback(null, user);
  });
}

function updateUser(userId, data, callback) {
  findUserByProperty('id', userId, (user) => {
    if (!user) {
      return callback({
        status: 'error',
        error: `userId: ${userId} NOT found.`
      });
    }

    Object.keys(data).forEach(k => {
      if (user[k] && data[k] && k !== 'id') {
        user[k] = data[k];
      }
    });

    return callback(null, user);
  });
}

function removeUser(userId, callback) {
  let index = -1;

  for(let i = 0, len = database.users.length; i < len; i++) {
    if (database.users[i].id === userId) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    return callback({
      status: 'error',
      error: `userId: ${userId} NOT found.`
    });
  } else {
    let userId = database.users[index].id;
    database.users.splice(index, 1);

    return callback(null, userId);
  }
}

db.users = {
  insert: function insert(user, callback) {
    insertUser(user, callback);
  },
  findById: function findById(userId, callback) {
    findUserById(userId, callback);
  },
  update: function update(userId, data, callback) {
    updateUser(userId, data, callback);
  },
  remove: function remove(userId, callback) {
    removeUser(userId, callback);
  }
};

module.exports = db;
