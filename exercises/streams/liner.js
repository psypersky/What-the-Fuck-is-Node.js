const fs = require('fs');
const Transform = require('stream').Transform;

class Liner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
  	const data = chunk.toString();

  	if (this._lastLineData) {
  		data = this._lastLineData + data;
  	}

  	const lines = data.split('\n');
  	this._lastLineData = lines.pop();

  	lines.forEach((line) => this.push(line));
  	callback();
  }

  _flush(callback) {
  	if (this._lastLineData) {
  		this.push(this._lastLineData);
  		this._lastLineData = null;
  	}
  	callback();
  }
}

const liner = new Liner({ readableObjectMode: true });

class AddLineCount extends Transform {
  constructor(options) {
    super(options);
    this._lineCount = 0;
  }

  _transform(chunk, encoding, callback) {
  	const line = chunk.toString();

  	const resLine = line.slice(0, 36) + this._lineCount + ', ' + line.slice(36, line.length) + '\n';
  	this.push(resLine);
  	this._lineCount ++;
  	callback();
  }
}

const counter = new AddLineCount();


const Writable = require('stream').Writable;

class Logger extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {


  	console.log('Chunk ===>');
  	console.log(chunk.toString());
  	console.log('<===');
  	callback();
  }
}

const logger = new Logger();


const readStream = fs.createReadStream('./exercises.sql');
const writeStream = fs.createWriteStream('./exercises_count.sql');

readStream
	.pipe(liner)
	.pipe(counter)
	//.pipe(logger)
	.pipe(writeStream);
