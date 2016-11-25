'use strict';

let test = require('../call-stack');

describe('Testing call-stack exercise', function() {
  let result = test(1);

  it('the return should be a string', function() {
    expect(typeof(result)).toBe("string");
  });
  it('the return should have inside lastFunction', function() {
    expect(result.indexOf("lastFunction")).toBe(13);
  });
  it('the return should have inside lastFunction', function() {
    expect(result.indexOf("secondFunction")).toBe(141);
  });
  it('the return should have inside lastFunction', function() {
    expect(result.indexOf("firstFunction")).toBe(272);
  });
});
