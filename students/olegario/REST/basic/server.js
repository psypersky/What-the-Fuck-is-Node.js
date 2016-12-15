"use strict"

let http = require('http');
let querystring = require('querystring');
let setCookie = require('set-cookie-parser');
let cookie = require('cookie');
let fs = require('fs');

let dataa = {
 status: 'fail',
 data: { user: 'User or password invalid' }
};

let db = [
  {
    username : 'Ruben',
    pass     : '1234'
  },
  {
    username : 'Ole',
    pass     : '123'
  },
  {
    username : 'Nadie',
    pass     : '456'
  }
];

let server =  http.createServer(function(req, res){

    if((req.method == 'GET') && (req.url === '/')){
      fs.readFile('./index.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'POST') && (req.url === '/login')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        form = JSON.parse(body || '{}');

        let user = db.find(function (element) {
          if (element.username === form.username && form.password === element.pass) {
            return true;
          }
        }) || false;
        if (user.username) {
            dataa = {
              status: 'success',
              data: {
                user: {
                  id: 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq',
                  username: user.username,
                  password: user.pass,
                }
              }
            }
              //res.setHeader('Set-Cookie', ['username=' + user.username]);
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify(dataa));
          } else {
            res.writeHead(401, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dataa));
          }
        });
      }
    });

    // else if((req.method == 'GET') && (req.url === '/user')){
    //   fs.readFile('./welcome.html', function (err, data) {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.end(data);
    //   });
    // } else {
    //   fs.readFile('./notFound.html', function (err, data) {
    //     res.writeHead(404, {'Content-Type': 'text/html'});
    //     res.end(data);
    //   });
    // }

module.exports = server;
