"use strict";

let Readable = require("stream").Readable;
let util = require("util");
let superb = require("superb");

function MyReadableStream () {
  Readable.call(this);
}

util.inherits(MyReadableStream, Readable);

MyReadableStream.prototype._read = function _read () {
  let newNumb = Math.floor((Math.random() * (100 - 2)) + 1 );
  if(newNumb > 10){
    return this.push(superb());
  } else {
    return this.push(null);
  }
};

module.exports = MyReadableStream;
