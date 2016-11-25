"use strict";

let callstack=require("../call-stack.js");

describe("Call stack", function() {
  it("Finding the first function in the array, which name is 'one'", function() {
    let res;
    for(let i=0;i<callstack.length;i++){
      res=callstack[i].indexOf("one");
      if(res!==-1){
        break;
      }
    }
    expect(res).not.toBe(-1);
  });
  it("Finding the second function in the array, which name is 'two'", function() {
    let res;
    for(let i=0;i<callstack.length;i++){
      res=callstack[i].indexOf("two");
      if(res!==-1){
        break;
      }
    }
    expect(res).not.toBe(-1);
  });
  it("Finding the third function in the array, which name is 'three'", function() {
    let res;
    for(let i=0;i<callstack.length;i++){
      res=callstack[i].indexOf("three");
      if(res!==-1){
        break;
      }
    }
    expect(res).not.toBe(-1);
  });
});
