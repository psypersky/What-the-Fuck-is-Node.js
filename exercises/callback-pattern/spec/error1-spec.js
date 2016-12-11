'use strict';

let test = require('../error1');
let result;

function testing(a, b, c) {
  return test(a, b, c, (err, res) => {
    if (err) {
      console.error('Some nasty error');
      return;
    }

    result = res;
  });
}



describe('Testing call-stack exercise', function() {
  testing(3,6,2);

  it('the return should be a number', function() {
    expect(typeof(result)).toBe("number");
  });
  it('the return should be 3', function() {
    expect(result).toBe(6);
  });
  it('the return should be 4', function() {
    testing(5,8,2);
    expect(result).toBe(9);
  });
});
