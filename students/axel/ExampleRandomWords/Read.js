const Readable = require('stream').Readable;
const util = require('util');
const random = require('random-words');

function MyReadable() {
    Readable.call(this);
}

util.inherits(MyReadable, Readable);

MyReadable.prototype._read = function () {
    var foo = random();

    if (Math.floor(Math.random() * 10 + 1) === 1){
        this.push(null);
    } else {
        console.log("foo: " + foo);
        this.push(foo + "\n");
    }
};

module.exports = MyReadable;
