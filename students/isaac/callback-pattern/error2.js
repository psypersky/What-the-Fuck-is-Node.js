'use strict';

const a = 2;
const b = 3;
const c = 7;

// 1) here is where you want the result stored, right?
let result;

// 2) And here you are calling a function (doSomeComplicatedMath) that performs an
// asynchronus task, meaning that your callback function which
// asigns result = res, will wait until the task is finished to be executed.
doSomeComplicatedMath(a, b, c, (err, res) => {
  if (err) {
    console.error('Some nasty error');
    return;
  }
  // 3) You are asigning the 'res' value to your variable 'result'.
  // But as I already mentioned, this is going to be executed just after
  // the asynchronus task is finished.
  result = res;
  // 7) Finally, here you can now log the result, because it has already
  // arrived.
  console.log('Result', result);
});

// 4) So, at this point result keeps it value of 'undefined', because the callback
// function hasn't been called yet until the asynchronus taks finishes.
console.log('Result', result);

function doSomeComplicatedMath(a, b, c, callback) {
  const res = a + b / c;
  // 5) This may take a while.....
  process.nextTick(() => {
    // 6) And when it's done, it executes your callback function
    // passing the result.
    callback(null, res);
  });
}
