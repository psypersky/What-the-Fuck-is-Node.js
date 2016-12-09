"use strict"

const Writable = require('stream').Writable;
const util     = require('util');

function Stream() {

  if (! (this instanceof Stream)) {
    return new Stream();
  }

  Writable.call(this);
}

util.inherits(Stream, Writable);

Stream.prototype._write = function (chunk, encode, callback) {
  console.log(chunk.toString('utf8'));
  callback();
};

module.exports = Stream;
