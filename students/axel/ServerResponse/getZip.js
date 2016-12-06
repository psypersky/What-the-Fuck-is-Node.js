var http = require('http'),
    fs   = require('fs'),
    zlib = require('zlib');

fs.readFile('post.html', function (err, data) {
    if (err) {
        throw err;
    }
    var html = data;

    http.createServer(function (req, res) {
        if (req.method === "GET") {
            console.log("Method: " + req.method);
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        }
        if (req.method === "POST") {
            res.writeHead(200, {
                  'Content-Type': 'application/zip',
                  'Content-disposition': 'attachment; filename=myFile.zip'
            });
            req.on('data', function (data) {
                console.log("data: " + data);
                zlib.gzip(data, function (_, result) {
                    console.log("res :" + result);
                    fs.writeFile('axel.zip', result);
                    fs.readFile('axel.zip', function (err, data) {
                        if (err) {
                            throw err;
                        }
                        res.write(data);
                        res.end();
                    });
                    // result, so just send it.
                });
            });
        }
    }).listen(3000, "localhost");
    console.log("Server created at port 3000");
});
