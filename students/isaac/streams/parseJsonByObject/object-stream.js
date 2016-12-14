'use strict';
console.log = () => {};

const Transform = require('stream').Transform;

class ObjectStream extends Transform {
  constructor (options) {
    super(options);
    this._level = 0;
    this._nLine = 0;
    this._lastLine = null;
  }

  _transform (chunk, encoding, done) {
    let line = chunk.toString() + '\n';
    // look for any line with { or } or [ or ]
    let match = line.match(/\{|\}|\[|\]/g);
    // Check if the end of line is the same line as the starting one, for empty Objects/Arrays
    let startingLine;

    this._nLine ++;

    // if level is 1 and there is not match, then the line is an Key:Value line
    if (this._level === 1 && match === null) {
      console.log('Key->', line);
      this.push(line);
    } else if (this._level > 1 && match === null && this._lastLine !== null) {
      console.log('Child->', line);
      this._lastLine += line;
    }

    // If contains { or } or [ or ]
    for(let m in match) {
      if(match.hasOwnProperty(m)) {
        let char = match[m];

        if (this._level === 0 && char === '{') { // JSON Start
          console.log('===> Start JSON @ line:', this._nLine);
          this._level ++; // now level is 1
        } else if ((this._level - 1) === 0 && char === '}') { // JSON End
          console.log('<=== End JSON @ line:', this._nLine);
          this._level --;
        } else if(this._level > 0) { // NEW children: Object or new Array
          //let type = char === '{' || char === '}' ? 'Object' : 'Array';
          if(char === '{' || char === '[') { // opening object
            //console.log('---> Child [' + type + '] @ line:', this._nLine);

            // If is a descendant of the main object. Level 1
            if(this._level === 1) {
              this._lastLine = line; // Save this line
              startingLine = this._nLine; // To check if it ends on the same line
              console.log('Key with children->', line);
            } else if (this._lastLine !== null) {
               this._lastLine += line;
            }

            this._level ++;
          } else if (char === '}' || char === ']') { // closing object
            //console.log(' <--- End Child [' + type + '] @ line:', this._nLine);

            this._level --;

            // If the level = 1,
            if(this._level === 1) {
              console.log('End Key with children->', line);
              if (startingLine) {
                line = this._lastLine;
              } else {
                line = this._lastLine + line;
              }
              this._lastLine = null;
              this.push(line);
            } else if (this._lastLine !== null) {
               this._lastLine += line;
            }
          }
        }
      }
    }
    done();
   }
}

module.exports = ObjectStream;
