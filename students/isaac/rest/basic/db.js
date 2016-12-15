'use strict';

const database = [
  {id: 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq', username: 'Ruben', password: '1234', email: 'ruben@mail.com', telephone: '123456789'},
  {id: 'asdSDT/[[asdffsuC`}V;_&^D<-3sq', username: 'Isaac', password: '123456', email: 'isaac@mail.com'}
];

function findUserBy(property, value) {
  return database.find(user => user[property] === value);
}

module.exports = {
  findUserBy
};
