const http = require('http'),
      fs   = require('fs'),
      querystring = require('querystring');

var server = http.createServer(function (req, res) {
  var dataBase = [
      {
        'username': 'Ruben',
        'password': '1234'
      }
  ];

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream("./index.html").pipe(res);
  }

  if (req.method === "POST" && req.url === "/login") {
    var body = '';

    req.on('data', function(data){
      body += data;
    });

    req.on('end', function(){

      var datas = JSON.parse(body || '{}');

      const found = dataBase.find((element) =>  element.username === datas.username && element.password === datas.password);
      if (found) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        var foo = JSON.stringify({'status': 'success', 'data': {'user':{'id': 'rSru6X/[[5MBVN&uB`}V;_&^D<-3sq','username': datas.username, 'password': datas.password,}}});
        res.end(foo);
      } else {
        res.writeHead(401, {'Content-Type': 'application/json'});
        var foo = JSON.stringify({'status': 'fail', 'data': {'user':'User or password invalid'}});
        res.end(foo);
      }
    });
  }
}).listen(9090);

module.exports = server;
