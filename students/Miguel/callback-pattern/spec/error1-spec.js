"use strict";

let doSomeComplicatedMathSync = require('../error1.js');
let functionRes;
const a = 2;
const b = 3;
const c = 7;

function injectedFunction (err, res){
    if (err) {
      console.error('Some nasty error');
      return;
    }

    let result = res;

    return result;
}

describe('Testing function doSomeComplicatedMathSync', () => {
    it('Should be defined', () => {
        expect(doSomeComplicatedMathSync).toBeDefined();
    });
    it('Should be a function', () => {
        expect(typeof doSomeComplicatedMathSync).toBe("function");
    });
    it('Should return a number', () => {
        functionRes = doSomeComplicatedMathSync(a, b, c, injectedFunction);
        expect(typeof functionRes).toBe("number");
    });
    it('The result should be 2.4285714285714284', () => {
        functionRes = doSomeComplicatedMathSync(a, b, c, injectedFunction);
        expect(functionRes).toBe(2.4285714285714284)
    });
});
