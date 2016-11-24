'use strict';

const a = 2;
const b = 3;
const c = 7;

let result;
doSomeComplicatedMathSync(a, b, c, (err, res) => {
  if (err) {
    console.error('Some nasty error');
    return;
  }

  result = res;
});

console.log('Result', result);

function doSomeComplicatedMathSync(a, b, c, callback) {
  // Ok, this line performs a calculation,
  const res = a + b / c;
  // and the callback function receives two arguments:
  // error and result.
  // here you are sending the result as an error
  // callback(res);
  // so if no error was found, you could just send it as null like this.
  let error = null; // you can set the errors to anything you want if it were the case.
  callback(error, res); // You have to respect the order of the arguments the callback function is receving.
  // end of story.
}
