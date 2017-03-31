"use strict"
let http = require('http');

http.createServer(function (request, response) {
  let ruta = request.url.split('/');
  // console.log(ruta);
  if(request.method==='GET'){
    if(ruta[1]==='sum'){
      let string ='';
      for(let i=2;i<=ruta.length-1;i++){
        string=string+ruta[i];
        if(i!==(ruta.length-1)){
          string=string+' ';
        }
      }
      // console.log(string);
      response.setHeader('Content-Type', 'text/plain');
      response.statusCode=200;
      response.end(string);
    }
  }
  else{
    response.statusCode=404;
    response.end();
  }
}).listen(3333);
