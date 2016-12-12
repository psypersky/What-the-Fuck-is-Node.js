const http        = require('http'),
      fs          = require('fs'),
      cookie      = require('cookie'),
      querystring = require('querystring');

http.createServer(function (req, res) {
    var dataBase = [
        {
            'user' : 'axel',
            'pass' : 'axel'
        },
        {
            'user' : 'foo',
            'pass' : 'bar'
        }
    ];

    var body     = [];
    var data     = [];
    var userPass = [];
    var elements = [];
    var user     = "",
        pass     = "",
        email    = "",
        tel      = "",
        newReg   = {},
        usr      = "",
        errors = [],
        error = false,
        cookies,
        name = cookie.parse(req.headers.cookie || '');

    //Killing the fucking get of the favicon
    if (req.url === "/favicon.ico") {
        return;
    }

    if (req.url === "/login" && req.method === "GET" && !req.headers.cookie) {
        console.log("Inside of login and get method");
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("login.html").pipe(res);
    }

    //When client ask for sign in page
    if (req.url === "/signin" && req.method === "GET" && !req.headers.cookie) {
        console.log("Entré a Sign in");
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("signIn.html").pipe(res);
    }

    //POST of the sign in form
    if (req.url === "/validate" && req.method === "POST"  && !req.headers.cookie) {

        console.log("POST method on sign in");

        req.on('data', (bufferChunk) => {
            body.push(bufferChunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            body = querystring.parse(body);
            newReg = {};
            console.log(body);

            //validations

            //email
            if (body.email) {
                newReg.email = body.email;
                errors.push(false);
            } else {
                errors.push(true);
                error = true;
            }

            //user
            if (body.user) {
                newReg.user = body.user;
                errors.push(false);
            } else {
                errors.push(true);
                error = true;
            }

            //password
            if (body.password){
                if (body.password.length >= 6) {
                    newReg.pass = body.password;
                    errors.push(false);
                } else {
                    errors.push("less");
                    error = true;
                }
            } else {
                errors.push(true)
                error = true;
            }

            if (body.telephone) {
                newReg.tel = body.telephone;
            }

            if (!error) {
                dataBase.push(newReg);
                console.log(dataBase);
                res.setHeader('Set-Cookie', ["user=" + body.user]);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end();
            } else {
                console.log(errors);
                res.writeHead(300, {'Content-Type': 'text/plain'});
                res.end(errors.toString());
            }
        });
    }

    //POST of the sign in form
    if (req.method === "POST" && req.url === "/signin" && !req.headers.cookie) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("user.html").pipe(res);
    }

    //POST of the login form
    if (req.method === "POST" && req.url === "/login" && !req.headers.cookie) {

        req.on('data', (bufferChunk) => {
            body.push(bufferChunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            body = querystring.parse(body);
            console.log(body);

            usr = dataBase.find( (current) => current.user === body.user && current.pass === body.pass );

            if (usr) {
                res.setHeader('Set-Cookie', ["user=" + usr.user]);
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream("user.html").pipe(res);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("Try again");
                res.end();
            }
        });
    }

    if(req.headers.cookie && req.url === "/login") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("user.html").pipe(res);
    }

    if(req.headers.cookie && req.url === "/signin") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("user.html").pipe(res);
    }

    if(req.headers.cookie && req.url === "/user") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("user.html").pipe(res);
    } else {
        if(  req.url === "/user" ){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<h1>404</h1>");
            res.end();
        }
    }
    if (req.url === "/" && !req.headers.cookie && req.method === "GET") {
        console.log("Inside of / url and method GET no cookie");
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("login.html").pipe(res);
    }

    if (req.url === "/" && req.headers.cookie && req.method === "GET") {
        console.log("Inside of / url and method GET no cookie");
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("user.html").pipe(res);
    }

    if(req.url !== "/" && req.url !== "/user" && req.url !== "/login" && req.url !== "/signin" && req.url !== "/validate") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("<h1>404</h1>");
    }

}).listen(8080);
console.log("Server Running at port 8080");
