'use strict';

const WritableStream = require('stream').Writable;

class MyWritable extends WritableStream {
  constructor(options){
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback(); // This function must be called always. Optionally receives an error.
  }
}

module.exports = MyWritable;
