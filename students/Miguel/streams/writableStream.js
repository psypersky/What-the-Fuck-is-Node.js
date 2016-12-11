"use strict";

let Writable = require("stream").Writable;
let util = require("util");

function MyWritableStream () {
  Writable.call(this);
}

util.inherits(MyWritableStream, Writable);

MyWritableStream.prototype._write = function _write (chunk, encoding, callback){
  console.log(chunk.toString("utf8"));
  callback();
};

module.exports = MyWritableStream;
