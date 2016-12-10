'use strict';

const MyReadable = require('./my-readable'),
      MyWritable = require('./my-writable');

let myRead = new MyReadable(),
    myWrite = new MyWritable();

myRead.pipe(myWrite);
