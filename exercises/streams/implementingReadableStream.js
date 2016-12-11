/**
 * The stream.Readable class is extended to implement a Readable stream.
 * Custom Readable streams must call the new stream.Readable([options]) constructor and implement the readable._read() method.
 **/


var Readable = require('stream').Readable;
var util = require('util');

util.inherits(Counter, Readable);
function Counter(options) {
    Readable.call(this, options);
    this._max = 1000;
    this._index = 1;
}

/** This function starts to read data if available and inserting it in the
 * internal buffer
 **/
Counter.prototype._read = function () {
    var i = this._index++;
    if (i > this._max)
        this.push(null);
    else {
        var str = ' ' + i;
        this.push(str);
    }
};

// Usage, same as any other readable stream
var counter = new Counter();
counter.pipe(process.stdout);
