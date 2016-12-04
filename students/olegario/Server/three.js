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
   html += '<label> File: </label>';
   html += '<input type="file" name="file" />';
   html += '<input type="submit" value="Send" />';
   html += '</form>';
   html += dibujarPie();
   return html;
}



var http = require('http');

http.createServer(function(req, res){
   if(req.method == 'POST'){
     
      res.writeHead(200, {'Content-Type': 'text/plain'});

      req.on('data', function (chunk) {
        res.write(chunk);
      });

      req.on('end', function(){
         res.end();
      });
   }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(dibujarFormulario());
   }
}).listen(8080, '127.0.0.1');
