'use strict';

const server = require('http').createServer(),
      handle = require('./server-handlers');


server.on('request', (req, res) => {
  const method = req.method,
        url = req.url;

  if (method === 'GET' && url === '/') {

    return handle.home(req, res);

  } else if (method === 'POST' && url === '/login') {

    return handle.login(req, res);

  } else {

    return handle.defaultPage(req, res);

  }
});

module.exports = server;
