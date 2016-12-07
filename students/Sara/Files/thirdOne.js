"use strict";

let http=require("http");
let fs=require("fs");
let zlib = require('zlib');

http.createServer(function (req,res){
  if (req.method==="GET") {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
  }
  if (req.method==="POST") {
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-disposition': 'attachment; filename=myFile.zip'
    });
    req.on("data", function (data) {
      zlib.gzip(data, function (error, result) {
       if (error) {
         throw error;
       }
      fs.writeFile('sara.zip', result);
      });
      fs.readFile('sara.zip', function (err, result2) {
        if (err){
          throw err;
        }
        console.log(result2);
        res.write(result2)
        res.end();
      })
    })
  }
}).listen(7777);
console.log("Server Running");
