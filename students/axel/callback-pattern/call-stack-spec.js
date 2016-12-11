var callStack = require("./call-stack");
var a = callStack();
var b = a.split("\n").splice(1, 3);
console.log(b);

describe("Im not sure what am I doing", function() {
  it("This is how I know the trace get inside my 3 functions", function() {
    expect(b.length).toBe(3);
  });
  it("This is how I know the trace get inside foobar", function() {
    expect(b[0].indexOf("foobar") !== -1).toBe(true);
  });
  it("This is how I know the trace get inside bar", function() {
    expect(b[1].indexOf("bar") !== -1).toBe(true);
  });
  it("This is how I know the trace get inside foo", function() {
    expect(b[2].indexOf("foo") !== -1).toBe(true);
  });
});
