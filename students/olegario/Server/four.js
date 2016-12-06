"use strict"

function dibuarCabecera(){
  var html = '<!DOCTYPE html>';
  html += '<html>';
  html += '<head>';
  html += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
  html += '</head>';
  html += '<body>';
  return html;
}
function dibujarPie(){
  var html = '</body>';
  html += '</html>';
  return html;
}

function dibujarFormulario(){
  var html = dibuarCabecera();
  html += '<form method="post" enctype="multipart/form-data">';
  html += '<label> Archivo: </label>';
  html += '<input type="file" name="file" />';
  html += '<input type="submit" value="Subir" />';
  html += '</form>';
  html += dibujarPie();
  return html;
}

function responderSubida(archivo_subido){
  var html = dibuarCabecera();
  if(archivo_subido){
    html += '<p> <strong> El archivo ha sido subido correctamente. <strong> </p>';
  }else{
    html += '<p style="color: #f00;"> Error al intentar subir el archivo. </p>';
  }
  html += '<p> <a href="/"> Volver </a> </p>';
  html += dibujarPie();
  return html;
}

var http = require('http');
var formidable = require('formidable');
var zlib = require('zlib');
var fs = require('fs');
http.createServer(function(req, res){
  let name;
  if(req.method == 'POST'){

    var incoming = new formidable.IncomingForm();
    incoming.uploadDir = './';
    incoming.parse(req);

    incoming.on('error', function(err) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(responderSubida(false));
    });

    incoming.on('fileBegin', function(field, file){
      if(file.name){
        file.path = file.name;
        name = file.name;
      }

    });

    incoming.on('end', function(){

      fs.createReadStream(name).pipe(zlib.createGzip()).pipe(fs.createWriteStream(name + '.gz')).on('finish', function () {
        fs.readFile(name + '.gz', function (err, data) {
          if (err) {
            throw err;
          }

          res.writeHead(200, {'Content-Type': 'application/x-compressed', 'Content-disposition': 'attachment; filename='+ name +'.gz' });
          res.end(data);
        });
      });

    });
  }else{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(dibujarFormulario());
  }
}).listen(3000);
