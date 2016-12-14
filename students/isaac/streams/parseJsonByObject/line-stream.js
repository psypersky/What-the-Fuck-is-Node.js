'use strict';

const Transform = require('stream').Transform;

class LineStream extends Transform {
  constructor (options) {
    super(options);
  }

  _transform (chunk, encoding, done) {
     let data = chunk.toString();

     if (this._lastLineData) {
        data = this._lastLineData + data;
     }

     let lines = data.split('\n');

     this._lastLineData = lines.pop(); // las element.

     lines.forEach(line => this.push(line));

     done();
   }

   _flush (done) {

     if (this._lastLineData) {
        this.push(this._lastLineData);
     }

     this._lastLineData = null;

     done();
   }
}

module.exports = LineStream;
