"use strict";

let firstFunction = require('../call-stack');

describe('Call Stack Pattern Test', () => {
    describe('Tasting the actual callstack', () => {
        it('Should be defined', () => {
            expect(firstFunction).toBeDefined();
        });
        it('Should return an Error', () => {
            expect(firstFunction() instanceof Error).toBe(true);
        });
    });
    describe('Call Stack length', () => {
        let errorStackArray = firstFunction().stack.split("\n");
        errorStackArray = errorStackArray.filter((elem) => {
            return (elem.indexOf("Function")) >= 0;
        });
        it('Should be 3', () => {
            expect(errorStackArray.length).toBe(3);
        });
    });
});
