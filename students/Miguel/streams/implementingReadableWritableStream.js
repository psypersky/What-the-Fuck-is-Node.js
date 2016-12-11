"use strict";

const ReadableStream = require("./readableStream");
const WritableStream = require("./writableStream");

let readStream = new ReadableStream();
let writeStream = new WritableStream();

readStream.pipe(writeStream);
