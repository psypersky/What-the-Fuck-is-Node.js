'use strict';

const callStack = require('../call-stack');

describe('Testing Call Stack', function() {
  let stackResult = callStack();
  let stack = stackResult.split('\n').splice(1, 3);
  console.log(stack);

  it('should have a length of three', function() {
    expect(stack.length).toBe(3);
  });

  it('should have a call to baz function', function() {
    expect(stack[0].indexOf('at baz') >= 0).toBe(true);
  });

  it('should have a call to bar function', function() {
    expect(stack[1].indexOf('at bar') >= 0).toBe(true);
  });

  it('should have a call to foo function', function() {
    expect(stack[2].indexOf('at foo') >= 0).toBe(true);
  });
});
