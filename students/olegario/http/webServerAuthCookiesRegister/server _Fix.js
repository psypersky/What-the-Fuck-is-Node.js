"use strict"

let http        = require('http');
let querystring = require('querystring');
var setCookie   = require('set-cookie-parser');
let cookie      = require('cookie');
let fs          = require('fs');

//Database for the example
let database = [
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

  let cookies    = setCookie.parse(res);

  // parse the Cookie content to mainCookie
  let mainCookie = cookie.parse(req.headers.cookie || '');

  //check if exist some cookie
  if (mainCookie.username) {
    if((req.method == 'GET') && (req.url === '/signUp')){//if exist some cookie and want to sign up, I send to welcome page
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/login')){//if exist some cookie and want to login again, I send to welcome page
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/user')){//if exist some cookie and want go to user page, I send to welcome page
      fs.readFile('./welcome.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else {
      fs.readFile('./notFound.html', function (err, data) {//if exist some cookie and want go to another route, I send to error page
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
  }  else { //if doesn't exist some cookie, then somebody want to login or sign up

    if((req.method == 'GET') && (req.url === '/signUp')){//if doesn't exist some cookie and want sign up, send the sign up page
      fs.readFile('./sign.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }

    else if((req.method == 'GET') && (req.url === '/login')){//if doesn't exist some cookie and want login, send the login page
      fs.readFile('./login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
    //if somebody want sign up, verify that your inputs to be correct
    else if((req.method == 'POST') && (req.url === '/validate')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        let form = querystring.parse(body);

        if (form.test) {
          let errors = [];
          let name   = form.name;
          let email  = form.mail;
          let passw  = form.pass

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
    //if somebody want sign up and your inputs to be correct, I register him and I login him
    else if((req.method == 'POST') && (req.url === '/signUp')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        let form = querystring.parse(body);

        database.push({
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
    //if somebody want login, send the login page
    else if((req.method == 'POST') && (req.url === '/login')){
      let body = '', form;

      req.on('data', function(data){
        body += data;
      });

      req.on('end', function(data){
        form     = querystring.parse(body);

        let user = database.find(function (element) {
          return  (element.username === form.user);
        });

        if (user) {//if the user exist in the database
          if (form.pass === user.pass) {// check that the pass to be equal to the pass in the database
            fs.readFile('./welcome.html', function (err, data) {
              res.setHeader('Set-Cookie', ['username=' + user.username]);
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
    } else {//when somebody want to go to another route, send the error page
      fs.readFile('./notFound.html', function (err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      });
    }
  }
}).listen(8080);
