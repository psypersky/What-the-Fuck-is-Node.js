/**
 * Streams work based on events, the most important event on a readable stream
 * is 'redable', the event is raised whenever the is new data to read from the
 * stream if this the end of the stream the function returns null
 **/

const fs = require('fs');
const file = process.argv[2];

const readableStream = fs.createReadStream(file);

readableStream.on('readable', () => {
  const buf = readableStream.read();

  if (buf!= null) {
    console.log('GOT Chunk  ===>')
    console.log(buf.toString());
    console.log('<===')
  } else {
    console.log('Read complete');
  };
})
