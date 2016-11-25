"use strict";

let doSomeComplicatedMath = require('../error2.js');
let promise;
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

describe('Testing function doSomeComplicatedMath', () => {
    beforeEach(() => {
        functionRes = undefined;
        promise = new Promise((resolve, reject) => {
            resolve(doSomeComplicatedMath(a, b, c, injectedFunction));
        });
    });

    it('Should be defined', () => {
        expect(doSomeComplicatedMath).toBeDefined();
    });
    it('Should be a function', () => {
        expect(typeof doSomeComplicatedMath).toBe("function");
    });
    it('Should return a number', () => {
        promise.then((data) => {
            functionRes = data;
            expect(typeof functionRes).toBe("number");
        });
    });
    it('The result should be 2.4285714285714284', () => {
        promise.then((data) => {
            functionRes = data;
            expect(functionRes).toBe(2.4285714285714284);
        });
    });
});
