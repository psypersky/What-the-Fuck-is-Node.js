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
  const res = a + b / c;
  callback(undefined,res);
}

module.exports = doSomeComplicatedMathSync;
