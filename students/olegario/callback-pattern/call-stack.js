"use strict"

function lastFunction(input) {
  let e = new Error();
  //console.log(e.stack.length);
  return e.stack;
}

function secondFunction(input) {
  return lastFunction(input);
}

function firstFunction(input) {
  return secondFunction(input);
}

module.exports = firstFunction;
