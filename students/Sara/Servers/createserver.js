"use strict";

var http=require("http");

http.createServer(function(req,res){
  res.writeHeader(200,{"Content-Type":"text/plain"});
  res.write("BAILAS?");
  res.end();
}).listen(8080);
console.log("YO SI SOY VEDETTE");
