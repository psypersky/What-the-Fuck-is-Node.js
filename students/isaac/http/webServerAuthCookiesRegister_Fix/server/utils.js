'use strict';
const fs = require('fs');

exports.parseBody = function(request, callback) {
  let chunks = [];

  request.on('data', data => chunks.push(data));

  request.on('end', () => {
    let stringBody = Buffer.concat(chunks).toString(),
        body = {};

    stringBody.split('&').forEach(kv => {
      if(kv.length) {
        let parts = kv.split('=');
        if(parts[0].length) {
          body[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
      }
    });

    callback(body);
  });
};

exports.servePage = function(pageName, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream(pageName).pipe(res);
};

exports.redirect = function(path, res) {
  console.log(`\nRedirecting to: ${path}`);
  res.writeHead(302, {'Location': path});
  res.end();
}

let rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

exports.generateToken = function() {
  return rand() + rand(); // to make it longer
};
