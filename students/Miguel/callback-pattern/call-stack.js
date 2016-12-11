"use strict";

function firstFunction () {
    let thirdError = secondFunction();
    return thirdError;
}

function secondFunction () {
    let thirdError = thirdFunction();
    return thirdError;
}

function thirdFunction () {
    let newError = new Error("third function error");
    return newError;
}

module.exports = firstFunction;
