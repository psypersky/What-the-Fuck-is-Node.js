"strict mode";

var http = require('http');
fs   = require('fs');

http.createServer(function (req, res) {

    var dataBase = [
        {
            'user' : 'Ruben',
            'pass' : 'MyPass'
        },
        {
            'user' : 'Axel',
            'pass' : 'axel'
        },
        {
            'user' : 'Zarigueya',
            'pass' : 'niurka'
        },

    ];
    var body = [];
    var data = [];
    var userPass = [];
    var user = "",
        pass = "",
        finded = false;

    var url = req.url.split("/").slice(1);
    var urlStr = url.toString();
    console.log(urlStr);

    if (req.method === "GET") {
        if (url.length !== 1 || urlStr !== "login") {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<h1>404 Not Found</h1>");
            res.end();
        }
        console.log("Method: " + req.method);
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream("login.html").pipe(res);
    }

    if (req.method === "POST") {
        console.log("Method: " + req.method);

        req.on('data', (bufferChunk) => {
            body.push(bufferChunk);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            console.log("Data: " + body);
            data = body.split("&");
            userPass = [];

            data.forEach(function(element){
                userPass.push(element.split("="));
        });

            user = userPass[0][1];
            pass = userPass[1][1];
            console.log("user: " + user + " pass: " + pass);

            dataBase.find(function (current) {
                if(current.user === user && current.pass === pass){
                    finded = true;
                }
            });

            if (finded) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream("user.html").pipe(res);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream("loginFailed.html").pipe(res);
            }
        });
    }
}).listen(8888);
console.log("Server running at por 8888");
