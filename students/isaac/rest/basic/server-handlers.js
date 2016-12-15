'use strict';

const db = require('./db'),
      querystring = require('querystring');

// Helper Functions
// ==================================================

function parseBody (req, callback) {
  let chunks = [];

  req.on('data', data => chunks.push(data));

  req.on('end', () => {
    let bodyJSON,
        bodyString = Buffer.concat(chunks).toString();

    try {
      bodyJSON = JSON.parse(bodyString || '{}');
    } catch (e) {
      return callback(e);
    }

    callback(null, bodyJSON);
  });
}

// Handlers
// ==================================================

function defaultPage (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end();
}

// [/]
function home (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('My great web page');
}

// [/login]
function login (req, res) {
  parseBody(req, (err, body) => {
    // Couldn't parse body
    if(err){
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        status: 'fail',
        message: err.message
      }));
      return;
    }

    let user = db.findUserBy('username', body.username);

    if (user && body && body.username && body.password && user.password === body.password) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({
        status: 'success',
        data: {
          user: {
            id: user.id,
            username: user.username,
            password: user.password
          }
        }
      }));
      res.end();
    } else {
      res.writeHead(401, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({
        status: 'fail',
        data: { user: 'User or password invalid' }
      }));
      res.end();
    }
  });
}

module.exports = {
  defaultPage,
  home,
  login
};
