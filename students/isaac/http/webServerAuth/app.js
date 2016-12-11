'use strict';

const http = require('http'),
      fs = require('fs');

const server = http.createServer();

const database = [
  {username: 'isaac', password: '12345'},
  {username: 'Ruben', password: 'MyPass'}
];

server.on('request', (req, response) => {
  let client = req.client,
      method = req.method,
      url = req.url;

  console.log(`User: ${client.name}, Authenticated: ${client.authenticated}`);

  if (!client.authenticated) {
    if (url === '/login'){
      if (method === 'POST') {
        let body = [];

        req.on('data', data => body.push(data));

        req.on('end', () => {
          body = Buffer.concat(body).toString();
          console.log('end', body);

          let user = parseBody(body);
          console.log(user);

          if(validUser(user)){
            // user authenticates
            client.authenticated = true;
            client.name = user.username;
            return redirect('/user', response);
          } else {
            response.writeHead(302);
            response.write('Ooop! Either the username or password is wrong. Sorry!');
            return response.end();
          }
        });
      }
      // Default GET
      return servePage('./login.html', response);
    }
    // Always redirect to login if client is not authenticated
    return redirect('/login', response);
  } else {
    switch (url) {
      default:
        return errorNotFound(response);
      case '/login':
        // Delete credentials
        client.authenticated = false;
        // delete name
        delete client['name'];
        // redirect to login
        return redirect('/login', response);
      case '/':
        return servePage('./index.html', response);
      case '/user':
        response.writeHead(200);
        response.write('Welcome to your page: ' + client.name);
    }
  }

  response.end();
});

function servePage(filename, response) {
  response.writeHead(200);
  return fs.createReadStream(filename).pipe(response);
}

function errorNotFound(response) {
  response.writeHead(404);
  return fs.createReadStream('./404.html').pipe(response);
}

function redirect(path, response) {
  response.writeHead(302, {'Location': path});
  response.end();
}

function parseBody(encoded) {
  let body = {};

  encoded.split('&').forEach((kv) => {
    let parts = kv.split('=');

    body[parts[0]] = parts[1];
  });

  return body;
}

function validUser(user) {
  let dataUser = database.find(u => u.username === user.username);

  return dataUser ? dataUser.password === user.password : false;
}

server.listen(8000, () => console.log('listening on port 8000'));
