'use strict';

const ReadableStream = require('stream').Readable,
      superb = require('superb'),
      badWords = require('bad-words');

const badList = new badWords().list;

class MyReadable extends ReadableStream {

  constructor(options) {
    super(options);

    this.mood = Math.random() > 0.5;
    console.log((this.mood ? "I'm your Friend :)" : "I'm not in a mood >:(") + '\n');
  }

  _read() {
    if (Math.random() > 0.1) {
      if(this.mood) {
        this.push(superb());
      } else {
        let badWord = badList[Math.floor(Math.random() * badList.length)];
        this.push(badWord);
      }
    } else {
      this.push(null);
    }
  }

}

module.exports = MyReadable;
