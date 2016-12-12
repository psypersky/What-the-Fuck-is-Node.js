const http   = require('http'),
      fs     = require('fs'),
      cookie = require('cookie');

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
        finded   = false,
        errors = [],
        error = false,
        cookies,
        name = cookie.parse(req.headers.cookie || '');

    //Killing the fucking get of the favicon
    if (req.url === "/favicon.ico") {
        return;
    }

    if (req.url === "/login" && req.method === "GET" && !req.headers.cookie) {
        console.log("uno");
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
        console.log("ora");
        console.log("Method: " + req.method);
        console.log("POST method on sign in");

        req.on('data', (bufferChunk) => {
            body.push(bufferChunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            data = body.split("&");
            data.forEach(function(element){
                elements.push(element.split("="));
            });
            email = elements[0][1];
            user  = elements[1][1];
            pass  = elements[2][1];
            tel   = elements[3][1];
            newReg = {};

            //validations

            //email
            if (email) {
                newReg.email = email;
                errors.push(false);
            } else {
                errors.push(true);
                error = true;
            }

            //user
            if (user) {
                newReg.user = user;
                errors.push(false);
            } else {
                errors.push(true);
                error = true;
            }

            //password
            if (pass){
                if (pass.length >= 6) {
                    newReg.pass = pass;
                    errors.push(false);
                } else {
                    errors.push("less");
                    error = true;
                }
            } else {
                errors.push(true)
                error = true;
            }

            if (tel) {
                newReg.tel = tel;
            }

            if (!error) {
                dataBase.push(newReg);
                console.log(dataBase);
                res.setHeader('Set-Cookie', [data[1]]);
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
            data = body.split("&");
            userPass = [];

            data.forEach(function(element){
                userPass.push(element.split("="));
            });

            user = userPass[0][1];
            pass = userPass[1][1];

            dataBase.find(function (current) {
                if(current.user === user && current.pass === pass){
                    finded = true;
                }
            });

            if (finded) {
                res.setHeader('Set-Cookie', [data[0]]);
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
    if (req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("login.html").pipe(res);
    }

    if(req.url !== "/" && req.url !== "/user" && req.url !== "/login" && req.url !== "/signin" && req.url !== "/validate") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("<h1>404</h1>");
    }

}).listen(8080);
console.log("Server Running at port 8080");
