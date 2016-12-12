"use strict";

var http = require("http");
var fs = require("fs");
var querystring = require("querystring");


http.createServer(function(req, res) {
  var body = [];
  var db = [
    {
      user: "Regina",
      pass: "fetch"
    },
    {
      user: "Gretchen",
      pass: "wednesday"
    }
  ];

  if (req.url === "/favicon.ico") {
    return;
  }

  if (req.url === "/login" && req.method === "GET") {
    res.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream("login.html").pipe(res);
  }

  if (req.url === "/login" && req.method === "POST") {
    body = [];
    req.on('data', (bufferChunk) => {
      body.push(bufferChunk);
    });
    req.on('end', function () {
      body = Buffer.concat(body).toString();
      body = querystring.parse(body);

      var user = db.find(function (element) {
        console.log(element);
        return (element.user === body.user && element.pass === body.pass);
      });

      if (user) {
          res.writeHead(200, {"Content-Type" : "text/html"});
          fs.createReadStream("welcome.html").pipe(res);
      }
      else {
        res.writeHead(400, {"Content-Type" : "text/html"});
        res.write("No existes, bye.");
        res.end();
      }
      // console.log(body);
    });
  }

}).listen(8080);
console.log("Running");
