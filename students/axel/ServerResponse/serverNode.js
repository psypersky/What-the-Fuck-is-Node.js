var http = require('http');
var str = "";

function peticionServidor(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h2>Hello, is there anybody in there?</h2>');
    console.log(req.method);
    // console.log(req);
    // req.on("data", function (data) {
    //     console.log(data);
    // });
    var url = req.url.toString();
    url = url.split("/");
    url = url.slice(1);
    if (url.length === 2 && url[0] === "sum") {
        str += url[1];
        res.write(str);
        console.log(str);
    }
    res.end();
}
http.createServer(peticionServidor).listen(3333, 'localhost', () => console.log('Server running at localhost'));
