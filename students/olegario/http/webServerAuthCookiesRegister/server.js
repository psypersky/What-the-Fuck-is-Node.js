"use strict"

let http = require('http');
let querystring = require('querystring');
var setCookie = require('set-cookie-parser');
let cookie = require('cookie');
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
  let cookies = setCookie.parse(res);

  let mainCookie = cookie.parse(req.headers.cookie || '');

  if (mainCookie.username) {
    if((req.method == 'GET') && (req.url === '/signUp')){
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/login')){
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/user')){
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else {
      fs.readFile('./notFound.html', function (err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
  }  else {

    if((req.method == 'GET') && (req.url === '/signUp')){
      fs.readFile('./sign.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/login')){
      fs.readFile('./login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'POST') && (req.url === '/validate')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        let form = querystring.parse(body);

        if (form.test) {
          let errors = [];
          let name  = form.name;
          let email = form.mail;
          let passw = form.pass

          if( name === null || name.length === 0) {
            errors.push("err1");
          }

          if( email === null || email.length === 0) {
            errors.push("err2");
          }

          if( passw === null || passw.length === 0) {
            errors.push("err3");
          } else {
            if( passw.length < 6) {
              errors.push("err4");
            }
          }

          if (errors.length > 0) {
            res.writeHead(300, {'Content-Type': 'text/html'});
            res.end(errors.toString());
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('success');
          }
        }
      });
    }

    else if((req.method == 'POST') && (req.url === '/signUp')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        let form = querystring.parse(body);

        db.push({
          name  : form.user,
          email : form.mail,
          phone : form.phone,
          pass  : form.pass
        });

        fs.readFile('./welcome.html', function (err, data) {
          res.setHeader('Set-Cookie', ['username=' + form.user]);
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        });
      });
    }

    else if((req.method == 'POST') && (req.url === '/login')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        form = querystring.parse(body);

        let a = db.findIndex(function (element) {
          if (element.username === form.user) {
            return true;
          }
        });

        if (a >= 0) {
          if (form.pass === db[a].pass) {
            fs.readFile('./welcome.html', function (err, data) {
              res.setHeader('Set-Cookie', ['username=' + db[a].username]);
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
    } else {
      fs.readFile('./notFound.html', function (err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
  }
}).listen(8080);
