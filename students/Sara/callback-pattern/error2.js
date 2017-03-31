"use strict";

const a = 2;
const b = 3;
const c = 7;

let result;

function doSomeComplicatedMath(a, b, c, callback) {
  const res = a + b / c;
  process.nextTick(function() {
    callback(null, res);
    console.trace("nextTick");
  });
}

doSomeComplicatedMath(a, b, c, function (err, res) {
  if (err) {
    console.error('Some nasty error.');
    return;
  }
  console.trace("doSomeComplicatedMath.");
  result = res;
  console.log('Result', result);
});
