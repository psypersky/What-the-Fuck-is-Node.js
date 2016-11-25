"use strict"
const a = 2;
const b = 3;
const c = 7;

let result;

function doSomeComplicatedMathSync(a, b, c, callback) {
  const res = a + b / c;
  callback(null,res);
}

doSomeComplicatedMathSync(a, b, c, function (err, res){
  if (err) {
    console.error('Some nasty error');
    return;
  }
  result = res;
});

console.log('Result', result);
