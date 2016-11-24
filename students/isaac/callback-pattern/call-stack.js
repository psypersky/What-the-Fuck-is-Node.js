'use strict';

function foo() {
  return bar();
}

function bar() {
  return baz();
}

function baz() {
  let error = new Error('traceStack');
  return error.stack;
}

module.exports = foo;
