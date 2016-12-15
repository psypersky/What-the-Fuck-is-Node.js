const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let db = [
      {
        username: 'Ruben',
        password: '1234',
      },
      {
        username: 'Michi',
        password: '5678',
      },
    ];

const server = http.createServer();

server.on('request', function (request, response) {
  console.log(`Received a ${request.method} on route ${request.url}`);
  console.log('--');
  console.log(request.client === request.socket);
  console.log('--');

  if (request.method === 'GET' && request.url === '/') {
    fs.readFile('./index.html', function (err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
     });
  }
  else {
    if (request.method === 'POST' && request.url === '/login') {
      var body = [];
      request.on('data', function (bufferChunk) {
        body.push(bufferChunk);
      });
      request.on('end', function () {
        body = Buffer.concat(body).toString();

        const fieldsObj = {};
        const fields = body.split('&');
        for (let field in fields) {
          const fieldArr = fields[field].split("=");
          fieldsObj[fieldArr[0]] = fieldArr[1];
        }

        let user = db.find(function (element) {
          if (element.username === fields.username && fields.password === element.pass) {
            console.log(fields);
            return true;
          }
          else{
            return false;
          }
        });

        data = {
         status: 'fail',
         data: { user: 'User or password invalid' }
        };

        if(user){
          // console.log(user);
        }
        else{
          // console.log(user);
          response.writeHead(401, { 'Content-Type': 'application/json'});
          response.end(JSON.stringify(data));
        }

        if (user.password !== fieldsObj.password) {
          response.writeHead(401, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify(data));
        }
      });
    }
    else {
      send404(response);
    }
  }
});

function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: Resource not found.');
  response.end();
}

module.exports = server;
