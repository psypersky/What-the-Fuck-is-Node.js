const MyReadable = require('./Read');
const MyWritable = require('./Write');

const read = new MyReadable();
const write = new MyWritable();

read.pipe(write);
