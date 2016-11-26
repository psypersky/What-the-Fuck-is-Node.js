'use strict';

let test = require('../error2');
let result;

let request = new Promise(function(resolve, reject) {
  resolve(test(3, 6, 2, (err, res) => {
    if (err) {
      console.error('Some nasty error');
      return;
    }
    result = res;
  }));
});

let request2 = new Promise(function(resolve, reject) {
  resolve(test(5, 8, 2, (err, res) => {
    if (err) {
      console.error('Some nasty error');
      return;
    }
    result = res;
  }));
});

describe('Testing call-stack exercise', function() {

  it('the return should be a number', function() {
    request.then(function (data) {
      expect(data).tobe(6);
    });
  });
  it('the return should be a number', function() {
    request.then(function (data) {
      expect(data).tobe(9);
    });
  });
});
