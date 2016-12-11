"use strict"

let http = require('http');
let querystring = require('querystring');
let fs = require('fs');

let db = [
  {
    username : 'Ruben',
    pass     : 'MyPass'
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

http.createServer(function(req, res){
  if((req.method == 'GET') && (req.url === '/login')){
    fs.readFile('./login.html', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
  if((req.method == 'POST') && (req.url === '/login')){
    let body = '', form;

    req.on('data', function(data){
      body += data;
    });

    req.on('end', function(data){
      form = querystring.parse(body);

      let a = db.findIndex(function (element) {
        if (element.username === form.user) {
          console.log(element.username);
          return true;
        }
      });

      if (a >= 0) {
        if (form.pass === db[a].pass) {
          fs.readFile('./welcome.html', function (err, data) {
            res.setHeader('Location', '/welcome');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
          });
        } else {
          fs.readFile('./noPass.html', function (err, data) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(data);
          });
        }
      } else {
        fs.readFile('./noUser.html', function (err, data) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(data);
        });
      }
    });
  }else{
    fs.readFile('./notFound.html', function (err, data) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
}).listen(8080);
