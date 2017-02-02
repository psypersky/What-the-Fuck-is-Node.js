const http = require('http');
const fs = require('fs');

/**
 * Testing how to block the event loop
 * First create the file with the createFile script
 **/

const port = 4000;

const server = http.createServer();

let receivedCount = 0;

server.on('request', (request, response) => {
  console.log(`Received a ${request.method} on route ${request.url}`);
  receivedCount++;
  if (receivedCount === 1) {
    makeRequest2();
  }

  if (request.url === '/one') {
    response.statusCode = 200;

    // const file = fs.readFileSync('./file', 'utf8');
    // response.end(file);

    const stream = fs.createReadStream('./file', 'utf8');
    stream.pipe(response);

  } else if (request.url === '/two') {
    response.statusCode = 200;
    response.end('Direct response');
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(port, () => {
  console.log('Listening on', port);

  makeRequest1();
});

let reqCount = 0;
function requestEnded() {
  reqCount++;
  if (reqCount >= 2)  {
    server.close();
  }
}

function makeRequest1() {
  // Make request 1
  const now1 = Date.now();
  console.log('making request 1');
  http.get(`http://localhost:${port}/one`, function (res) {

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
      //console.log('chunk', chunk);
    });
    res.on('end', () => {
      console.log('request 1 finished in', Date.now() - now1);
      requestEnded();
    });
  });
}

function makeRequest2() {
  // Make request 2
  const now2 = Date.now();
  console.log('making request 2');
  http.get(`http://localhost:${port}/two`, function (res) {

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
      //console.log('chunk', chunk);
    });
    res.on('end', () => {
      console.log('request 2 finished in', Date.now() - now2);
      requestEnded();
    });
  });
}
