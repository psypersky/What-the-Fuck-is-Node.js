'use strict';

const http = require('http'),
      cookie = require('cookie'),
      utils = require('./utils'),
      db = require('./db');

//console.log = () => {}; // shutdown logs

const server = http.createServer();

server.listen(8000, () => console.log('Listening on port 8000'));

server.on('request', (request, response) => {
  const method  = request.method,
        url     = request.url,
        client  = request.client,
        cookies = cookie.parse(request.headers.cookie || '');

  //console.log(`\nREQUEST: ${url} METHOD: ${method}`);

  //console.log('cookie-token->', cookies.token);
  //console.log('client-token->', client.token);

  console.log(client.token, request.socket.token);

  const AUTHENTICATED = Boolean(cookies && cookies.token);

  //console.log('AUTHENTICATED->', AUTHENTICATED);

  // I don't know, but I think the better approach is to divide the paths
  // depending if the user is authenticated or not.
  if(AUTHENTICATED) { // AUTHENTICATED
    switch (url) {
      case '/':
      case '/register':
      case '/login':
        utils.redirect('/user', response);
        break;
      case '/logout':
        // delete credentials
        delete client['token'];
        delete client['name'];
        utils.redirect('/', response);
        break;
      case '/user':
        if(method === 'GET') {
          response.writeHead(200);
          response.end(`Welcome Don ${client.name || ''}`);
        }
        break;
      default:
        response.writeHead(404);
        response.end('Error 404');
    }
  } else { // NOT AUTHENTICATED
    switch (url) {
      case '/':
        if (method === 'GET') {
          utils.servePage('./index.html', response);
        }
        break;
      case '/login':
        if (method === 'GET') {
          utils.servePage('./login.html', response);
        } else if (method === 'POST') {
          loginUser(request, (error, user) => {
            if (error) {
              response.writeHead(400);
              response.end('Ooop! Either the username or password is wrong. Sorry!');
            } else {
              let token = authenticateUser(user, request);
              response.setHeader('Set-Cookie', [`token=${token}`]);
              response.writeHead(302, {'Location': '/user'});
              response.end('');
            }
          });
        }
        break;
      case '/register':
        if(method === 'GET') {
          utils.redirect('/', response);
        } else if(method === 'POST') {
          registerUser(request, (errors, user) => {
            if (errors) {
              response.writeHead(400, {'Content-Type': 'application/json'});
              response.end(JSON.stringify({status: 'nok', errors: errors}));
            } else{
              let token = authenticateUser(user, request);
              response.setHeader('Set-Cookie', [`token=${token}`]);
              //response.writeHead(200, {'Content-Type': 'text/html'});
              response.writeHead(200, {'Location': '/user'});
              response.end('/user');
            }
          });
        }
        break;
      default:
        utils.redirect('/', response);
    }
  }
});

let loginUser = function(request, callback) {
  utils.parseBody(request, (body) => {
    let user = db.findUserByUsername(body.username);

    if (user && body && user.password && body.password && user.password === body.password) {
      //console.log('user->', user);
      callback(null, user);
    } else {
      callback(new Error('Bad Credentials.'));
    }
  });
};

let registerUser = function(request, callback) {
  utils.parseBody(request, (body) => {
    let errors = [];
    //console.log('NewUserData->', body);

    if(!body.username || body.username.length === 0) {
      errors.push({type: 'username', msg: 'Username is required.'});
    } else if (db.findUserByUsername(body.username)){
      errors.push({type: 'username', msg: 'Username already registered.'});
    }

    if(!body.email || body.email.length === 0) {
      errors.push({type: 'email', msg: 'Email is required.'});
    } else if (db.findUserByEmail(body.email)){
      errors.push({type: 'email', msg: 'Email already used.'});
    }

    if(!body.password || body.password.length === 0) {
      errors.push({type: 'password', msg: 'Password is required.'});
    } else if (body.password.length < 6){
      errors.push({type: 'password', msg: 'Password length should be at least 6'});
    }

    // validate data
    if(errors.length){
      callback(errors);
    } else {
      db.insertUser(body);
      let user = db.findUserByUsername(body.username);
      console.log('userInserted->', user);
      callback(null, user);
    }
  });
};

let authenticateUser = function (user, req) {
  let token = utils.generateToken();
  console.log('token->', token);

  req.client.token = token;
  req.client.name = user.username;

  return token;
};
