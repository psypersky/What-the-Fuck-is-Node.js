'use strict';

const http = require('http'),
      cookie = require('cookie'),
      utils = require('./server/utils'),
      db = require('./server/db'),
      path = require('path'),
      fs = require('fs');

const server = http.createServer();

//console.log = () => {}; // shutdown logs

server.listen(8000, () => console.log('Listening on port 8000'));

server.on('request', (request, response) => {
  const METHOD  = request.method,
        URL     = request.url,
        filePath = '.' + URL,
        extname = path.extname(filePath);

  let contentType = getContentType(extname);

  // send css and js file
  if(extname !== '') {
    response.writeHead(200, {'Content-Type': contentType});
    fs.exists(filePath, (exists) => {
      if(exists){
        fs.createReadStream(filePath).pipe(response);
      }
    });
    return;
  }

  getSession(request, response, (SESSION, user) => {
    if (METHOD === 'GET' && URL === '/') {
      if(SESSION) {
        utils.redirect('/user', response);
      } else {
        utils.servePage('./index.html', response);
      }
    } else if (METHOD === 'GET' && URL === '/register') {
      if(SESSION) {
        utils.redirect('/user', response);
      } else {
        utils.redirect('/', response);
      }
    } else if (METHOD === 'POST' && URL === '/register') {
      if(SESSION) {
        utils.redirect('/user', response);
      } else {
        registerUser(request, (errors, user) => {
          if (errors) {
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({status: 'nok', errors: errors}));
          } else{
            let token = authenticateUser(user, request);
            response.setHeader('Set-Cookie', [`username=${user.username}`,`token=${token}`]);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end();
          }
        });
      }
    } else if (METHOD === 'GET' && URL === '/login') {
      if(SESSION) {
        utils.redirect('/user', response);
      } else {
        utils.servePage('./client/views/login.html', response);
      }
    } else if (METHOD === 'POST' && URL === '/login') {
      if(SESSION) {
        utils.redirect('/user', response);
      } else {
        loginUser(request, (error, user) => {
          if (error) {
            response.writeHead(400);
            response.end('Ooop! Either the username or password is wrong. Sorry!');
          } else {
            let token = authenticateUser(user, request);
            response.setHeader('Set-Cookie', [`username=${user.username}`,`token=${token}`]);
            response.writeHead(302, {'Location': '/user'});
            response.end('/user');
          }
        });
      }
    } else if (METHOD === 'GET' && URL === '/logout') {
      if(SESSION) {
        // delete credentials
        let result = db.unsetToken(user);
        console.log('Logout, token->', result);
        utils.redirect('/', response);
      } else {
        utils.redirect('/', response);
      }
    } else if (METHOD === 'GET' && URL === '/user') {
      if(SESSION) {
        response.writeHead(200);
        response.end(`Welcome Don ${user.username || ''}`);
      } else{
        utils.redirect('/', response);
      }
    } else {
      if(SESSION) {
        response.writeHead(404);
        response.end('404. Error, oops');
      } else{
        utils.redirect('/', response);
      }
    }
  });
});

// ==================================================

let getContentType = function(extname) {
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    default:
      return 'text/html';
  }
};

let getSession = function(request, response, callback) {
  let cookies = cookie.parse(request.headers.cookie || '');
  let user = null;
  let session = false;

  if(cookies.username) {
    user = db.findUserBy('username', cookies.username);
    if(user && cookies.token && user.token === cookies.token) {
      session = true;
    }
  }

  const SESSION = session;
  callback(SESSION, user);
};

let loginUser = function(request, callback) {
  utils.parseBody(request, (body) => {
    let user = db.findUserBy('username', body.username);

    if (user && body && user.password && body.password && user.password === body.password) {
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
    } else if (db.findUserBy('username', body.username)){
      errors.push({type: 'username', msg: 'Username already registered.'});
    }

    if(!body.email || body.email.length === 0) {
      errors.push({type: 'email', msg: 'Email is required.'});
    } else if (db.findUserBy('email', body.email)){
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
      let user = db.findUserBy('username', body.username);
      console.log('userInserted->', user);
      callback(null, user);
    }
  });
};

let authenticateUser = function (user, req) {
  let token = utils.generateToken();

  if(db.setToken(user, token)){
      console.log('token->', token);
      return token;
  } else{
    throw new Error(`Token couldn't be set.`);
  }
};
