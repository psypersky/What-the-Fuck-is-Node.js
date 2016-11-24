'use strict';

const a = 2;
const b = 3;
const c = 7;

let result;
doSomeComplicatedMath(a, b, c, (err, res) => {
  if (err) {
    console.error('Some nasty error');
    return;
  }
  result = res;
});

console.log('Result', result);

function doSomeComplicatedMath(a, b, c, callback) {
  const res = a + b / c;
  process.nextTick(() => {
    callback(null, res);
  });
}
