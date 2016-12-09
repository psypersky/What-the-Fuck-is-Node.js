"use strict"

const Readable = require('stream').Readable;
const util     = require('util');
const rand       = require('random-words');

function Stream() {

  if (! (this instanceof Stream)) {
    return new Stream();
  }

  Readable.call(this);
}

util.inherits(Stream, Readable);

Stream.prototype._read = function () {
  let num = Math.floor((Math.random() * 10) + 1);

  if (num !== 10) {
    this.push(rand(1).toString());
  } else {
    this.push(null);
  }

};

module.exports = Stream;
