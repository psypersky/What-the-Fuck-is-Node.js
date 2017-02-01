/**
 * A basic web server that:
 * serves a home page
 * serves a /login page
 * accepts a POST /login an validates the user
 * if the login was successfull redirect to /user page
 * if the login was unsuccessfull return 401 Unauthorized
 * if the user is not correct return 404 not found
 **/

const http = require('http');
const fs = require('fs');
const cookie = require('cookie');
const util = require('./util');

const db = function () {
  let data = {};

  const findUser = (type, text) => {
    return data.users.find((user) => user[type] === text);
  }

  function updateUser (userId, newUserData) {
    const userIndex = data.users.findIndex((user) => user.id === userId);
    data.users[userIndex] = newUserData;
  }

  data.users = [
    {
      id: 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq',
      username: 'Ruben',
      password: '1234',
    },
    {
      id: 'm-Y=2UC?g7bi:L1q9VJ:?j0PvN@.v(',
      username: 'Donald',
      password: 'Drumpf'
    }
  ];

  return {
    findUser,
    updateUser,
  }
}();

const PASS = 'youCanPass';

const server = http.createServer();


server.on('request', (request, response) => {
  console.log(`Received a ${request.method} on route ${request.url}`);

  const cookies = cookie.parse(request.headers.cookie || '');

  if (cookies.token && cookies.userId) {
    const user = db.findUser('id', cookies.userId);
    if (user) {
      request.user = user;
      console.log('user is logged');
    }
  }

  if (request.method === 'GET' && request.url === '/') {

    cookies = cookie.parse(request.headers.cookie || '');

    if (cookies.token) {
      response.writeHead(302, { 'Location': '/user' });
      response.end();
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./index.html').pipe(response);

  } else if (request.method === 'GET' && request.url === '/login') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./login.html').pipe(response);

  }  else if (request.method === 'GET' && request.url === '/user') {
    cookies = cookie.parse(request.headers.cookie || '');

    if (cookies.auth !== PASS) {
      response.writeHead(302, { 'Location': '/' });
      response.end();
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./user.html').pipe(response);

  } else if (request.method === 'POST' && request.url === '/login') {
    var rawBody = [];
    request.on('data', (bufferChunk) => {
      rawBody.push(bufferChunk);
    });
    request.on('end', () => {
      rawBody = Buffer.concat(rawBody).toString();

      let body;
      try {
        body = JSON.parse(rawBody || '{}');
      } catch(e) {
        console.log(e);
      }

      const user = db.findUser('username', body.username);

      if (!user || user.password !== body.password) {
        response.writeHead(401, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify({
          status: 'fail',
          data: { user: 'User or password invalid' },
        }));
        response.end();
        return;
      }

      const token = util.generateToken();
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Set-Cookie', [`token=${token}`, `userId=${user.id}`]);
      response.writeHead(200);
      response.write(JSON.stringify({
        status: 'success',
        data: { user },
      }));
      response.end();
    });

  } else {
    send404(response);
  }

});


function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: Resource not found.');
  response.end();
}



module.exports = server;
