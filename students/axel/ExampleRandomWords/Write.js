const Writable = require('stream').Writable;
const util = require('util');

function MyWritable(){
    Writable.call(this);
}

util.inherits(MyWritable, Writable);

MyWritable.prototype._write = function (chunk, enc, next) {
    console.log(chunk.toString());
    next();
};

module.exports = MyWritable;
