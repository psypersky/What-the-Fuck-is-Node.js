"use strict"

let Read  = require('./readable');
let Write = require('./writeable');


let reader = new Read();
let writer = new Write();

reader.pipe(writer);
