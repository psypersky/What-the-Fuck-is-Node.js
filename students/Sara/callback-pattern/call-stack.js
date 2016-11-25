"use strict";

function allOfThem(){

  function one() {
    let error1=two();
    return error1.stack;
  }

  function two() {
    let error2=three();
    return error2;
  }

  function three() {
    let error3= new Error("Stack");
    return error3;
  }

  return one();
}

let res=allOfThem();
res=res.split("\n");

module.exports=res;
