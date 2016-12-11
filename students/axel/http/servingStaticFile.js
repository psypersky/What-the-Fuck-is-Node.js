const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    if (req.method != "GET") {
        res.end("Not a get method")
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("Axel");
    fs.createReadStream("axel.html").pipe(res);
}).listen(3030);
console.log("Server runing at port 3030");
