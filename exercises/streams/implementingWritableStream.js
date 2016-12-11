var Writable = require('stream').Writable;
var util = require('util');

util.inherits(Logger, Writable);
function Logger() {
    Writable.call(this);
}

Logger.prototype._write = function (chunk, e, c) {
    console.log(chunk.toString());
    c();
};

// Usage, same as any other Writable stream
var logger = new Logger();
var readStream = require('fs').createReadStream('textFile1.txt');
readStream.pipe(logger);
