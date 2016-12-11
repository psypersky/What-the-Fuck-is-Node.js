var http = require('http'),
    fs   = require('fs');
fs.readFile("./texto.txt", function (err, texto) {
    http.createServer(function (req, res) {
        res.write(texto);
        res.end();
    }).listen(3000, "localhost");

});
