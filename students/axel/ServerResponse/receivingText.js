var http = require('http'),
    zlib = require('zlib'),
    fs   = require('fs');
// console.log(http.STATUS_CODES);

http.createServer(function (req, res) {
    console.log("Method: " + req.method);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write("<h1>Welcome home, cowboy!</h1><br>");
    req.on('data', function (data) {
        console.log("data: " + data);
        fs.writeFile('newFile.txt', data);
        res.end();
        // zlib.gzip(data, function (_, result) {  // The callback will give you the
        //     console.log("res :" + result);
        //     res.write(result);
        //     res.end();                     // result, so just send it.
        // });
    });
    // res.end();
}).listen(3000, "localhost");

console.log("Server created at port 3000");
