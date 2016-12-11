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

const db = function () {
  let data = {};

  findUserByUsername = (username) =>
    data.users.find((user) => user.username === username);

  data.users = [
    {
      userId: '9234cnpti45wrhiukce',
      username: 'Ruben',
      password: '1234',
    }
  ];

  return { findUserByUsername }
}();

const PASS = 'youCanPass';

console.log(db.findUserByUsername('Ruben'));

const server = http.createServer();
server.listen(4000, () => console.log('Listening on 4000'));

server.on('request', (request, response) => {
  console.log(`Received a ${request.method} on route ${request.url}`);

  if (request.method === 'POST' && request.url === '/login') {
    var body = [];
    request.on('data', (bufferChunk) => {
      body.push(bufferChunk);
    });
    request.on('end', () => {
      body = Buffer.concat(body).toString();

      // Parse body string
      const fieldsObj = {};
      const fields = body.split('&');
      for (let field in fields) {
        const fieldArr = fields[field].split("=");
        fieldsObj[fieldArr[0]] = fieldArr[1];
      }

      const user = db.findUserByUsername(fieldsObj.username);

      if (!user) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('User not found :(');
        response.end();
        return;
      }

      if (user.password !== fieldsObj.password) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('Wrong password');
        response.end();
        return;
      }

      response.setHeader('Set-Cookie', [`auth=${PASS}`, 'other=cookie']);
      response.writeHead(302, { 'Location': '/user' });
      response.end();
    });

  } else if (request.method === 'GET' && request.url === '/') {

    cookies = cookie.parse(request.headers.cookie || '');

    if (cookies.auth === PASS) {
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
  } else {
    send404(response);
  }

});


function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: Resource not found.');
  response.end();
}

/**

Class: http.ClientRequest
 It represents an in-progress request whose header has already been queued.

Class: http.ServerResponse
The response implements, but does not inherit from, the Writable Stream interface. This is an EventEmitter with the following events:

response.write(chunk[, encoding][, callback])
If this method is called and response.writeHead() has not been called, it will switch to implicit header mode and flush the implicit headers.

**/
